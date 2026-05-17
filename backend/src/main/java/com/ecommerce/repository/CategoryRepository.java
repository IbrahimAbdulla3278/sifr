package com.ecommerce.repository;

import com.ecommerce.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    Optional<Category> findBySlug(String slug);
    boolean existsByName(String name);
    List<Category> findByActiveTrueOrderByDisplayOrderAsc();
    List<Category> findByParentId(String parentId);
}
