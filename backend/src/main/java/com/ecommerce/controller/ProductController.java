package com.ecommerce.controller;

import com.ecommerce.dto.request.ProductRequest;
import com.ecommerce.dto.request.ReviewRequest;
import com.ecommerce.dto.response.ApiResponse;
import com.ecommerce.dto.response.PagedResponse;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.security.JwtProvider;
import com.ecommerce.service.ProductService;
import com.ecommerce.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final JwtProvider jwtProvider;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<Product>>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProducts(page, size, sort, categoryId, minPrice, maxPrice, minRating, search)));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Product>>> getFeaturedProducts() {
        return ResponseEntity.ok(ApiResponse.success(productService.getFeaturedProducts()));
    }

    @GetMapping("/top-selling")
    public ResponseEntity<ApiResponse<List<Product>>> getTopSelling() {
        return ResponseEntity.ok(ApiResponse.success(productService.getTopSelling()));
    }

    @GetMapping("/new-arrivals")
    public ResponseEntity<ApiResponse<List<Product>>> getNewArrivals() {
        return ResponseEntity.ok(ApiResponse.success(productService.getNewArrivals()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProduct(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductById(id)));
    }

    @GetMapping("/{id}/related")
    public ResponseEntity<ApiResponse<List<Product>>> getRelatedProducts(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getRelatedProducts(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Product>> createProduct(
            @Valid @RequestPart("product") ProductRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return ResponseEntity.ok(ApiResponse.success("Product created", productService.createProduct(request, images)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Product>> updateProduct(
            @PathVariable String id,
            @Valid @RequestPart("product") ProductRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return ResponseEntity.ok(ApiResponse.success("Product updated", productService.updateProduct(id, request, images)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted", null));
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<ApiResponse<Product>> addReview(
            @PathVariable String id,
            @Valid @RequestBody ReviewRequest request,
            @RequestHeader("Authorization") String token) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(ApiResponse.success("Review added", productService.addReview(id, userId, user.getName(), request)));
    }
}
