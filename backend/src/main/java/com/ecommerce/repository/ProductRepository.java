package com.ecommerce.repository;

import com.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    Page<Product> findByActiveTrue(Pageable pageable);
    Page<Product> findByCategoryIdAndActiveTrue(String categoryId, Pageable pageable);
    List<Product> findByFeaturedTrueAndActiveTrue();
    Page<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description, Pageable pageable);
    Page<Product> findByBrandContainingIgnoreCaseAndActiveTrue(String brand, Pageable pageable);

    @Query("{'active': true, 'price': {$gte: ?0, $lte: ?1}}")
    Page<Product> findByPriceBetween(BigDecimal min, BigDecimal max, Pageable pageable);

    @Query("{'active': true, 'categoryId': ?0, 'price': {$gte: ?1, $lte: ?2}}")
    Page<Product> findByCategoryIdAndPriceBetween(String categoryId, BigDecimal min, BigDecimal max, Pageable pageable);

    @Query("{'active': true, 'averageRating': {$gte: ?0}}")
    Page<Product> findByMinRating(double minRating, Pageable pageable);

    List<Product> findTop10ByOrderBySalesCountDesc();
    List<Product> findTop10ByOrderByCreatedAtDesc();
}
