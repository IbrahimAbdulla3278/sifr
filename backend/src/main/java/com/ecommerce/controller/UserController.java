package com.ecommerce.controller;

import com.ecommerce.dto.response.ApiResponse;
import com.ecommerce.model.User;
import com.ecommerce.security.JwtProvider;
import com.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtProvider jwtProvider;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getProfile(@RequestHeader("Authorization") String token) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        User user = userService.getUserById(userId);
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<User>> updateProfile(
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phone) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        User user = userService.updateProfile(userId, name, phone);
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("Profile updated", user));
    }

    @PostMapping("/profile/image")
    public ResponseEntity<ApiResponse<User>> updateProfileImage(
            @RequestHeader("Authorization") String token,
            @RequestParam("file") MultipartFile file) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        User user = userService.updateProfileImage(userId, file);
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("Image updated", user));
    }

    @PostMapping("/addresses")
    public ResponseEntity<ApiResponse<User>> addAddress(
            @RequestHeader("Authorization") String token,
            @RequestBody User.Address address) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        User user = userService.addAddress(userId, address);
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("Address added", user));
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<ApiResponse<User>> updateAddress(
            @RequestHeader("Authorization") String token,
            @PathVariable String addressId,
            @RequestBody User.Address address) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        User user = userService.updateAddress(userId, addressId, address);
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("Address updated", user));
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<ApiResponse<User>> deleteAddress(
            @RequestHeader("Authorization") String token,
            @PathVariable String addressId) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        User user = userService.deleteAddress(userId, addressId);
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("Address deleted", user));
    }
}
