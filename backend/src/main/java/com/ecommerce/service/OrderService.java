package com.ecommerce.service;

import com.ecommerce.dto.response.PagedResponse;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Cart;
import com.ecommerce.model.Order;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final UserService userService;
    private final ProductRepository productRepository;

    public Order createOrder(String userId, String addressId, String paymentMethod, String notes) {
        Cart cart = cartService.getCart(userId);
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        User user = userService.getUserById(userId);
        User.Address address = user.getAddresses().stream()
                .filter(a -> a.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));

        for (Cart.CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "id", cartItem.getProductId()));

            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            product.setStock(product.getStock() - cartItem.getQuantity());
            product.setSalesCount(product.getSalesCount() + cartItem.getQuantity());
            productRepository.save(product);
        }

        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .userId(userId)
                .items(cart.getItems().stream()
                        .map(item -> Order.OrderItem.builder()
                                .productId(item.getProductId())
                                .variantId(item.getVariantId())
                                .name(item.getName())
                                .image(item.getImage())
                                .price(item.getPrice())
                                .quantity(item.getQuantity())
                                .sku(item.getSku())
                                .build())
                        .toList())
                .shippingAddress(Order.ShippingAddress.builder()
                        .fullName(address.getFullName())
                        .phone(address.getPhone())
                        .addressLine1(address.getAddressLine1())
                        .addressLine2(address.getAddressLine2())
                        .city(address.getCity())
                        .state(address.getState())
                        .pincode(address.getPincode())
                        .build())
                .subtotal(cart.getTotal())
                .shippingCost(BigDecimal.valueOf(0))
                .tax(BigDecimal.valueOf(0))
                .total(cart.getTotal())
                .paymentMethod(paymentMethod != null ? paymentMethod : "COD")
                .orderStatus("PENDING")
                .paymentStatus("PENDING")
                .notes(notes)
                .build();

        order = orderRepository.save(order);

        cartService.clearCart(userId);

        return order;
    }

    public Order getOrderById(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
    }

    public PagedResponse<Order> getUserOrders(String userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Order> orderPage = orderRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);

        return PagedResponse.<Order>builder()
                .content(orderPage.getContent())
                .page(orderPage.getNumber())
                .size(orderPage.getSize())
                .totalElements(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .last(orderPage.isLast())
                .build();
    }

    public PagedResponse<Order> getAllOrders(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Order> orderPage = orderRepository.findAllByOrderByCreatedAtDesc(pageable);

        return PagedResponse.<Order>builder()
                .content(orderPage.getContent())
                .page(orderPage.getNumber())
                .size(orderPage.getSize())
                .totalElements(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .last(orderPage.isLast())
                .build();
    }

    public Order updateOrderStatus(String id, String orderStatus) {
        Order order = getOrderById(id);
        order.setOrderStatus(orderStatus);
        if ("DELIVERED".equals(orderStatus)) {
            order.setPaymentStatus("PAID");
        }
        return orderRepository.save(order);
    }

    public Order updatePaymentStatus(String id, String paymentStatus) {
        Order order = getOrderById(id);
        order.setPaymentStatus(paymentStatus);
        return orderRepository.save(order);
    }

    public Order updatePaymentInfo(String id, String transactionId) {
        Order order = getOrderById(id);
        order.setTransactionId(transactionId);
        return orderRepository.save(order);
    }

    private String generateOrderNumber() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
