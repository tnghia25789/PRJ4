-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2023 at 03:19 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_roles`
--

CREATE TABLE `app_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `app_roles`
--

INSERT INTO `app_roles` (`id`, `name`) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` bigint(20) NOT NULL,
  `amount` double DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_id`, `amount`, `address`, `phone`, `user_id`) VALUES
(1, 0, 'Hà Tĩnh', '0967291997', 2),
(2, 0, '123, Phường Đình Bảng, Thành phố Từ Sơn, Tỉnh Bắc Ninh', '0916891997', 3),
(3, 0, '168, Xã Na Khê, Huyện Yên Minh, Tỉnh Hà Giang', '0916855648', 4),
(4, 0, '345 Vo Van Ngan', '0935476003', 6),
(5, 0, '123 Le Van Viet', '0988447856', 7);

-- --------------------------------------------------------

--
-- Table structure for table `cart_details`
--

CREATE TABLE `cart_details` (
  `cart_detail_id` bigint(20) NOT NULL,
  `price` double DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `cart_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_details`
--

INSERT INTO `cart_details` (`cart_detail_id`, `price`, `quantity`, `cart_id`, `product_id`) VALUES
(80, 33390000, 1, 1, 4),
(81, 16890000, 1, 1, 13);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Mobile'),
(2, 'Laptop'),
(3, 'Electric Appliances'),
(4, 'Watch'),
(5, 'Televison');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `favorite_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`favorite_id`, `product_id`, `user_id`) VALUES
(1, 5, 3),
(13, 54, 3),
(22, 4, 2),
(23, 13, 2),
(24, 14, 2),
(27, 13, 3),
(28, 7, 3),
(29, 8, 3),
(30, 4, 3),
(31, 41, 3);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `message`, `status`, `time`) VALUES
(11, 'Nguyen Mau Linh placed an order (11)', b'1', '2023-10-09 19:41:08'),
(12, 'Nguyen Mau Linh placed an order (12)', b'1', '2023-10-12 18:44:23'),
(13, 'Nguyen Mau Linh placed an order (13)', b'1', '2023-10-12 19:01:20'),
(14, 'Nguyen Mau Linh placed an order (14)', b'1', '2023-10-12 19:03:42'),
(15, 'Nguyen Mau Linh placed an order (15)', b'1', '2023-10-12 19:07:06'),
(16, 'Nguyen Mau Linh placed an order (16)', b'1', '2023-10-12 19:59:35'),
(17, 'Nguyen Mau Linh placed an order (17)', b'1', '2023-10-12 20:02:52'),
(18, 'Nguyen Mau Linh cancel an order (17)', b'1', '2023-10-12 20:06:52'),
(19, 'Nguyen Mau Linh placed an order (18)', b'1', '2023-10-14 16:06:42'),
(20, 'Nguyen Mau Linh placed an order (19)', b'1', '2023-10-14 21:50:59'),
(21, 'Nguyen Mau Linh cancel an order (19)', b'1', '2023-10-14 21:51:25'),
(22, 'Nguyen Mau Linh placed an order (20)', b'1', '2023-10-14 21:53:11'),
(23, 'Nguyen Mau Linh placed an order (21)', b'1', '2023-10-14 21:59:53'),
(24, 'Nguyen Mau Linh placed an order (22)', b'1', '2023-10-14 22:13:06'),
(25, 'Nguyen Mau Linh placed an order (23)', b'1', '2023-10-16 15:37:44'),
(26, 'Nguyen Mau Linh placed an order (24)', b'1', '2023-10-16 16:07:36'),
(27, 'Nguyen Mau Linh placed an order (25)', b'1', '2023-10-16 16:52:10'),
(28, 'Nguyen Mau Linh placed an order (26)', b'1', '2023-10-16 18:50:48'),
(29, 'Nguyen Mau Linh placed an order (27)', b'0', '2023-10-16 19:57:01');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orders_id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orders_id`, `address`, `amount`, `order_date`, `phone`, `status`, `user_id`) VALUES
(11, '113, Phường Bình An, Thành phố Dĩ An, Tỉnh Bình Dương', 80880000, '2023-10-09 19:41:08', '0916891997', 0, 3),
(12, '123, Xã Tràng Xá, Huyện Võ Nhai, Tỉnh Thái Nguyên', 39890000, '2023-10-12 18:44:23', '0916891997', 0, 3),
(13, '4545, Xã Cán Chu Phìn, Huyện Mèo Vạc, Tỉnh Hà Giang', 31890000, '2023-10-12 19:01:20', '0916891997', 0, 3),
(14, '4545, Xã Lăng Hiếu, Huyện Trùng Khánh, Tỉnh Cao Bằng', 8000000, '2023-10-12 19:03:42', '0916891997', 0, 3),
(15, '56546, Xã Tân Hoà, Huyện Tân Hiệp, Tỉnh Kiên Giang', 106180000, '2023-10-12 19:07:06', '0916891997', 1, 3),
(16, '646, Xã La Pan Tẩn, Huyện Mường Khương, Tỉnh Lào Cai', 70876140, '2023-10-12 19:59:35', '0916891997', 2, 3),
(17, '56456456hhthh, Xã Mậu Long, Huyện Yên Minh, Tỉnh Hà Giang', 31890000, '2023-10-12 20:02:52', '0916891997', 3, 3),
(18, '344, Xã Đoan Hạ, Huyện Thanh Thuỷ, Tỉnh Phú Thọ', 39890000, '2023-10-14 16:06:42', '0916891997', 2, 3),
(19, '234, Xã Nghĩa Đạo, Thị xã Thuận Thành, Tỉnh Bắc Ninh', 2500, '2023-10-14 21:50:59', '0916891997', 3, 3),
(20, '224, Xã Sông Hinh, Huyện Sông Hinh, Tỉnh Phú Yên', 2500, '2023-10-14 21:53:11', '0916891997', 0, 3),
(21, '221, Xã Nghĩa Bình, Huyện Bù Đăng, Tỉnh Bình Phước', 5000, '2023-10-14 21:59:53', '0916891997', 3, 3),
(22, '434, Xã Ngọc Đồng, Huyện Yên Lập, Tỉnh Phú Thọ', 74290000, '2023-10-14 22:13:06', '0916891997', 3, 3),
(23, '434, Xã Ba Xa, Huyện Ba Tơ, Tỉnh Quảng Ngãi', 75180000, '2023-10-16 15:37:44', '0916891997', 2, 3),
(24, '134, Xã Hương Nộn, Huyện Tam Nông, Tỉnh Phú Thọ', 403580, '2023-10-16 16:07:36', '0916891997', 2, 3),
(25, '545, Xã Đông Sang, Huyện Mộc Châu, Tỉnh Sơn La', 74290000, '2023-10-16 16:52:10', '0916891997', 2, 3),
(26, '1213, Xã Sáng Nhè, Huyện Tủa Chùa, Tỉnh Điện Biên', 31890000, '2023-10-16 18:50:48', '0916891997', 2, 3),
(27, '123, Phường Đình Bảng, Thành phố Từ Sơn, Tỉnh Bắc Ninh', 1300, '2023-10-16 19:57:01', '0916891997', 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_detail_id` bigint(20) NOT NULL,
  `price` double DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`order_detail_id`, `price`, `quantity`, `order_id`, `product_id`) VALUES
(80, 31890000, 1, 11, 5),
(81, 48990000, 1, 11, 6),
(82, 31890000, 1, 12, 5),
(83, 8000000, 1, 12, 54),
(84, 31890000, 1, 13, 5),
(85, 8000000, 1, 14, 54),
(86, 31000000, 1, 15, 7),
(87, 43290000, 1, 15, 8),
(88, 31890000, 1, 15, 5),
(89, 660000, 1, 16, 37),
(90, 33390000, 1, 16, 4),
(91, 31000000, 1, 16, 7),
(92, 402380, 1, 16, 41),
(93, 5423760, 3, 16, 44),
(94, 31890000, 1, 17, 5),
(95, 31890000, 1, 18, 5),
(96, 8000000, 1, 18, 54),
(97, 1300, 1, 19, 3),
(98, 1200, 1, 19, 4),
(99, 1300, 1, 20, 3),
(100, 1200, 1, 20, 4),
(101, 2600, 2, 21, 3),
(102, 2400, 2, 21, 4),
(103, 31000000, 1, 22, 7),
(104, 43290000, 1, 22, 8),
(105, 31890000, 1, 23, 5),
(106, 43290000, 1, 23, 8),
(107, 402380, 1, 24, 41),
(108, 1200, 1, 24, 4),
(109, 43290000, 1, 25, 8),
(110, 31000000, 1, 25, 7),
(111, 31890000, 1, 26, 5),
(112, 1300, 1, 27, 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `discount` int(11) NOT NULL,
  `entered_date` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `sold` int(11) NOT NULL,
  `status` bit(1) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `description`, `discount`, `entered_date`, `image`, `name`, `price`, `quantity`, `sold`, `status`, `category_id`) VALUES
(3, 'It cannot be denied that the launch of the iPhone 12 Pro Max 512GB is Apple\'s serious attack on rivals. The overall refinement from appearance to potential power inside is the inspiration for major players in the industry to strive for improvement.\nPremium design, affirming its standing\nDrawing inspiration from the \"legendary\" iPhone 4 and iPhone 5, instead of pursuing smooth, flowing curves, the iPhone 12 Pro Max is now replaced with straight, square-cut edges and thinner bezels covered with a stainless steel frame processed with a bright, eye-catching PVD coating technology.\n\nThe iPhone 12 Pro Max affirms its identity with a meticulously crafted, distinctive and luxurious design. The flat, crisp edges coupled with a sophisticated steel frame radiate an aura of dominance reserved only for the elite. This premium built quality and attention to finer details solidify its status at the pinnacle of the smartphone world.', 0, '2023-03-08', 'https://res.cloudinary.com/martfury/image/upload/v1647784189/products/uf2jknekpk9uthzx7htt.jpg', 'iPhone 12 Pro Max 512GB', 1250, 9999, 1, b'1', 1),
(4, 'All iPhone 12 models feature 5G connectivity to enable lightning-fast download speeds and page loads with support for multi-band networking.\n\nThe 5G on iPhone 12 Pro is not just fast, it is also intelligent. When your iPhone is downloading updates in the background, it will use LTE or other modes to save battery life. And when heavy downloads are needed, it will automatically switch to 5G. In addition, users can also enable 5G connectivity whenever necessary.\n\n5G on the iPhone 12 lineup delivers game-changing speeds for your most demanding apps and activities. What\'s more, smart data management ensures that 5G is only used when needed, helping to maximize your battery life. So whether you\'re downloading massive files or watching high-quality videos, iPhone 12 will get it done quickly while still providing all-day battery life.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647784312/products/ypb4hxx7eosthjca3fcw.jpg', 'iPhone 12 Pro 512GB', 1200, 993, 7, b'1', 1),
(5, 'In essence, the design of the iPhone 13 is similar to its predecessor. However, a few details have been improved to enhance the user experience. Specifically, the notch is 20% smaller for a more balanced screen ratio and more display area. The rear camera module now features diagonally arranged lenses instead of being vertically aligned like on the iPhone 12, creating a distinct highlight and identification point compared to previous models.\n\nThe iPhone 13 retains the same flat-edge design as the iPhone 12 but with slightly smoother and less sharp corners. This balanced combination of retention of DNA with subtle refinements ensures evolutionary improvement rather than a radical redesign. The smaller notch area aids full-screen usability while maintaining Face ID functionality. Overall, the iPhone 13\'s exterior exudes even more premium visual language optimized for user enjoyment and interactivity.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647784461/products/kxekujkueblk0gm7r0dd.jpg', 'iPhone 13 512GB', 1419, 993, 7, b'1', 1),
(6, 'The iPhone 13 Pro Max 1 TB owns amazing advantages that can easily sweep the hearts of all Apple fans. This includes an exquisitely designed build with fine attention to details, a spacious display, powerful performance, blazing fast 5G connectivity, massive storage and an extraordinarily long-lasting battery.\n\nThe iPhone 13 Pro Max 1 TB\'s sophisticated and luxurious design elevates it above the rest. Coupled with the largest display size in an iPhone yet, this provides an unmatched experience for multimedia enjoyment and productivity. Backed by the strongest Apple chipset for incredible speeds, along with a multi-day battery life, it serves as an effortless companion. Massive 1TB of storage further cements it as a powerhouse.\n\nWith all flagship features maximized, the iPhone 13 Pro Max 1 TB emerges as the ultimate dream device for those seeking an unrivaled smartphone experience. Its compelling strengths will keep users enthralled for years to come.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647784546/products/dggyoel2wvolfjwjuqln.jpg', 'iPhone 13 Pro Max 1TB Green', 1599, 999, 1, b'1', 1),
(7, 'The iPhone 13 Pro stands out with its sophisticated design, powerful chip performance, camera system allowing cinematic-quality recording, long-lasting battery life along with many useful features to help you effortlessly capture countless beautiful moments in life.\n\nFeaturing an elegant design, the iPhone 13 Pro boasts a powerful new A15 Bionic chip for lightning-fast performance. Its versatile triple-camera system, including an improved wide, ultrawide and telephoto lens arrangement, allows you to shoot pro-quality photos and videos with incredible detail.\n\nWith the powerful combination of innovative new camera capabilities, all-day battery life and major iOS upgrades, the iPhone 13 Pro empowers you to capture and experience life in remarkable new ways. Its pro-level specifications make it an excellent companion for photography, videography as well as entertainment and productivity on the go.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647784624/products/r0vvwojslqmpe094c2sx.jpg', 'iPhone 13 Pro 256GB Gold', 1450, 991, 9, b'1', 1),
(8, 'The iPhone 13 Pro Max 512GB from Apple, with its unrivaled 120Hz ProMotion display, powerfully efficient A15 Bionic chip, longest-lasting battery of any iPhone, and significantly upgraded triple camera system, deserves recognition as the most anticipated smartphone of 2021.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647784695/products/dvfk0g3rtszcm0muzne7.jpg', 'iPhone 13 Pro Max 512GB', 1500, 990, 10, b'1', 1),
(9, 'The iPhone 13 Pro Max 512GB from Apple, with its unrivaled 120Hz ProMotion display, powerfully efficient A15 Bionic chip, longest-lasting battery of any iPhone, and significantly upgraded triple camera system, deserves recognition as the most anticipated smartphone of 2021.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647784768/products/zf2hrmlrvjpp9ss0p9vq.jpg', 'iPhone 13 Pro Max 512GB Green', 1500, 995, 5, b'1', 1),
(10, 'With its elegant appearance, the iPhone 13 Pro boasts the powerful new A15 Bionic chip for lightning-fast speeds. Its triple rear camera system, which comprises improved wide, ultrawide and telephoto lenses, allows users to shoot pro-quality photos and videos with incredible detail.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647784910/products/evfvcteq3dij4g97obmf.jpg', 'iPhone 13 Pro 128GB', 1350, 996, 4, b'1', 1),
(11, 'The iPhone 11 represents Apple\'s vision of the modern smartphone - where high-end specifications are packaged in an elegant yet durable design. Its durable glass and aluminum construction radiates premium quality, while the liquid retina HD display brings images to life.\n\nThe lightning-fast A13 Bionic chip delivers blazing speeds for both daily and intensive tasks. The dual-camera system is enhanced to capture stunning photos even in low light. And the long-lasting battery provides all-day power for navigation, entertainment or photography on the go.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647784967/products/t9dfhpdegrxma9jhv7dg.jpg', 'iPhone 11 64GB', 650, 997, 3, b'1', 1),
(12, 'The iPhone 11 128GB is considered the most worth-buying iPhone version of 2019 with affordable price, diverse colors, while still ensuring powerful performance. It can be said that the iPhone 11 128GB is the perfect upgrade of its elder brother, the iPhone Xr.\nThe A13 Bionic\'s powerful hexa-core chip combined with the latest iOS version gives the iPhone 11 extremely fast and smooth performance for all tasks from launching apps to gaming to filming and editing 4K videos. This place the iPhone 11 at the top of smartphone performance charts', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647785234/products/vdwzcybini8poyxjcgqe.jpg', 'iPhone 11 128GB', 750, 996, 4, b'1', 1),
(13, 'The Apple event introduced the new iPhone 12 series, including the appearance of the iPhone 12 mini 64GB with a 5.4-inch \"youngest sibling\" that is small in size but full of potential.\n\nCompact and premium design\n\nDespite seeming at a size disadvantage compared to its elder brothers iPhone 12, iPhone 12 Pro and iPhone 12 Pro Max, the iPhone 12 mini sports a compact 5.4-inch OLED display but weighs only 135g, making it extremely compact, convenient and easy to grip firmly while still packing the most advanced technologies.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647785284/products/ynrcze13baz0i3qlvnkt.jpg', 'iPhone 12 mini 64GB', 500, 994, 6, b'1', 1),
(14, 'The Apple event introduced the new iPhone 12 series, including the appearance of the iPhone 12 mini 64GB with a 5.4-inch \"youngest sibling\" that is small in size but full of potential.\n\nCompact and premium design\n\nDespite seeming at a size disadvantage compared to its elder brothers iPhone 12, iPhone 12 Pro and iPhone 12 Pro Max, the iPhone 12 mini sports a compact 5.4-inch OLED display but weighs only 135g, making it extremely compact, convenient and easy to grip firmly while still packing the most advanced technologies.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647785332/products/o0azxzdnkv3i4fxfljoo.jpg', 'iPhone 12 mini 128GB', 550, 997, 3, b'1', 1),
(15, 'Its flagship-level specifications make it an excellent on-the-go companion for photography, social media, content consumption and staying connected. The iPhone 13 mini is the perfect smartphone for those valuing compact size without compromising on power.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647785406/products/r4kh6uebpnkvuvpb1egg.jpg', 'iPhone 13 mini 128GB Green', 900, 1000, 0, b'1', 1),
(16, 'The Acer Nitro 5 Gaming laptop is enclosed by a solid, durable plastic case with finely cut edges. The laptop lid features the Acer logo delicately placed between two lightning streaks. Weighing 2.2kg and only 23.9mm thin, it remains conveniently portable in bags, always ready to accompany you anywhere on every virtual gaming battleground with friends or to carry to school and work without worry of being too bulky or cumbersome.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647785590/products/f9gbx72wlerazlxzyrry.jpg', 'Acer Nitro 5 AN515-58-525P Gaming Laptop ', 1000, 998, 2, b'1', 2),
(17, 'Laptop Acer Nitro 5 Gaming AN515 45 R6EV R5 5600H/8GB/512GB/144Hz/4GB GTX1650/Win11', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647785762/products/p8rlozbmfa0oochdo4ep.jpg', 'Acer Nitro 5 Gaming AN515 45 R6EV R5 5600H', 1120, 2000, 0, b'1', 2),
(18, 'The Dell Inspiron 15 3511 i3 (P112F001CBL) laptop is a modern device designed to serve the needs of learning - office work and entertainment in a youthful, sophisticated design along with stable performance power sufficiently meeting diverse usage needs.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647785881/products/phubaca4cxvfxmdlv4pe.jpg', 'Dell Inspiron 15 3511 i3 1115G4/4GB/256GB', 1030, 10000, 0, b'1', 2),
(19, 'The HP 240 G8 i3 laptop (519A7PA) is a model positioned for the student and office worker market, suitable for basic study and productivity tasks. With its simple and basic design combined with stable performance from the 10th generation Intel processor, this laptop will become the optimal choice for meeting basic work, study and entertainment needs.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647785938/products/dwnwyxveayzdycsuhsqv.jpg', 'HP 240 G8 i3 1005G1/4GB/256GB/Win10 (519A7PA)', 1050, 1000, 0, b'1', 2),
(20, 'The Intel NUC M15 i5 (BBC510EAUXBC1) turns heads with its minimalist yet premium and sophisticated design, along with the power of the advanced 11th generation Intel processor, ensuring it will be one of the ideal laptops for learning and productivity.', 5, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786009/products/dvogbpnopuqejvj7lcai.jpg', 'Intel NUC M15 Kit i5 1135G7/16GB/512GB/Win10 (BBC510EAUXBC1)', 1500, 997, 3, b'1', 2),
(21, 'Compact yet powerful, the Lenovo Yoga Duet 7 13ITL6 i5 1135G7 (82MA000PVN) is a worthy productivity partner with its potent hardware featuring an Intel 11th Gen chip, ready to help you achieve success in work, learning and entertainment tasks.', 2, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786030/products/dw9gpyamij3v4yuqamkx.jpg', 'Lenovo Yoga Duet 7 13ITL6 i5 1135G7/8GB/512GB/Touch/Pen/Win10 (82MA000PVN)', 1700, 997, 3, b'1', 2),
(22, 'Breaking all boundaries, the Lenovo Yoga Slim 7 14ITL05 i7 1165G7 (82A300DQVN) laptop possesses a superior configuration and trendy design worthy of an ideal working companion. It stands ready to accompany you on every front, whether for work or entertainment.', 2, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786079/products/mg9e3fyomdy150iuxqys.jpg', 'Lenovo Yoga Slim 7 14ITL05 i7 1165G7/8GB/512GB/Win10 (82A300DQVN)', 1900, 997, 3, b'1', 2),
(23, 'The Lenovo ThinkBook 14p G2 ACH R5 (20YN001HVN) laptop draws its powerful performance from the AMD CPU. Coupled with a modern and premium design as well as supported by smart technologies and features, this product is one you cannot miss out on.', 2, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786168/products/npreegiv4ytn37lqi8lv.jpg', 'ThinkBook 14p G2 ACH R5 5600H/16GB/512GB/Win11 (20YN001HVN)', 1250, 996, 4, b'1', 2),
(24, 'The MVW ML065-01 is a stylish timepiece perfectly suited for modern men. Featuring a sleek 42mm stainless steel case with a well-polished finish, it exhibits craftsmanship and durability.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786381/products/xleslpwdb7jwwolyzrsy.jpg', 'MVW ML065-01 Men\'s Watch ', 300, 1998, 2, b'1', 4),
(25, 'The MVW ML060-02 exudes understated elegance for the professional man. Its stainless steel case features a sleek 40mm diameter and brushed finish that minimizes fingerprint smudges.\n\nA subtle navy blue sunray dialprovides the ideal balance of contrast and sophistication. Silver-toned Arabic hour markers and slim hands offer sharp readability against the rich backdrop.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786443/products/bnkcc4epxfokwhkg9ahn.jpg', 'MVW ML060-02 Men\'s Watch ', 300, 996, 4, b'1', 4),
(26, 'The MVW ML061-01 exudes understated sophistication for modern men. Its 44mm stainless steel case matches a refined yet durable style.\n\nThe dark grey sunray dial provides optimum legibility against a neutral background. Expressive Arabic hour markers and slim hands sweep gracefully over the matte surface.', 1, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786504/products/jnrtafwldbmknbdydja1.jpg', 'MVW ML061-01 Men\'s Watch ', 299, 995, 5, b'1', 4),
(27, 'Powered by a high-quality Japanese quartz movement, this men\'s watch keeps impeccable time with a high-torque second hand smoothly sweeping around the track.\n\nEquipped with a tough mineral crystal lens, the ML065-01 withstands scratches and impacts. Its stainless steel bracelet not only matches the case material but also enhances durability.', 5, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786553/products/amve9lyjan5ln25phy2t.jpg', 'MVW ML123-01 Men\'s Watch ', 310, 995, 5, b'1', 4),
(28, 'The MVW MS071-01 exudes a sense of elegant luxury for sophisticates. Its 45mm stainless steel case paired with a black ionic plated finish creates a premium look.\n\nThe striking black dial amplifies drama with a sunray pattern. Screwed silver-colored hour markers and hands offer an elegant contrast against the rich backdrop.', 4, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786624/products/iiqmipuuz0rcahu7ptvm.jpg', 'MVW MS071-01 Men\'s Watch ', 670, 198, 2, b'1', 4),
(29, 'The MVW MS074-01 exudes contemporary sophistication for luxury-minded men. Its 45mm stainless steel case in a brushed black ionic plating creates a premium aesthetic.\n\nThe striking black dial with sunray pattern amplifies visual drama. Screwed silver-colored indexes and hands offer elegant pop against the rich backdrop.', 3, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786688/products/i6trucr8emaxlgahwxfo.jpg', 'MVW MS074-01 Men\'s Watch ', 745, 2994, 6, b'1', 4),
(30, 'The Elio EL050-01/EL050-02 set offers a stylish way for two to stay connected through time.\n\nEach 40mm stainless steel case features a matte finish complemented by a black dial. Silver tone hour markers and slender hands provide clear readability.\n\nPowered by high-precision Japanese quartz movements, both timepieces keep accurate time down to the second. Practical date windows are positioned at 3 o\'clock.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786777/products/teky6z1jw35rtgxescrf.jpg', 'Elio EL050-01/EL050-02 Watch Set', 580, 597, 3, b'1', 4),
(31, 'Silver-tone indexes and hands allow clear reading against the anthracite backgrounds. Luminous markers provide visibility in low light.\n\nPowered by accurate Japanese quartz movements, both timepieces keep precise time. Date windows at 3 o\'clock add functionality.', 1, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786847/products/gbafyuzglubtnu0vyl5i.jpg', 'Elio EL069-01/EL069-02 Watch Set ', 460, 795, 5, b'1', 4),
(32, 'Topped with durable mineral crystals, these watches withstand daily wear. Their stainless steel bracelets craft elegant unity.\n\nPresented beautifully in a luxury gift box, this set facilitates coordinating busy schedules with subtle flair.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786900/products/kiu3p58llk3ueozormad.jpg', 'Elio EL073-01/EL073-02 Watch Set', 660, 6860, 8, b'1', 4),
(33, 'The Elio EL075 set offers stylish synchronization for those who share their time and style.\n\nEach 40mm stainless steel case features a handsome brushed finish. Black ionic plated bezels and dials provide rich contrast.', 3, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647786978/products/plslwvu8poiu4cgnzpva.jpg', 'Elio EL075-01/EL075-02 Watch Set ', 605, 8682, 4, b'1', 4),
(34, 'The Orient RA-AS0101S exhibits sophistication and luxury through its impeccable craftsmanship. The 42mm stainless steel case with polished finish provides durability and elegance.\n\nThe silver sunray dial underlined by luminous silver-white indexes and hands ensures excellent legibility day and night. A date window located at 3 o\'clock adds functionality.', 5, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787043/products/fzxzc3xiyvkzmspxuvyy.jpg', 'Orient RA-AS0101S - Automatic Men\'s Watch ', 300, 197, 3, b'1', 4),
(35, 'Powered by Orient\'s exclusive in-house caliber F6724 automatic movement, it gains energy from natural wrist motion for accurate timekeeping without batteries. It features 24 jewels and 21,600 vibrations per hour.\n\nTopped with a convex sapphire crystal for superb clarity and scratch resistance. It is water resistant to 50 meters.', 1, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787083/products/kohzc0tpbkpnw0g0z61a.jpg', 'Orient Star RE-AT0001L00B  Men\'s Watch', 460, 397, 3, b'1', 4),
(36, 'The Orient Star RE-AT0108L00B is a classic leather strap watch made for men. Orient Star is a sub-brand of Japanese watchmaker Orient Watch Co., known for producing stylish and fashion-oriented timepieces.\n\nThis particular model features a round stainless steel case with a diameter of 40mm. The stainless steel provides durability and suits both casual and formal attire. The case has an exhibition case back that allows viewing of the Japanese quartz movement inside.', 35, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787137/products/xb48ounby16n6m73tw8b.jpg', 'Orient Star RE-AT0108L00B Men\'s Watch ', 890, 991, 9, b'1', 4),
(37, 'The Ava NK-A611 electric kettle has a 4-liter (1.06 US gallon) capacity, making it ideal for households, offices, or any setting where multiple servings of hot water are needed daily.\n\nIt features a durable, stainless steel exterior that is easy to clean. The kettle stands on a reliable plastic base for stability, and has comfortable, heat-resistant handles for lifting and pouring.', 45, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787321/products/e2ysqnrbpaemk51vrbv3.png', 'Ava NK-A611 4L Electric Kettle ', 51, 1994, 6, b'1', 3),
(38, 'The Hommy HJ-8060 is an effective steam iron that helps eliminate wrinkles quickly and easily.\n\nIt features a 1,200W power rating which allows it to heat up fast. The stainless steel soleplate glides smoothly over fabrics.\n\nThis iron shoots out powerful bursts of steam on demand through its spray trigger. The steam output is adjustable using the variable steam slider.', 30, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787375/products/x4uv8nbn2ltf6p5kih9e.jpg', 'Hommy HJ-8060 Steam Iron', 20, 994, 6, b'1', 3),
(39, 'The Hommy GS-402 citrus juicer provides an efficient way to extract fresh juice from oranges, lemons, limes and other citrus fruits.\n\nIts stainless steel construction gives durability, while the streamlined design takes up minimal counter space. The wide juicing cone fits whole fruits for maximum yield.', 35, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787456/products/qdqbc0gdmenzirhnff4a.jpg', 'Hommy GS-402 Citrus Juicer', 27, 1994, 6, b'1', 3),
(40, 'The Kangaroo KG50F79 is a powerful yet energy efficient air conditioner fan. Featuring a 50cm blade, it circulates air across large indoor spaces comfortably.\n\nThree speed settings allow personalized airflow - from a gentle breeze to strong winds circulating the whole room. The oscillation function provides full coverage without manual adjustments.', 30, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787495/products/dyvgtmhwtyvugenigbdx.jpg', 'Kangaroo KG50F79 Air Conditioner Fan', 285, 1994, 6, b'1', 3),
(41, 'The Sunhouse SHD5315G is a versatile kitchen appliance that streamlines many cooking tasks. Its powerful 500-watt motor and sharp stainless steel blades can handle any recipe with ease.\n\nThis food processor comes equipped with an array of accessories for slicing, shredding, kneading and mixing. A 3.5L stainless steel bowl accommodates large volumes.', 38, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787544/products/ik9frzbpix0fceq6x9fh.jpg', 'Sunhouse SHD5315G Multifunction Food Processor', 29, 2991, 9, b'1', 3),
(42, 'The Kangaroo KG18RC3 is a versatile electric rice cooker perfect for families and bachelors alike. With a capacity of 1.8 liters, it can prepare perfect rice for 4-6 people in one batch.\n\nIt features three cooking functions - white rice, brown rice and steam, along with a keep warm mode. Simply select the desired setting and walk away - the microcomputer control automatically switches to warm once rice is ready.', 32, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787585/products/cvblbk7xvosc7t1855y4.jpg', 'Kangaroo 1.8L KG18RC3 Rice Cooker', 28, 4494, 6, b'1', 3),
(43, 'The Sunhouse Mama SHD5505 slow juicer makes it easy to extract maximum nutrients and vitamins from fruits and vegetables. Its low-speed masticating process preserves nutrients better than high-speed centrifugal juicers.\n\nPowered by an 80W motor that spins at only 80 RPM, it slowly crushes and presses ingredients, extracting 30-40% more juice without producing excessive heat or oxidation.', 37, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787633/products/qtyon1lnuey1nsuymaej.jpg', 'Sunhouse Mama SHD5505 Electric Slow Juicer', 136, 3197, 3, b'1', 3),
(44, 'The Joyoung KL35-D981 electric air fryer offers a fast, healthy and mess-free way to enjoy fried foods. Its 3.5-liter capacity serves medium-sized families or gatherings.\n\nUsing rapid hot air circulation instead of oil, it creates crunchy exteriors and moist interiors similar to deep frying. A 1500W powerful heating system ensures fast, efficient cooking.', 38, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787700/products/ecymkwbycki4c2rojg1x.jpg', 'Joyoung KL35-D981 3.5L Electric Air Fryer', 124, 994, 6, b'1', 3),
(45, 'The Sunhouse SHD7727 is designed to cool the air in your space. It utilizes a combination of water evaporation and a fan to produce a cooling effect. It can help lower the temperature and provide relief during hot weather.\nThe SHD7727 offers various adjustable settings to customize your cooling experience. It typically includes multiple fan speeds and modes, allowing you to choose the desired airflow intensity and pattern.', 25, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787742/products/qjucg8haycn6brynl6dp.jpg', 'Sunhouse SHD7727 Air Cooler Fan', 250, 993, 7, b'1', 3),
(46, 'The Casper 32HX6200 is a 32-inch smart TV that offers access to all your favorite content alongside intelligent features.\n\nIts HD-ready LED panel delivers sharp 720p resolution pictures. Dolby Audio enhances sound quality for an immersive experience.', 10, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787912/products/v4jmkct2wv1ch4gp81cu.jpg', 'Casper 32 inch 32HX6200 Smart TV ', 213, 998, 2, b'1', 5),
(47, 'The Casper 43FG5200 is a feature-packed 43-inch Android TV that transforms home entertainment. Its 4K Ultra HD display with HDR technology brings out vibrant colors and incredible detail.\n\nPowered by a quad-core processor and backed by 2GB RAM/16GB storage, it zips through apps, games and content smoothly. The Android TV operating system gives access to thousands of apps and games from the Google Play Store.', 5, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647787952/products/ckfsygmd81oqv0pazzix.jpg', 'Casper 43 inch 43FG5200 Android TV', 331, 996, 4, b'1', 5),
(48, 'Powered by a quad-core processor, the advanced Casper smart TV platform allows seamless access to all your entertainment apps. Stream movies and shows from Netflix, YouTube, and more directly from the convenient home screen.\n\nBuilt-in WiFi enables wireless casting from compatible mobile devices via Chromecast. Bluetooth connectivity is also included for wireless audio playback.', 9, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647788011/products/brujtacpttkloi7lmo51.jpg', 'Casper 43 inch 43FX6200 Smart TV ', 298, 300, 0, b'1', 5),
(49, 'The AQUA LE50AQT6600UG is a feature-packed 50-inch 4K Android TV designed for immersive home entertainment.\n\nIt features a Ultra HD 4K display with HDR and Dolby Vision support, delivering over 1 billion vibrant colors and incredible detail. This large screen with 3840x2160 resolution is perfect for movies, gaming, and live sports.', 21, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647788066/products/khwmx5vbjuoggtrwm0qw.png', 'AQUA 4K 50 inch LE50AQT6600UG Android TV', 532, 686, 0, b'1', 5),
(50, 'The Casper 32HG5200 is a 32-inch Android TV that gives you access to all your entertainment and apps on a compact smart display.\n\nIts HD-ready LED panel provides sharp 720p resolution pictures for excellent clarity. Dynamic color enhancement upscales weaker signals for rich, vivid colors.', 9, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647788111/products/ose69046ans0nunofnj7.jpg', 'Casper 32 inch 32HG5200 Android TV', 230, 1998, 2, b'1', 5),
(51, 'The Samsung QA55QN85A is a 55-inch Smart TV featuring cutting-edge Neo QLED technology for superb image quality. Its 4K display delivers over 1 billion vivid colors and incredibly lifelike clarity with Quantum Dot color.\n\nQuantum Mini LEDs provide exceptionally precise illumination control for deeper blacks and greater contrast across the entire screen. HDR support enhances highlights and details further.', 30, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647788185/products/od9njyqkptzaehpc3cxr.jpg', 'Neo QLED 4K 55 inch Samsung QA55QN85A Smart TV ', 1790, 997, 3, b'1', 5),
(52, 'The Samsung QA43Q65A is a feature-packed 43-inch QLED 4K TV that delivers stunning Ultra HD visuals and smart functionality.\n\nIts QLED display with Quantum Dot color produces over a billion vibrant colors and greater brightness for lifelike picture quality. Dolby Digital Plus enhances audio with deep bass and clarity.', 25, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647788242/products/ziy6jo5sh81sdhjzdfgw.jpg', 'QLED 4K 43 inch Samsung QA43Q65A Smart TV', 720, 998, 2, b'1', 5),
(53, 'The TCL 43S5200 is a 43-inch Android TV that provides an immersive entertainment experience. Its HD-Ready LED screen delivers crisp Full HD 1080p resolution pictures.\n\nPowered by Android TV, it offers instant access to thousands of apps and games from the Google Play Store. Stream all your favorite content from platforms like Netflix, YouTube, Prime Video and more directly from the home screen.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647788302/products/h22k6iscmwnp4gdzb70j.jpg', 'TCL 43 inch L43S5200 Android TV', 353, 998, 2, b'1', 5),
(54, 'The Samsung UA32T4500 is a compact 32-inch smart TV that packs powerful features into a space-saving size.\n\nIts HD ready LED screen delivers sharp 720p resolution pictures. Crystal Display enhances contrast and colors for incredible lifelike images.\nBuilt-in WiFi allows easy wireless streaming and screen mirroring from compatible mobile devices. Bluetooth connectivity expands audio options.', 0, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647788354/products/y6kprse5lbohzfryfhup.jpg', 'Samsung 32 inch UA32T4500 Smart TV', 340, 999, 1, b'1', 5),
(55, 'The Sony KD-43X75 is a feature-packed 43-inch 4K Android TV made for extraordinary home entertainment.\n\nIts 4K HDR display delivers over a billion vibrant colors and incredible clarity with four times the resolution of Full HD. Partners with Dolby Vision and Dolby Atmos for intense images and sound.', 10, '2022-03-20', 'https://res.cloudinary.com/martfury/image/upload/v1647788426/products/j3diqobxmixdtow2jtci.jpg', 'Sony 4K 43 inch KD-43X75 Android TV', 549, 998, 2, b'1', 5),
(56, 'The iPhone 14 Pro Max is Apple\'s most advanced smartphone to date. Available in a 1TB storage option for the first time, it offers massive space to hold your entire digital life.\n\nWith 1 terrabyte (1TB) of internal memory, the iPhone 14 Pro Max gives you incredi', 0, '2023-10-17', 'https://res.cloudinary.com/martfury/image/upload/v1697542872/products/kd6cu5szbz3jjnxm2abn.jpg', 'iPhone 15 Pro Max 1TB ', 2400, 1, 0, b'1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rates`
--

CREATE TABLE `rates` (
  `id` bigint(20) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `rate_date` datetime DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `order_detail_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `register_date` date DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `address`, `email`, `gender`, `image`, `name`, `password`, `phone`, `register_date`, `status`, `token`) VALUES
(2, '233 Quang Trung', 'greenyshop.adm@gmail.com', b'0', 'https://res.cloudinary.com/martfury/image/upload/v1697448893/users/wqsckofkkv9bdnqircds.png', 'Doan Nguyen Hong Quan', '$2a$10$yvcT5zT/lDrM89Lofss6GeF0icqluuVVxo2QX4BehAh75k.eAzFIe', '0967291997', '2022-03-20', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJncmVlbnlzaG9wLmFkbUBnbWFpbC5jb20iLCJzY29wZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sImlzcyI6Imh0dHA6Ly9kZXZnbGFuLmNvbSIsImlhdCI6MTY0Nzc4MjE4MywiZXhwIjoxNjQ3ODAwMTgzfQ.cLQLN6HPjClhuJFdBro1WHKEKfA7wYbBa3Eg3uHfNAE'),
(3, '345 Vo Van Ngan', 'diepmocphong@gmail.com', b'1', 'https://res.cloudinary.com/martfury/image/upload/v1697449660/users/bxcghxtobbscozlcxhps.png', 'Nguyen Mau Linh', '$2a$10$M6dB6lT9Me77EqIml4X8s.qM2fllr1DtGp835ljJf2USkSTWSPlYS', '0935476003', '2022-03-20', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodXVkb25nMjk3QGdtYWlsLmNvbSIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaXNzIjoiaHR0cDovL2RldmdsYW4uY29tIiwiaWF0IjoxNjQ3Nzg5NDI5LCJleHAiOjE2NDc4MDc0Mjl9.JfbZQ2D8lRg8UPWhnnLMO9R-lFW_8-r2hxV9kOVZRZM'),
(4, '90 Nguyen Huu Canh', 'thaochi6404@gmail.com', b'1', 'https://res.cloudinary.com/martfury/image/upload/v1697448056/users/ykopzn1gwyssitbyxrvw.png', 'Dang Ngoc Minh Triet', '$2a$10$EWTp2tH0Rc1osvewWztXM.ba02wWffEupaG0.jziUul7b8WYUal3K', '0916855648', '2022-03-23', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFvY2hpNjQwNEBnbWFpbC5jb20iLCJzY29wZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sImlzcyI6Imh0dHA6Ly9kZXZnbGFuLmNvbSIsImlhdCI6MTY0ODA0MzUzNywiZXhwIjoxNjQ4MDYxNTM3fQ.589LqMNNJ-NiF0s425cR_tfAr3cfhqf7rpQ_QU1AEIw'),
(6, '82 Hoang Dieu', 'linhnmts2006016@fpt.edu.vn', b'1', 'https://res.cloudinary.com/martfury/image/upload/v1697443558/users/mxpmryfu375per6biqcd.png', 'Admin', '$2a$10$de7aBjRoQIBpfRpQ7mO0Vu6zA3dACdj5p8IXMlebd2K0e/xFSgoa2', '0935476003', '2023-10-12', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaW5obm10czIwMDYwMTZAZnB0LmVkdS52biIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaXNzIjoiaHR0cDovL2RldmdsYW4uY29tIiwiaWF0IjoxNjk3MTA5NjUwLCJleHAiOjE2OTcxMjc2NTB9.xQa1IHxFs1FOlz3_1oifw-wOGHiZmFmj-WKyIl1-mGY'),
(7, '123 Le Van Viet', 'nmlinh.kk@gmail.com', b'1', 'https://res.cloudinary.com/martfury/image/upload/v1697448910/users/cwy0vsanzhqxxdplsfai.png', 'Truong Thanh Nghia', '$2a$10$XPjtpfSpbkHAyNhgEslAWu.x6Jfwy4WnUxagccNM5HQAVtQ8F.wlK', '0988447856', '2023-10-16', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJubWxpbmgua2tAZ21haWwuY29tIiwic2NvcGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpc3MiOiJodHRwOi8vZGV2Z2xhbi5jb20iLCJpYXQiOjE2OTc0NDQ3ODgsImV4cCI6MTY5NzQ2Mjc4OH0.57FWkbJbGREKVF7E6lcWkELPCrBTYuGZ8mzY4wtbyOk');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(2, 1),
(3, 1),
(4, 1),
(6, 2),
(7, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_roles`
--
ALTER TABLE `app_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `FKb5o626f86h46m4s7ms6ginnop` (`user_id`);

--
-- Indexes for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD PRIMARY KEY (`cart_detail_id`),
  ADD KEY `FKkcochhsa891wv0s9wrtf36wgt` (`cart_id`),
  ADD KEY `FK9rlic3aynl3g75jvedkx84lhv` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`favorite_id`),
  ADD KEY `FK6sgu5npe8ug4o42bf9j71x20c` (`product_id`),
  ADD KEY `FKk7du8b8ewipawnnpg76d55fus` (`user_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orders_id`),
  ADD KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `FKjyu2qbqt8gnvno9oe9j2s2ldk` (`order_id`),
  ADD KEY `FK4q98utpd73imf4yhttm3w0eax` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`);

--
-- Indexes for table `rates`
--
ALTER TABLE `rates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKoesgfm245y1ula1pn74fw9mkk` (`order_detail_id`),
  ADD KEY `FK4mdsmkrr7od84tpgxto2v3t2e` (`product_id`),
  ADD KEY `FKanlgavwqngljux10mtly8qr6f` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKihg20vygk8qb8lw0s573lqsmq` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app_roles`
--
ALTER TABLE `app_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cart_details`
--
ALTER TABLE `cart_details`
  MODIFY `cart_detail_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `favorite_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_detail_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `rates`
--
ALTER TABLE `rates`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD CONSTRAINT `FK9rlic3aynl3g75jvedkx84lhv` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `FKkcochhsa891wv0s9wrtf36wgt` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FK6sgu5npe8ug4o42bf9j71x20c` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `FKk7du8b8ewipawnnpg76d55fus` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `FK4q98utpd73imf4yhttm3w0eax` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `FKjyu2qbqt8gnvno9oe9j2s2ldk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`orders_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `rates`
--
ALTER TABLE `rates`
  ADD CONSTRAINT `FK4mdsmkrr7od84tpgxto2v3t2e` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `FKanlgavwqngljux10mtly8qr6f` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKoesgfm245y1ula1pn74fw9mkk` FOREIGN KEY (`order_detail_id`) REFERENCES `order_details` (`order_detail_id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKihg20vygk8qb8lw0s573lqsmq` FOREIGN KEY (`role_id`) REFERENCES `app_roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
