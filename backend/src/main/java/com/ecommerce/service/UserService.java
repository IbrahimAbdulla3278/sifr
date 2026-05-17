package com.ecommerce.service;

import com.ecommerce.dto.request.AddAdminRequest;
import com.ecommerce.dto.response.ApiResponse;
import com.ecommerce.dto.response.AuthResponse;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final FileStorageService fileStorageService;

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    public User updateProfile(String userId, String name, String phone) {
        User user = getUserById(userId);
        if (name != null) user.setName(name);
        if (phone != null) user.setPhone(phone);
        return userRepository.save(user);
    }

    public User updateProfileImage(String userId, MultipartFile file) {
        User user = getUserById(userId);
        if (user.getProfileImage() != null) {
            fileStorageService.deleteFile(user.getProfileImage());
        }
        String filename = fileStorageService.storeFile(file);
        user.setProfileImage(filename);
        return userRepository.save(user);
    }

    public User addAddress(String userId, User.Address address) {
        User user = getUserById(userId);
        if (address.isDefault() || user.getAddresses().isEmpty()) {
            user.getAddresses().forEach(a -> a.setDefault(false));
        }
        user.getAddresses().add(address);
        return userRepository.save(user);
    }

    public User updateAddress(String userId, String addressId, User.Address address) {
        User user = getUserById(userId);
        int index = -1;
        for (int i = 0; i < user.getAddresses().size(); i++) {
            if (user.getAddresses().get(i).getId().equals(addressId)) {
                index = i;
                break;
            }
        }
        if (index == -1) throw new ResourceNotFoundException("Address", "id", addressId);
        if (address.isDefault()) {
            user.getAddresses().forEach(a -> a.setDefault(false));
        }
        address.setId(addressId);
        user.getAddresses().set(index, address);
        return userRepository.save(user);
    }

    public User deleteAddress(String userId, String addressId) {
        User user = getUserById(userId);
        user.getAddresses().removeIf(a -> a.getId().equals(addressId));
        return userRepository.save(user);
    }

    public AuthResponse addAdmin(AddAdminRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        User admin = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_ADMIN)
                .active(true)
                .build();

        admin = userRepository.save(admin);

        String token = jwtProvider.generateToken(admin.getEmail(), admin.getRole().name(), admin.getId());

        return AuthResponse.builder()
                .token(token)
                .userId(admin.getId())
                .name(admin.getName())
                .email(admin.getEmail())
                .role(admin.getRole().name())
                .build();
    }

    public List<User> getAllAdmins() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.ROLE_ADMIN)
                .toList();
    }
}
