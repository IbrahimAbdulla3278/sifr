package com.ecommerce.service;

import com.ecommerce.dto.request.ProductRequest;
import com.ecommerce.dto.request.ReviewRequest;
import com.ecommerce.dto.response.PagedResponse;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Category;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final FileStorageService fileStorageService;

    public PagedResponse<Product> getProducts(int page, int size, String sort, String categoryId, Double minPrice, Double maxPrice, Double minRating, String search) {
        Pageable pageable;
        switch (sort) {
            case "price_asc" -> pageable = PageRequest.of(page, size, Sort.by("price").ascending());
            case "price_desc" -> pageable = PageRequest.of(page, size, Sort.by("price").descending());
            case "newest" -> pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            case "popular" -> pageable = PageRequest.of(page, size, Sort.by("salesCount").descending());
            default -> pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        }

        Page<Product> productPage;

        if (search != null && !search.isEmpty()) {
            productPage = productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search, pageable);
        } else if (categoryId != null && minPrice != null && maxPrice != null) {
            productPage = productRepository.findByCategoryIdAndPriceBetween(categoryId, BigDecimal.valueOf(minPrice), BigDecimal.valueOf(maxPrice), pageable);
        } else if (categoryId != null) {
            productPage = productRepository.findByCategoryIdAndActiveTrue(categoryId, pageable);
        } else if (minPrice != null && maxPrice != null) {
            productPage = productRepository.findByPriceBetween(BigDecimal.valueOf(minPrice), BigDecimal.valueOf(maxPrice), pageable);
        } else if (minRating != null) {
            productPage = productRepository.findByMinRating(minRating, pageable);
        } else {
            productPage = productRepository.findByActiveTrue(pageable);
        }

        return PagedResponse.<Product>builder()
                .content(productPage.getContent())
                .page(productPage.getNumber())
                .size(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .last(productPage.isLast())
                .build();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueAndActiveTrue();
    }

    public List<Product> getRelatedProducts(String productId) {
        Product product = getProductById(productId);
        Pageable pageable = PageRequest.of(0, 8);
        Page<Product> related = productRepository.findByCategoryIdAndActiveTrue(product.getCategoryId(), pageable);
        return related.getContent().stream()
                .filter(p -> !p.getId().equals(productId))
                .limit(8)
                .toList();
    }

    public List<Product> getTopSelling() {
        return productRepository.findTop10ByOrderBySalesCountDesc();
    }

    public List<Product> getNewArrivals() {
        return productRepository.findTop10ByOrderByCreatedAtDesc();
    }

    public Product createProduct(ProductRequest request, List<MultipartFile> images) {
        Category category = categoryService.getCategoryById(request.getCategoryId());

        Product product = Product.builder()
                .sku(request.getSku())
                .name(request.getName())
                .description(request.getDescription())
                .categoryId(request.getCategoryId())
                .categoryName(category.getName())
                .price(request.getPrice())
                .discountPrice(request.getDiscountPrice())
                .brand(request.getBrand())
                .stock(request.getStock())
                .featured(request.isFeatured())
                .tags(request.getTags() != null ? request.getTags() : new ArrayList<>())
                .active(true)
                .build();

        if (images != null && !images.isEmpty()) {
            List<String> imagePaths = new ArrayList<>();
            for (MultipartFile image : images) {
                imagePaths.add(fileStorageService.storeFile(image));
            }
            product.setImages(imagePaths);
        }

        if (request.getVariants() != null) {
            List<Product.Variant> variants = new ArrayList<>();
            for (ProductRequest.VariantRequest v : request.getVariants()) {
                variants.add(Product.Variant.builder()
                        .id(UUID.randomUUID().toString())
                        .name(v.getName())
                        .value(v.getValue())
                        .sku(v.getSku())
                        .price(v.getPrice())
                        .discountPrice(v.getDiscountPrice())
                        .stock(v.getStock())
                        .build());
            }
            product.setVariants(variants);
        }

        return productRepository.save(product);
    }

    public Product updateProduct(String id, ProductRequest request, List<MultipartFile> images) {
        Product product = getProductById(id);

        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getCategoryId() != null) {
            Category category = categoryService.getCategoryById(request.getCategoryId());
            product.setCategoryId(request.getCategoryId());
            product.setCategoryName(category.getName());
        }
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getDiscountPrice() != null) product.setDiscountPrice(request.getDiscountPrice());
        if (request.getBrand() != null) product.setBrand(request.getBrand());
        product.setStock(request.getStock());
        product.setFeatured(request.isFeatured());
        if (request.getTags() != null) product.setTags(request.getTags());

        if (images != null && !images.isEmpty()) {
            for (String img : product.getImages()) {
                fileStorageService.deleteFile(img);
            }
            List<String> imagePaths = new ArrayList<>();
            for (MultipartFile image : images) {
                imagePaths.add(fileStorageService.storeFile(image));
            }
            product.setImages(imagePaths);
        }

        if (request.getVariants() != null) {
            List<Product.Variant> variants = new ArrayList<>();
            for (ProductRequest.VariantRequest v : request.getVariants()) {
                variants.add(Product.Variant.builder()
                        .id(UUID.randomUUID().toString())
                        .name(v.getName())
                        .value(v.getValue())
                        .sku(v.getSku())
                        .price(v.getPrice())
                        .discountPrice(v.getDiscountPrice())
                        .stock(v.getStock())
                        .build());
            }
            product.setVariants(variants);
        }

        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        Product product = getProductById(id);
        for (String img : product.getImages()) {
            fileStorageService.deleteFile(img);
        }
        productRepository.deleteById(id);
    }

    public Product addReview(String productId, String userId, String userName, ReviewRequest request) {
        Product product = getProductById(productId);

        Product.Review review = Product.Review.builder()
                .id(UUID.randomUUID().toString())
                .userId(userId)
                .userName(userName)
                .rating(request.getRating())
                .comment(request.getComment())
                .createdAt(LocalDateTime.now())
                .build();

        product.getReviews().add(review);

        double avg = product.getReviews().stream()
                .mapToInt(Product.Review::getRating)
                .average()
                .orElse(0.0);
        product.setAverageRating(Math.round(avg * 10.0) / 10.0);
        product.setReviewCount(product.getReviews().size());

        return productRepository.save(product);
    }
}
