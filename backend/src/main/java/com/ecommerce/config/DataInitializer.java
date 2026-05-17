package com.ecommerce.config;

import com.ecommerce.model.*;
import com.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final BannerRepository bannerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@ecommerce.com")) {
            User admin = User.builder()
                    .name("Admin")
                    .email("admin@ecommerce.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ROLE_ADMIN)
                    .active(true)
                    .build();
            userRepository.save(admin);
            log.info("Default admin created: admin@ecommerce.com / admin123");
        }

        seedCategories();
        seedProducts();
        seedBanners();
    }

    private void seedCategories() {
        categoryRepository.deleteAll();

        categoryRepository.saveAll(List.of(
            Category.builder().id("cat-men").name("MEN").slug("men").image("men.svg").displayOrder(1).build(),
            Category.builder().id("cat-women").name("WOMEN").slug("women").image("women.svg").displayOrder(2).build(),
            Category.builder().id("cat-travel").name("TRAVEL ACCESSORIES").slug("travel-accessories").image("travel.svg").displayOrder(3).build(),
            Category.builder().id("cat-beauty").name("BEAUTY").slug("beauty").image("beauty.svg").displayOrder(4).build(),

            Category.builder().id("cat-men-tw").name("Top Wear").slug("men-top-wear").parentId("cat-men").image("topwear.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-bw").name("Bottom Wear").slug("men-bottom-wear").parentId("cat-men").image("bottomwear.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-ethnic").name("Ethnic & Fusion Wear").slug("men-ethnic-wear").parentId("cat-men").image("ethnic.svg").displayOrder(3).build(),
            Category.builder().id("cat-men-athleisure").name("Athleisure").slug("men-athleisure").parentId("cat-men").image("athleisure.svg").displayOrder(4).build(),
            Category.builder().id("cat-men-inner").name("Innerwear").slug("men-innerwear").parentId("cat-men").image("innerwear.svg").displayOrder(5).build(),
            Category.builder().id("cat-men-sleep").name("Sleepwear").slug("men-sleepwear").parentId("cat-men").image("sleepwear.svg").displayOrder(6).build(),
            Category.builder().id("cat-men-footwear").name("Footwear").slug("men-footwear").parentId("cat-men").image("footwear-men.svg").displayOrder(7).build(),
            Category.builder().id("cat-men-accessories").name("Accessories").slug("men-accessories").parentId("cat-men").image("accessories-men.svg").displayOrder(8).build(),
            Category.builder().id("cat-men-jewellery").name("Jewellery").slug("men-jewellery").parentId("cat-men").image("jewellery-men.svg").displayOrder(9).build(),

            Category.builder().id("cat-men-tw-shirts").name("Shirts").slug("men-shirts").parentId("cat-men-tw").image("topwear.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-tw-tshirts").name("T-Shirts").slug("men-t-shirts").parentId("cat-men-tw").image("topwear.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-tw-hoodies").name("Hoodies & Sweatshirts").slug("men-hoodies").parentId("cat-men-tw").image("topwear.svg").displayOrder(3).build(),
            Category.builder().id("cat-men-tw-jackets").name("Jackets").slug("men-jackets").parentId("cat-men-tw").image("topwear.svg").displayOrder(4).build(),
            Category.builder().id("cat-men-tw-sweaters").name("Sweaters").slug("men-sweaters").parentId("cat-men-tw").image("topwear.svg").displayOrder(5).build(),
            Category.builder().id("cat-men-tw-blazers").name("Blazers & Waistcoats").slug("men-blazers").parentId("cat-men-tw").image("topwear.svg").displayOrder(6).build(),
            Category.builder().id("cat-men-tw-active").name("Active T-Shirts").slug("men-active-tshirts").parentId("cat-men-tw").image("topwear.svg").displayOrder(7).build(),

            Category.builder().id("cat-men-bw-jeans").name("Jeans").slug("men-jeans").parentId("cat-men-bw").image("bottomwear.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-bw-pants").name("Pants & Trousers").slug("men-pants").parentId("cat-men-bw").image("bottomwear.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-bw-cargos").name("Cargos & Joggers").slug("men-cargos").parentId("cat-men-bw").image("bottomwear.svg").displayOrder(3).build(),
            Category.builder().id("cat-men-bw-shorts").name("Shorts").slug("men-shorts").parentId("cat-men-bw").image("bottomwear.svg").displayOrder(4).build(),
            Category.builder().id("cat-men-bw-sweatpants").name("Sweatpants").slug("men-sweatpants").parentId("cat-men-bw").image("bottomwear.svg").displayOrder(5).build(),

            Category.builder().id("cat-men-et-kurtas").name("Kurtas").slug("men-kurtas").parentId("cat-men-ethnic").image("ethnic.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-et-kurta-sets").name("Kurta Sets").slug("men-kurta-sets").parentId("cat-men-ethnic").image("ethnic.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-et-sherwanis").name("Sherwanis").slug("men-sherwanis").parentId("cat-men-ethnic").image("ethnic.svg").displayOrder(3).build(),
            Category.builder().id("cat-men-et-nehru").name("Nehru Jackets").slug("men-nehru-jackets").parentId("cat-men-ethnic").image("ethnic.svg").displayOrder(4).build(),
            Category.builder().id("cat-men-et-jodhpuri").name("Jodhpuri").slug("men-jodhpuri").parentId("cat-men-ethnic").image("ethnic.svg").displayOrder(5).build(),

            Category.builder().id("cat-men-at-outer").name("Active Outerwears").slug("men-active-outerwears").parentId("cat-men-athleisure").image("athleisure.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-at-cords").name("Co-Ords").slug("men-co-ords").parentId("cat-men-athleisure").image("athleisure.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-at-bottoms").name("Bottoms").slug("men-athleisure-bottoms").parentId("cat-men-athleisure").image("athleisure.svg").displayOrder(3).build(),

            Category.builder().id("cat-men-in-briefs").name("Briefs & Trunks").slug("men-briefs").parentId("cat-men-inner").image("innerwear.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-in-boxers").name("Boxers").slug("men-boxers").parentId("cat-men-inner").image("innerwear.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-in-vests").name("Vests").slug("men-vests").parentId("cat-men-inner").image("innerwear.svg").displayOrder(3).build(),
            Category.builder().id("cat-men-in-socks").name("Socks").slug("men-socks").parentId("cat-men-inner").image("innerwear.svg").displayOrder(4).build(),

            Category.builder().id("cat-men-sl-short").name("Short Sets").slug("men-short-sets").parentId("cat-men-sleep").image("sleepwear.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-sl-pant").name("Pant Sets").slug("men-pant-sets").parentId("cat-men-sleep").image("sleepwear.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-sl-tops").name("Tops").slug("men-sleep-tops").parentId("cat-men-sleep").image("sleepwear.svg").displayOrder(3).build(),
            Category.builder().id("cat-men-sl-bottoms").name("Bottoms").slug("men-sleep-bottoms").parentId("cat-men-sleep").image("sleepwear.svg").displayOrder(4).build(),

            Category.builder().id("cat-men-fw-casual").name("Casual Shoes").slug("men-casual-shoes").parentId("cat-men-footwear").image("footwear-men.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-fw-flipflops").name("Flip Flops").slug("men-flipflops").parentId("cat-men-footwear").image("footwear-men.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-fw-sports").name("Sport Shoes").slug("men-sport-shoes").parentId("cat-men-footwear").image("footwear-men.svg").displayOrder(3).build(),
            Category.builder().id("cat-men-fw-formals").name("Formals").slug("men-formals").parentId("cat-men-footwear").image("footwear-men.svg").displayOrder(4).build(),
            Category.builder().id("cat-men-fw-ethnic").name("Ethnic").slug("men-ethnic-footwear").parentId("cat-men-footwear").image("footwear-men.svg").displayOrder(5).build(),
            Category.builder().id("cat-men-fw-flats").name("Flats & Sandals").slug("men-flats-sandals").parentId("cat-men-footwear").image("footwear-men.svg").displayOrder(6).build(),
            Category.builder().id("cat-men-fw-boots").name("Boots").slug("men-boots").parentId("cat-men-footwear").image("footwear-men.svg").displayOrder(7).build(),

            Category.builder().id("cat-men-ac-belts").name("Belts").slug("men-belts").parentId("cat-men-accessories").image("accessories-men.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-ac-wallets").name("Wallets").slug("men-wallets").parentId("cat-men-accessories").image("accessories-men.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-ac-eyewear").name("Eyewear").slug("men-eyewear").parentId("cat-men-accessories").image("accessories-men.svg").displayOrder(3).build(),
            Category.builder().id("cat-men-ac-watches").name("Watches").slug("men-watches").parentId("cat-men-accessories").image("accessories-men.svg").displayOrder(4).build(),
            Category.builder().id("cat-men-ac-ties").name("Tie & Brooches").slug("men-ties").parentId("cat-men-accessories").image("accessories-men.svg").displayOrder(5).build(),
            Category.builder().id("cat-men-ac-perfume").name("Perfume").slug("men-perfume").parentId("cat-men-accessories").image("accessories-men.svg").displayOrder(6).build(),
            Category.builder().id("cat-men-ac-caps").name("Caps & Hats").slug("men-caps").parentId("cat-men-accessories").image("accessories-men.svg").displayOrder(7).build(),
            Category.builder().id("cat-men-ac-charms").name("Charms Brooches & Pins").slug("men-charms").parentId("cat-men-accessories").image("accessories-men.svg").displayOrder(8).build(),

            Category.builder().id("cat-men-jw-chains").name("Chains & Pendants").slug("men-chains-pendants").parentId("cat-men-jewellery").image("jewellery-men.svg").displayOrder(1).build(),
            Category.builder().id("cat-men-jw-bracelets").name("Bracelets").slug("men-bracelets").parentId("cat-men-jewellery").image("jewellery-men.svg").displayOrder(2).build(),
            Category.builder().id("cat-men-jw-earrings").name("Earrings").slug("men-earrings").parentId("cat-men-jewellery").image("jewellery-men.svg").displayOrder(3).build(),
            Category.builder().id("cat-men-jw-rings").name("Rings").slug("men-rings").parentId("cat-men-jewellery").image("jewellery-men.svg").displayOrder(4).build(),

            Category.builder().id("cat-women-footwear").name("Footwear").slug("women-footwear").parentId("cat-women").image("footwear-women.svg").displayOrder(1).build(),
            Category.builder().id("cat-women-accessories").name("Accessories").slug("women-accessories").parentId("cat-women").image("accessories-women.svg").displayOrder(2).build(),
            Category.builder().id("cat-women-jewellery").name("Jewellery").slug("women-jewellery").parentId("cat-women").image("jewellery-women.svg").displayOrder(3).build(),
            Category.builder().id("cat-women-travel").name("Travel Accessories").slug("women-travel-accessories").parentId("cat-women").image("travel-women.svg").displayOrder(4).build(),
            Category.builder().id("cat-women-jumpsuits").name("Jumpsuits").slug("women-jumpsuits").parentId("cat-women").image("jumpsuits.svg").displayOrder(5).build(),
            Category.builder().id("cat-women-cords").name("Co-Ords").slug("women-co-ords").parentId("cat-women").image("cords.svg").displayOrder(6).build(),

            Category.builder().id("cat-women-fw-heels").name("Heels").slug("women-heels").parentId("cat-women-footwear").image("footwear-women.svg").displayOrder(1).build(),
            Category.builder().id("cat-women-fw-casual").name("Casual Shoes").slug("women-casual-shoes").parentId("cat-women-footwear").image("footwear-women.svg").displayOrder(2).build(),
            Category.builder().id("cat-women-fw-flats").name("Flats & Sandals").slug("women-flats-sandals").parentId("cat-women-footwear").image("footwear-women.svg").displayOrder(3).build(),
            Category.builder().id("cat-women-fw-sports").name("Sport Shoes").slug("women-sport-shoes").parentId("cat-women-footwear").image("footwear-women.svg").displayOrder(4).build(),
            Category.builder().id("cat-women-fw-flipflops").name("Flip Flops").slug("women-flipflops").parentId("cat-women-footwear").image("footwear-women.svg").displayOrder(5).build(),
            Category.builder().id("cat-women-fw-ethnic").name("Ethnic").slug("women-ethnic-footwear").parentId("cat-women-footwear").image("footwear-women.svg").displayOrder(6).build(),
            Category.builder().id("cat-women-fw-boots").name("Boots").slug("women-boots").parentId("cat-women-footwear").image("footwear-women.svg").displayOrder(7).build(),
            Category.builder().id("cat-women-fw-formals").name("Formals").slug("women-formals").parentId("cat-women-footwear").image("footwear-women.svg").displayOrder(8).build(),

            Category.builder().id("cat-women-ac-handbags").name("Handbags & Wallets").slug("women-handbags").parentId("cat-women-accessories").image("accessories-women.svg").displayOrder(1).build(),
            Category.builder().id("cat-women-ac-eyewear").name("Eyewear").slug("women-eyewear").parentId("cat-women-accessories").image("accessories-women.svg").displayOrder(2).build(),
            Category.builder().id("cat-women-ac-watches").name("Watches").slug("women-watches").parentId("cat-women-accessories").image("accessories-women.svg").displayOrder(3).build(),
            Category.builder().id("cat-women-ac-hair").name("Hair Accessories").slug("women-hair-accessories").parentId("cat-women-accessories").image("accessories-women.svg").displayOrder(4).build(),
            Category.builder().id("cat-women-ac-socks").name("Socks").slug("women-socks").parentId("cat-women-accessories").image("accessories-women.svg").displayOrder(5).build(),
            Category.builder().id("cat-women-ac-belts").name("Belts").slug("women-belts").parentId("cat-women-accessories").image("accessories-women.svg").displayOrder(6).build(),
            Category.builder().id("cat-women-ac-caps").name("Caps & Hats").slug("women-caps").parentId("cat-women-accessories").image("accessories-women.svg").displayOrder(7).build(),
            Category.builder().id("cat-women-ac-rakhi").name("Rakhi").slug("women-rakhi").parentId("cat-women-accessories").image("accessories-women.svg").displayOrder(8).build(),
            Category.builder().id("cat-women-ac-charms").name("Charms Brooches & Pins").slug("women-charms").parentId("cat-women-accessories").image("accessories-women.svg").displayOrder(9).build(),

            Category.builder().id("cat-women-jw-earrings").name("Earrings").slug("women-earrings").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(1).build(),
            Category.builder().id("cat-women-jw-bracelets").name("Bracelets").slug("women-bracelets").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(2).build(),
            Category.builder().id("cat-women-jw-sets").name("Jewellery Sets").slug("women-jewellery-sets").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(3).build(),
            Category.builder().id("cat-women-jw-necklaces").name("Necklaces").slug("women-necklaces").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(4).build(),
            Category.builder().id("cat-women-jw-chains").name("Chains & Pendants").slug("women-chains-pendants").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(5).build(),
            Category.builder().id("cat-women-jw-rings").name("Rings").slug("women-rings").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(6).build(),
            Category.builder().id("cat-women-jw-bangles").name("Bangles").slug("women-bangles").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(7).build(),
            Category.builder().id("cat-women-jw-anklets").name("Anklets").slug("women-anklets").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(8).build(),
            Category.builder().id("cat-women-jw-hair").name("Hair Jewellery").slug("women-hair-jewellery").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(9).build(),
            Category.builder().id("cat-women-jw-nose").name("Nose Pin").slug("women-nose-pin").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(10).build(),
            Category.builder().id("cat-women-jw-box").name("Jewellery Box").slug("women-jewellery-box").parentId("cat-women-jewellery").image("jewellery-women.svg").displayOrder(11).build(),

            Category.builder().id("cat-women-tr-bags").name("Bags & Backpacks").slug("women-bags-backpacks").parentId("cat-women-travel").image("travel-women.svg").displayOrder(1).build(),
            Category.builder().id("cat-women-tr-trolley").name("Trolley Bags").slug("women-trolley-bags").parentId("cat-women-travel").image("travel-women.svg").displayOrder(2).build(),
            Category.builder().id("cat-women-tr-sling").name("Sling & Crossbody").slug("women-sling-crossbody").parentId("cat-women-travel").image("travel-women.svg").displayOrder(3).build(),
            Category.builder().id("cat-women-tr-duffel").name("Duffel Bags").slug("women-duffel").parentId("cat-women-travel").image("travel-women.svg").displayOrder(4).build(),
            Category.builder().id("cat-women-tr-rucksacks").name("Rucksacks").slug("women-rucksacks").parentId("cat-women-travel").image("travel-women.svg").displayOrder(5).build(),

            Category.builder().id("cat-women-js-western").name("Western Jumpsuits").slug("women-western-jumpsuits").parentId("cat-women-jumpsuits").image("jumpsuits.svg").displayOrder(1).build(),
            Category.builder().id("cat-women-js-ethnic").name("Ethnic Jumpsuits").slug("women-ethnic-jumpsuits").parentId("cat-women-jumpsuits").image("jumpsuits.svg").displayOrder(2).build(),

            Category.builder().id("cat-women-co-pant").name("Pant Sets").slug("women-co-pant-sets").parentId("cat-women-cords").image("cords.svg").displayOrder(1).build(),
            Category.builder().id("cat-women-co-skirt").name("Skirt Sets").slug("women-skirt-sets").parentId("cat-women-cords").image("cords.svg").displayOrder(2).build(),
            Category.builder().id("cat-women-co-short").name("Short Sets").slug("women-co-short-sets").parentId("cat-women-cords").image("cords.svg").displayOrder(3).build(),

            Category.builder().id("cat-travel-organisers").name("Travel Organisers").slug("travel-organisers").parentId("cat-travel").image("travel-organisers.svg").displayOrder(1).build(),
            Category.builder().id("cat-travel-neck-pillows").name("Neck Pillows & Eye Masks").slug("travel-neck-pillows").parentId("cat-travel").image("travel-neck-pillows.svg").displayOrder(2).build(),
            Category.builder().id("cat-travel-passport").name("Passport Holders").slug("travel-passport-holders").parentId("cat-travel").image("travel-passport.svg").displayOrder(3).build(),

            Category.builder().id("cat-beauty-makeup").name("Makeup").slug("beauty-makeup").parentId("cat-beauty").image("makeup.svg").displayOrder(1).build(),
            Category.builder().id("cat-beauty-lipsticks").name("Lipsticks").slug("beauty-lipsticks").parentId("cat-beauty").image("lipsticks.svg").displayOrder(2).build(),
            Category.builder().id("cat-beauty-brushes").name("Brushes").slug("beauty-brushes").parentId("cat-beauty").image("brushes.svg").displayOrder(3).build(),
            Category.builder().id("cat-beauty-skincare").name("Skincare").slug("beauty-skincare").parentId("cat-beauty").image("skincare.svg").displayOrder(4).build(),
            Category.builder().id("cat-beauty-perfumes").name("Perfumes").slug("beauty-perfumes").parentId("cat-beauty").image("perfumes.svg").displayOrder(5).build()
        ));
        log.info("Category hierarchy seeded");
    }

    private void seedProducts() {
        if (!categoryRepository.existsByName("MEN")) return;
        if (productRepository.count() > 0) productRepository.deleteAll();

        Category shirts = categoryRepository.findById("cat-men-tw-shirts").orElse(null);
        Category tshirts = categoryRepository.findById("cat-men-tw-tshirts").orElse(null);

        List<Product> products = List.of(
            Product.builder()
                .sku("ELEC-LAP-001").name("ProBook X1 Laptop").categoryId(shirts != null ? shirts.getId() : null).categoryName("Shirts")
                .description("High-performance laptop with 16GB RAM, 512GB SSD, and 15.6\" FHD display.")
                .images(List.of("laptop.svg")).price(new BigDecimal("89999")).discountPrice(new BigDecimal("74999")).currency("INR")
                .stock(50).brand("TechPro").featured(true).active(true).tags(List.of("laptop","work","gaming"))
                .reviews(List.of(
                    Product.Review.builder().id("r1").userId("user1").userName("Rajesh").rating(5).comment("Excellent!").createdAt(LocalDateTime.now().minusDays(10)).build(),
                    Product.Review.builder().id("r2").userId("user2").userName("Priya").rating(4).comment("Great value").createdAt(LocalDateTime.now().minusDays(5)).build()
                )).averageRating(4.5).reviewCount(2).salesCount(120).build(),

            Product.builder()
                .sku("ELEC-PHN-002").name("Galaxy S24 Ultra").categoryId(shirts != null ? shirts.getId() : null).categoryName("Shirts")
                .description("Premium smartphone with 200MP camera and S Pen support.")
                .images(List.of("phone.svg")).price(new BigDecimal("124999")).discountPrice(new BigDecimal("109999")).currency("INR")
                .stock(100).brand("Samsung").featured(true).active(true).tags(List.of("phone","premium","5g"))
                .averageRating(4.8).reviewCount(45).salesCount(340).build(),

            Product.builder()
                .sku("CLTH-TSH-001").name("Classic Cotton T-Shirt").categoryId(tshirts != null ? tshirts.getId() : null).categoryName("T-Shirts")
                .description("100% premium cotton T-shirt with comfortable regular fit.")
                .images(List.of("tshirt.svg")).price(new BigDecimal("1299")).discountPrice(new BigDecimal("799")).currency("INR")
                .stock(500).brand("ComfortWear").featured(true).active(true).tags(List.of("tshirt","cotton","casual"))
                .variants(List.of(
                    Product.Variant.builder().id("v7").name("Size").value("S").sku("CLTH-TSH-001-S").price(new BigDecimal("1299")).discountPrice(new BigDecimal("799")).stock(100).build(),
                    Product.Variant.builder().id("v8").name("Size").value("M").sku("CLTH-TSH-001-M").price(new BigDecimal("1299")).discountPrice(new BigDecimal("799")).stock(150).build(),
                    Product.Variant.builder().id("v9").name("Size").value("L").sku("CLTH-TSH-001-L").price(new BigDecimal("1299")).discountPrice(new BigDecimal("799")).stock(150).build(),
                    Product.Variant.builder().id("v10").name("Size").value("XL").sku("CLTH-TSH-001-XL").price(new BigDecimal("1299")).discountPrice(new BigDecimal("799")).stock(100).build()
                )).averageRating(4.6).reviewCount(89).salesCount(1200).build(),

            Product.builder()
                .sku("CLTH-JKT-002").name("Denim Jacket").categoryId(tshirts != null ? tshirts.getId() : null).categoryName("T-Shirts")
                .description("Stylish denim jacket with modern fit and multiple pockets.")
                .images(List.of("jacket.svg")).price(new BigDecimal("2999")).discountPrice(new BigDecimal("1999")).currency("INR")
                .stock(150).brand("FashionHub").featured(false).active(true).tags(List.of("jacket","denim","fashion"))
                .averageRating(4.2).reviewCount(34).salesCount(280).build(),

            Product.builder()
                .sku("HOME-BLD-001").name("Professional Blender").categoryId(shirts != null ? shirts.getId() : null).categoryName("Shirts")
                .description("1200W blender with 6 stainless steel blades and 1.5L jar.")
                .images(List.of("blender.svg")).price(new BigDecimal("5499")).discountPrice(new BigDecimal("3999")).currency("INR")
                .stock(80).brand("HomeChef").featured(true).active(true).tags(List.of("blender","kitchen"))
                .averageRating(4.4).reviewCount(56).salesCount(420).build(),

            Product.builder()
                .sku("BOOK-COOK-001").name("The Art of Indian Cooking").categoryId(shirts != null ? shirts.getId() : null).categoryName("Shirts")
                .description("200+ authentic Indian recipes with step-by-step instructions.")
                .images(List.of("cookbook.svg")).price(new BigDecimal("1499")).discountPrice(new BigDecimal("999")).currency("INR")
                .stock(300).brand("Penguin").featured(true).active(true).tags(List.of("cookbook","indian"))
                .averageRating(4.7).reviewCount(120).salesCount(890).build(),

            Product.builder()
                .sku("SPRT-SNK-001").name("Running Shoes Pro").categoryId(shirts != null ? shirts.getId() : null).categoryName("Shirts")
                .description("Lightweight running shoes with responsive cushioning.")
                .images(List.of("sneakers.svg")).price(new BigDecimal("7999")).discountPrice(new BigDecimal("5499")).currency("INR")
                .stock(200).brand("SportMax").featured(true).active(true).tags(List.of("shoes","running"))
                .variants(List.of(
                    Product.Variant.builder().id("v11").name("Size").value("7").sku("SPRT-SNK-001-7").price(new BigDecimal("7999")).discountPrice(new BigDecimal("5499")).stock(40).build(),
                    Product.Variant.builder().id("v12").name("Size").value("8").sku("SPRT-SNK-001-8").price(new BigDecimal("7999")).discountPrice(new BigDecimal("5499")).stock(60).build(),
                    Product.Variant.builder().id("v13").name("Size").value("9").sku("SPRT-SNK-001-9").price(new BigDecimal("7999")).discountPrice(new BigDecimal("5499")).stock(50).build(),
                    Product.Variant.builder().id("v14").name("Size").value("10").sku("SPRT-SNK-001-10").price(new BigDecimal("7999")).discountPrice(new BigDecimal("5499")).stock(50).build()
                )).averageRating(4.5).reviewCount(67).salesCount(780).build(),

            Product.builder()
                .sku("SPRT-YOG-002").name("Premium Yoga Mat").categoryId(shirts != null ? shirts.getId() : null).categoryName("Shirts")
                .description("Extra thick 6mm yoga mat with non-slip surface.")
                .images(List.of("yoga-mat.svg")).price(new BigDecimal("2499")).discountPrice(new BigDecimal("1799")).currency("INR")
                .stock(180).brand("FlexFit").featured(false).active(true).tags(List.of("yoga","fitness"))
                .averageRating(4.1).reviewCount(23).salesCount(310).build(),

            Product.builder()
                .sku("ELEC-AUD-003").name("Noise-Cancelling Headphones").categoryId(shirts != null ? shirts.getId() : null).categoryName("Shirts")
                .description("Wireless over-ear headphones with active noise cancellation.")
                .images(List.of("headphones.svg")).price(new BigDecimal("14999")).discountPrice(new BigDecimal("9999")).currency("INR")
                .stock(200).brand("SoundWave").featured(true).active(true).tags(List.of("headphones","wireless"))
                .averageRating(4.3).reviewCount(28).salesCount(560).build(),

            Product.builder()
                .sku("HOME-LMP-002").name("LED Desk Lamp").categoryId(shirts != null ? shirts.getId() : null).categoryName("Shirts")
                .description("Adjustable LED desk lamp with USB charging port and touch control.")
                .images(List.of("electronics.svg")).price(new BigDecimal("1999")).currency("INR")
                .stock(120).brand("HomeChef").featured(false).active(true).tags(List.of("lamp","led"))
                .averageRating(4.0).reviewCount(15).salesCount(190).build()
        );

        productRepository.saveAll(products);
        log.info("Seeded {} products", products.size());
    }

    private void seedBanners() {
        if (!categoryRepository.existsByName("MEN")) return;
        if (bannerRepository.count() > 0) bannerRepository.deleteAll();

        bannerRepository.saveAll(List.of(
            Banner.builder().title("Summer Sale!").subtitle("Up to 50% off on Electronics").image("banner1.svg").link("/products?category=electronics").displayOrder(1).build(),
            Banner.builder().title("New Arrivals").subtitle("Check out the latest trends").image("banner2.svg").link("/products").displayOrder(2).build(),
            Banner.builder().title("Sports Festival").subtitle("Gear up for the season!").image("banner3.svg").link("/products?category=sports").displayOrder(3).build()
        ));
        log.info("Seeded 3 banners");
    }
}
