package com.ecommerce.service;

import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Cart;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductService productService;

    public Cart getCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .userId(userId)
                            .items(new ArrayList<>())
                            .total(BigDecimal.ZERO)
                            .build();
                    return cartRepository.save(newCart);
                });
    }

    public Cart addToCart(String userId, String productId, String variantId, int quantity) {
        Cart cart = getCart(userId);
        Product product = productService.getProductById(productId);

        if (product.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        BigDecimal price;
        String image = product.getImages().isEmpty() ? null : product.getImages().get(0);
        String sku = product.getSku();
        String name = product.getName();

        if (variantId != null) {
            Product.Variant variant = product.getVariants().stream()
                    .filter(v -> v.getId().equals(variantId))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Variant", "id", variantId));
            price = variant.getDiscountPrice() != null ? variant.getDiscountPrice() : variant.getPrice();
            sku = variant.getSku();
            if (variant.getImage() != null) image = variant.getImage();
        } else {
            price = product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getPrice();
        }

        Optional<Cart.CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId) &&
                        (variantId == null || variantId.equals(item.getVariantId())))
                .findFirst();

        if (existingItem.isPresent()) {
            Cart.CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            Cart.CartItem newItem = Cart.CartItem.builder()
                    .productId(productId)
                    .variantId(variantId)
                    .name(name)
                    .image(image)
                    .price(price)
                    .quantity(quantity)
                    .sku(sku)
                    .build();
            cart.getItems().add(newItem);
        }

        recalculateTotal(cart);
        return cartRepository.save(cart);
    }

    public Cart updateCartItem(String userId, String productId, String variantId, int quantity) {
        Cart cart = getCart(userId);

        cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId) &&
                        (variantId == null || variantId.equals(item.getVariantId())))
                .findFirst()
                .ifPresent(item -> {
                    if (quantity <= 0) {
                        cart.getItems().remove(item);
                    } else {
                        item.setQuantity(quantity);
                    }
                });

        recalculateTotal(cart);
        return cartRepository.save(cart);
    }

    public Cart removeFromCart(String userId, String productId, String variantId) {
        Cart cart = getCart(userId);
        cart.getItems().removeIf(item ->
                item.getProductId().equals(productId) &&
                        (variantId == null || variantId.equals(item.getVariantId()))
        );
        recalculateTotal(cart);
        return cartRepository.save(cart);
    }

    public Cart clearCart(String userId) {
        Cart cart = getCart(userId);
        cart.getItems().clear();
        cart.setTotal(BigDecimal.ZERO);
        return cartRepository.save(cart);
    }

    private void recalculateTotal(Cart cart) {
        BigDecimal total = cart.getItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotal(total);
    }
}
