package com.ecommerce.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    @NotBlank
    private String sku;

    @NotBlank
    private String name;

    private String description;

    @NotBlank
    private String categoryId;

    @NotNull
    @Positive
    private BigDecimal price;

    private BigDecimal discountPrice;

    private String brand;

    private int stock;

    private boolean featured;

    private List<String> tags;

    private List<VariantRequest> variants;

    @Data
    public static class VariantRequest {
        private String name;
        private String value;
        private String sku;
        private BigDecimal price;
        private BigDecimal discountPrice;
        private int stock;
    }
}
