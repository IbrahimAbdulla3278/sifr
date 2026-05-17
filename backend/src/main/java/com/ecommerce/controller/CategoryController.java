package com.ecommerce.controller;

import com.ecommerce.dto.request.CategoryRequest;
import com.ecommerce.dto.response.ApiResponse;
import com.ecommerce.dto.response.CategoryTreeDTO;
import com.ecommerce.model.Category;
import com.ecommerce.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Category>>> getAllCategories() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getActiveCategories()));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Category>>> getAllCategoriesAdmin() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getAllCategories()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> getCategory(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoryById(id)));
    }

    @GetMapping("/tree")
    public ResponseEntity<ApiResponse<List<CategoryTreeDTO>>> getCategoryTree() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoryTree()));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<Category>> getCategoryBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoryBySlug(slug)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Category>> createCategory(
            @Valid @RequestPart("category") CategoryRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(ApiResponse.success("Category created", categoryService.createCategory(request, image)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Category>> updateCategory(
            @PathVariable String id,
            @Valid @RequestPart("category") CategoryRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(ApiResponse.success("Category updated", categoryService.updateCategory(id, request, image)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success("Category deleted", null));
    }
}
