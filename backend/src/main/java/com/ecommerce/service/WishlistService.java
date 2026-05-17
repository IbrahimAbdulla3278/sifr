package com.ecommerce.service;

import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Product;
import com.ecommerce.model.Wishlist;
import com.ecommerce.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductService productService;

    public Wishlist getWishlist(String userId) {
        return wishlistRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Wishlist newWishlist = Wishlist.builder()
                            .userId(userId)
                            .productIds(new ArrayList<>())
                            .build();
                    return wishlistRepository.save(newWishlist);
                });
    }

    public Wishlist addToWishlist(String userId, String productId) {
        Wishlist wishlist = getWishlist(userId);
        if (!wishlist.getProductIds().contains(productId)) {
            wishlist.getProductIds().add(productId);
        }
        return wishlistRepository.save(wishlist);
    }

    public Wishlist removeFromWishlist(String userId, String productId) {
        Wishlist wishlist = getWishlist(userId);
        wishlist.getProductIds().remove(productId);
        return wishlistRepository.save(wishlist);
    }

    public List<Product> getWishlistProducts(String userId) {
        Wishlist wishlist = getWishlist(userId);
        return wishlist.getProductIds().stream()
                .map(productService::getProductById)
                .toList();
    }

    public boolean isInWishlist(String userId, String productId) {
        Wishlist wishlist = getWishlist(userId);
        return wishlist.getProductIds().contains(productId);
    }
}
