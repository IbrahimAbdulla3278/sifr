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
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    @Indexed(unique = true)
    private String sku;

    private String name;

    private String description;

    @Indexed
    private String categoryId;

    private String categoryName;

    @Builder.Default
    private List<String> images = new ArrayList<>();

    private BigDecimal price;

    private BigDecimal discountPrice;

    private String currency;

    @Builder.Default
    private int stock = 0;

    private String brand;

    @Builder.Default
    private boolean featured = false;

    @Builder.Default
    private boolean active = true;

    @Builder.Default
    private List<String> tags = new ArrayList<>();

    @Builder.Default
    private List<Variant> variants = new ArrayList<>();

    @Builder.Default
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    private double averageRating = 0.0;

    @Builder.Default
    private int reviewCount = 0;

    @Builder.Default
    private int salesCount = 0;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Variant {
        private String id;
        private String name;
        private String value;
        private String sku;
        private BigDecimal price;
        private BigDecimal discountPrice;
        private int stock;
        private String image;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Review {
        private String id;
        private String userId;
        private String userName;
        private int rating;
        private String comment;
        private LocalDateTime createdAt;
    }
}
