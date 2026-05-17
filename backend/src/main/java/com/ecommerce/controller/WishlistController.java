package com.ecommerce.controller;

import com.ecommerce.dto.response.ApiResponse;
import com.ecommerce.model.Product;
import com.ecommerce.model.Wishlist;
import com.ecommerce.security.JwtProvider;
import com.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;
    private final JwtProvider jwtProvider;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getWishlist(@RequestHeader("Authorization") String token) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success(wishlistService.getWishlistProducts(userId)));
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<ApiResponse<Wishlist>> addToWishlist(
            @RequestHeader("Authorization") String token,
            @PathVariable String productId) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success("Added to wishlist", wishlistService.addToWishlist(userId, productId)));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<ApiResponse<Wishlist>> removeFromWishlist(
            @RequestHeader("Authorization") String token,
            @PathVariable String productId) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success("Removed from wishlist", wishlistService.removeFromWishlist(userId, productId)));
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<ApiResponse<Boolean>> checkWishlist(
            @RequestHeader("Authorization") String token,
            @PathVariable String productId) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success(wishlistService.isInWishlist(userId, productId)));
    }
}
