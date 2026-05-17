package com.ecommerce.controller;

import com.ecommerce.dto.response.ApiResponse;
import com.ecommerce.model.Banner;
import com.ecommerce.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<Banner>>> getActiveBanners() {
        return ResponseEntity.ok(ApiResponse.success(bannerService.getActiveBanners()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Banner>>> getAllBanners() {
        return ResponseEntity.ok(ApiResponse.success(bannerService.getAllBanners()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Banner>> createBanner(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String subtitle,
            @RequestParam(required = false) String link,
            @RequestParam(required = false) Integer displayOrder,
            @RequestParam(required = false) Boolean active,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(ApiResponse.success("Banner created", bannerService.createBanner(title, subtitle, link, displayOrder, active, image)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Banner>> updateBanner(
            @PathVariable String id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String subtitle,
            @RequestParam(required = false) String link,
            @RequestParam(required = false) Integer displayOrder,
            @RequestParam(required = false) Boolean active,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(ApiResponse.success("Banner updated", bannerService.updateBanner(id, title, subtitle, link, displayOrder, active, image)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteBanner(@PathVariable String id) {
        bannerService.deleteBanner(id);
        return ResponseEntity.ok(ApiResponse.success("Banner deleted", null));
    }
}
