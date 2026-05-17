package com.ecommerce.controller;

import com.ecommerce.dto.response.ApiResponse;
import com.ecommerce.model.Cart;
import com.ecommerce.security.JwtProvider;
import com.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final JwtProvider jwtProvider;

    @GetMapping
    public ResponseEntity<ApiResponse<Cart>> getCart(@RequestHeader("Authorization") String token) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success(cartService.getCart(userId)));
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Cart>> addToCart(
            @RequestHeader("Authorization") String token,
            @RequestParam String productId,
            @RequestParam(required = false) String variantId,
            @RequestParam(defaultValue = "1") int quantity) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success("Item added to cart", cartService.addToCart(userId, productId, variantId, quantity)));
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse<Cart>> updateCartItem(
            @RequestHeader("Authorization") String token,
            @RequestParam String productId,
            @RequestParam(required = false) String variantId,
            @RequestParam int quantity) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success("Cart updated", cartService.updateCartItem(userId, productId, variantId, quantity)));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<ApiResponse<Cart>> removeFromCart(
            @RequestHeader("Authorization") String token,
            @RequestParam String productId,
            @RequestParam(required = false) String variantId) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success("Item removed", cartService.removeFromCart(userId, productId, variantId)));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse<Cart>> clearCart(@RequestHeader("Authorization") String token) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success("Cart cleared", cartService.clearCart(userId)));
    }
}
