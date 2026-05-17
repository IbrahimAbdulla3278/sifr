package com.ecommerce.service;

import com.ecommerce.dto.request.CategoryRequest;
import com.ecommerce.dto.response.CategoryTreeDTO;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Category;
import com.ecommerce.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getActiveCategories() {
        return categoryRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public Category getCategoryById(String id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
    }

    public Category getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "slug", slug));
    }

    public Category createCategory(CategoryRequest request, MultipartFile image) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new BadRequestException("Category name already exists");
        }

        Category category = Category.builder()
                .name(request.getName())
                .slug(generateSlug(request.getName()))
                .description(request.getDescription())
                .parentId(request.getParentId())
                .displayOrder(request.getDisplayOrder())
                .active(request.getActive() != null ? request.getActive() : true)
                .build();

        if (image != null && !image.isEmpty()) {
            category.setImage(fileStorageService.storeFile(image));
        }

        return categoryRepository.save(category);
    }

    public Category updateCategory(String id, CategoryRequest request, MultipartFile image) {
        Category category = getCategoryById(id);

        if (request.getName() != null) {
            category.setName(request.getName());
            category.setSlug(generateSlug(request.getName()));
        }
        if (request.getDescription() != null) category.setDescription(request.getDescription());
        if (request.getParentId() != null) category.setParentId(request.getParentId());
        if (request.getDisplayOrder() != null) category.setDisplayOrder(request.getDisplayOrder());
        if (request.getActive() != null) category.setActive(request.getActive());

        if (image != null && !image.isEmpty()) {
            if (category.getImage() != null) {
                fileStorageService.deleteFile(category.getImage());
            }
            category.setImage(fileStorageService.storeFile(image));
        }

        return categoryRepository.save(category);
    }

    public void deleteCategory(String id) {
        Category category = getCategoryById(id);
        if (category.getImage() != null) {
            fileStorageService.deleteFile(category.getImage());
        }
        categoryRepository.deleteById(id);
    }

    public List<CategoryTreeDTO> getCategoryTree() {
        List<Category> allCategories = categoryRepository.findAll();
        return buildTree(allCategories, null);
    }

    private List<CategoryTreeDTO> buildTree(List<Category> categories, String parentId) {
        return categories.stream()
                .filter(c -> parentId == null ? c.getParentId() == null : parentId.equals(c.getParentId()))
                .sorted((a, b) -> {
                    if (a.getDisplayOrder() == null && b.getDisplayOrder() == null) return 0;
                    if (a.getDisplayOrder() == null) return 1;
                    if (b.getDisplayOrder() == null) return -1;
                    return a.getDisplayOrder().compareTo(b.getDisplayOrder());
                })
                .map(c -> CategoryTreeDTO.builder()
                        .id(c.getId())
                        .name(c.getName())
                        .slug(c.getSlug())
                        .image(c.getImage())
                        .description(c.getDescription())
                        .parentId(c.getParentId())
                        .active(c.isActive())
                        .displayOrder(c.getDisplayOrder())
                        .children(buildTree(categories, c.getId()))
                        .build())
                .toList();
    }

    private String generateSlug(String name) {
        String slug = Normalizer.normalize(name, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        slug = pattern.matcher(slug).replaceAll("");
        slug = slug.toLowerCase(Locale.ENGLISH)
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("[\\s-]+", "-")
                .replaceAll("^-|-$", "");
        return slug;
    }
}
