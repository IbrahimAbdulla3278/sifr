package com.ecommerce.controller;

import com.ecommerce.dto.request.AddAdminRequest;
import com.ecommerce.dto.response.ApiResponse;
import com.ecommerce.dto.response.AuthResponse;
import com.ecommerce.dto.response.PagedResponse;
import com.ecommerce.model.Order;
import com.ecommerce.model.User;
import com.ecommerce.service.OrderService;
import com.ecommerce.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final OrderService orderService;

    @PostMapping("/add-admin")
    public ResponseEntity<ApiResponse<AuthResponse>> addAdmin(@Valid @RequestBody AddAdminRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Admin created", userService.addAdmin(request)));
    }

    @GetMapping("/admins")
    public ResponseEntity<ApiResponse<List<User>>> getAdmins() {
        List<User> admins = userService.getAllAdmins();
        admins.forEach(admin -> admin.setPassword(null));
        return ResponseEntity.ok(ApiResponse.success(admins));
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<PagedResponse<Order>>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getAllOrders(page, size)));
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<ApiResponse<Order>> updateOrderStatus(
            @PathVariable String id,
            @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success("Order status updated", orderService.updateOrderStatus(id, status)));
    }

    @PutMapping("/orders/{id}/payment")
    public ResponseEntity<ApiResponse<Order>> updatePaymentStatus(
            @PathVariable String id,
            @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success("Payment status updated", orderService.updatePaymentStatus(id, status)));
    }
}
