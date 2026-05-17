package com.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryTreeDTO {
    private String id;
    private String name;
    private String slug;
    private String image;
    private String description;
    private String parentId;
    private boolean active;
    private Integer displayOrder;
    private List<CategoryTreeDTO> children;
}
