package com.ecommerce.service;

import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Banner;
import com.ecommerce.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;
    private final FileStorageService fileStorageService;

    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

    public List<Banner> getActiveBanners() {
        return bannerRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public Banner getBannerById(String id) {
        return bannerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner", "id", id));
    }

    public Banner createBanner(String title, String subtitle, String link, Integer displayOrder, Boolean active, MultipartFile image) {
        Banner banner = Banner.builder()
                .title(title)
                .subtitle(subtitle)
                .link(link)
                .displayOrder(displayOrder)
                .active(active != null ? active : true)
                .build();

        if (image != null && !image.isEmpty()) {
            banner.setImage(fileStorageService.storeFile(image));
        }

        return bannerRepository.save(banner);
    }

    public Banner updateBanner(String id, String title, String subtitle, String link, Integer displayOrder, Boolean active, MultipartFile image) {
        Banner banner = getBannerById(id);

        if (title != null) banner.setTitle(title);
        if (subtitle != null) banner.setSubtitle(subtitle);
        if (link != null) banner.setLink(link);
        if (displayOrder != null) banner.setDisplayOrder(displayOrder);
        if (active != null) banner.setActive(active);

        if (image != null && !image.isEmpty()) {
            if (banner.getImage() != null) {
                fileStorageService.deleteFile(banner.getImage());
            }
            banner.setImage(fileStorageService.storeFile(image));
        }

        return bannerRepository.save(banner);
    }

    public void deleteBanner(String id) {
        Banner banner = getBannerById(id);
        if (banner.getImage() != null) {
            fileStorageService.deleteFile(banner.getImage());
        }
        bannerRepository.deleteById(id);
    }
}
