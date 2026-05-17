package com.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    @Indexed
    private String orderNumber;

    @Indexed
    private String userId;

    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    private ShippingAddress shippingAddress;

    @Builder.Default
    private String orderStatus = "PENDING";

    @Builder.Default
    private String paymentStatus = "PENDING";

    @Builder.Default
    private String paymentMethod = "COD";

    private String transactionId;

    private BigDecimal subtotal;

    private BigDecimal shippingCost;

    private BigDecimal tax;

    @Builder.Default
    private BigDecimal total = BigDecimal.ZERO;

    private String notes;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItem {
        private String productId;
        private String variantId;
        private String name;
        private String image;
        private BigDecimal price;
        private int quantity;
        private String sku;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ShippingAddress {
        private String fullName;
        private String phone;
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private String pincode;
    }
}
