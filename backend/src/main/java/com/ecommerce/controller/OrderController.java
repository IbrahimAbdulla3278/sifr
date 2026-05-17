package com.ecommerce.controller;

import com.ecommerce.dto.request.OrderRequest;
import com.ecommerce.dto.response.ApiResponse;
import com.ecommerce.dto.response.PagedResponse;
import com.ecommerce.model.Order;
import com.ecommerce.security.JwtProvider;
import com.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final JwtProvider jwtProvider;

    @PostMapping
    public ResponseEntity<ApiResponse<Order>> createOrder(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody OrderRequest request) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        Order order = orderService.createOrder(userId, request.getAddressId(), request.getPaymentMethod(), request.getNotes());
        return ResponseEntity.ok(ApiResponse.success("Order created", order));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<Order>>> getUserOrders(
            @RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        String userId = jwtProvider.getUserIdFromToken(token.substring(7));
        return ResponseEntity.ok(ApiResponse.success(orderService.getUserOrders(userId, page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Order>> getOrder(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getOrderById(id)));
    }
}
