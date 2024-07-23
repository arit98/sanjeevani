-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 17, 2022 at 08:50 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sanjeevani`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`) VALUES
(4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart_details`
--

CREATE TABLE `cart_details` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `box_quantity` int(11) DEFAULT 0,
  `page_quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_details`
--

INSERT INTO `cart_details` (`id`, `cart_id`, `medicine_id`, `box_quantity`, `page_quantity`) VALUES
(2, 1, 11, 100, 55),
(13, 4, 15, 100, 55),
(14, 4, 16, 100, 55);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(20) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `top_category` enum('true','false') NOT NULL DEFAULT 'false',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `parent_id`, `top_category`, `created_at`, `updated_at`) VALUES
(1, 'Gastric', 0, 'true', '2022-11-05 22:51:40', NULL),
(2, 'Daily Use', 0, 'true', '2022-11-05 22:53:48', NULL),
(3, 'Antibiotics', 0, 'true', '2022-11-05 22:54:10', NULL),
(4, 'Syrup', 0, 'true', '2022-11-05 22:54:46', NULL),
(5, 'Vitamin', 0, 'true', '2022-11-05 22:55:17', NULL),
(6, 'Baby Care', 0, 'true', '2022-11-05 23:01:16', NULL),
(7, 'Gynocology', 0, 'true', '2022-11-05 23:01:42', NULL),
(8, 'Sugar', 0, 'true', '2022-11-05 23:10:31', NULL),
(9, 'Pain Killer', 0, 'true', '2022-11-05 23:10:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `company_regno` varchar(155) DEFAULT NULL,
  `name` varchar(155) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `company_regno`, `name`, `status`, `created_at`, `updated_at`) VALUES
(31, '67687687', 'cool', 'active', '2022-09-02 17:29:49', '2022-09-02 17:30:02'),
(32, '676856552', 'gcfg', 'active', '2022-09-06 07:24:45', '2022-09-07 03:19:46');

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_no` int(11) DEFAULT NULL,
  `status` enum('pickup','delivered','cancel') DEFAULT 'pickup',
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `groups_name` varchar(155) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `groups_name`, `status`, `created_at`, `updated_at`) VALUES
(31, 'xxx', 'active', '2022-08-31 14:14:51', NULL),
(33, 't44444444444', 'active', '2022-09-01 20:02:47', NULL),
(34, 't44444444444', 'active', '2022-09-01 20:02:49', NULL),
(35, 't44444444444', 'active', '2022-09-01 20:02:49', NULL),
(36, 't44444444444', 'active', '2022-09-01 20:02:49', NULL),
(38, 'boom', 'inactive', '2022-09-02 17:27:48', '2022-09-02 17:28:29'),
(39, 'jhghu', 'active', '2022-09-06 07:24:30', NULL),
(40, 'ttt', 'active', '2022-09-07 03:24:51', '2022-09-07 03:28:24');

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int(11) NOT NULL,
  `name` varchar(155) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `short_desc` text DEFAULT NULL,
  `long_desc` longtext DEFAULT NULL,
  `box_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `page_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `igst` decimal(12,2) NOT NULL DEFAULT 0.00,
  `cgst` decimal(12,2) NOT NULL DEFAULT 0.00,
  `sgst` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` enum('active','inactive') DEFAULT 'active',
  `offer` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `name`, `company_id`, `category_id`, `short_desc`, `long_desc`, `box_price`, `page_price`, `igst`, `cgst`, `sgst`, `status`, `offer`, `created_at`, `updated_at`) VALUES
(12, 'Zincovit', 31, 2, 'hsffyyr', 'rgsee', '90.00', '9.00', '0.00', '0.00', '0.00', 'active', '0.00', '2022-11-05 23:47:58', NULL),
(13, 'Zintac', 32, 1, 'sthdhrtsrtjt', 'ggsggsht', '80.00', '8.00', '0.00', '0.00', '0.00', 'active', '0.00', '2022-11-05 23:48:59', NULL),
(14, 'Antibiotics', 31, 3, 'safdassgrar', 'grgaergre', '100.00', '10.00', '0.00', '0.00', '0.00', 'active', '0.00', '2022-11-06 01:29:32', NULL),
(15, 'Zerodol SP', 31, 4, 'hgfjyd', 'rtdjtydudu', '500.00', '50.00', '0.00', '0.00', '0.00', 'active', '0.00', '2022-11-06 01:56:25', NULL),
(16, 'Histac', 31, 4, 'gdnrtsr', 'nrnnt', '160.00', '16.00', '0.00', '0.00', '0.00', 'active', '0.00', '2022-11-07 01:30:26', NULL),
(17, 'dsfsdfdsfds', 23, 13, 'dsfdfs', 'cxvzxcvzcvcxvzcxc', '10.20', '10.20', '1.00', '0.00', '0.00', 'active', '0.00', '2022-11-07 01:38:04', '2022-11-13 16:21:50');

-- --------------------------------------------------------

--
-- Table structure for table `medicine_images`
--

CREATE TABLE `medicine_images` (
  `id` int(11) NOT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine_images`
--

INSERT INTO `medicine_images` (`id`, `medicine_id`, `image_name`, `created_at`, `updated_at`) VALUES
(20, 12, 'sanjeevani-1667692078174-548777202.jpg', '2022-11-05 23:47:58', NULL),
(21, 13, 'sanjeevani-1667692139486-324987413.jpg', '2022-11-05 23:48:59', NULL),
(22, 14, 'sanjeevani-1667698172205-408822450.jpg', '2022-11-06 01:29:32', NULL),
(23, 15, 'sanjeevani-1667699785677-545523014.png', '2022-11-06 01:56:25', NULL),
(24, 16, 'sanjeevani-1667784626867-874255982.png', '2022-11-07 01:30:26', NULL),
(33, 17, 'sanjeevani-1668356510837-588710595.jpg', '2022-11-13 16:21:50', NULL),
(34, 17, 'sanjeevani-1668356510843-582781468.png', '2022-11-13 16:21:50', NULL),
(35, 17, 'sanjeevani-1668356510846-108214866.png', '2022-11-13 16:21:50', NULL),
(36, 17, 'sanjeevani-1668356510863-381467573.png', '2022-11-13 16:21:50', NULL),
(37, 17, 'sanjeevani-1668356510871-899577810.png', '2022-11-13 16:21:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `normaluser`
--

CREATE TABLE `normaluser` (
  `id` int(11) NOT NULL,
  `role` int(11) DEFAULT NULL,
  `email` varchar(220) CHARACTER SET utf8mb4 DEFAULT NULL,
  `password` varchar(225) CHARACTER SET utf8mb4 DEFAULT NULL,
  `approve_status` enum('active','inactive') CHARACTER SET utf8mb4 NOT NULL DEFAULT 'active',
  `create_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_no` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `group_id` int(11) DEFAULT NULL,
  `payment_type` enum('cash','online') NOT NULL,
  `order_type` enum('prescription','medicine') NOT NULL,
  `payment_status` enum('paid','not_paid') NOT NULL DEFAULT 'not_paid',
  `order_status` enum('pending','processing','delivered','cancel') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order_medicine_details`
--

CREATE TABLE `order_medicine_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `box_quantity` int(11) NOT NULL DEFAULT 0,
  `page_quantity` int(11) NOT NULL DEFAULT 0,
  `box_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `page_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `igst` decimal(12,2) NOT NULL DEFAULT 0.00,
  `cgst` decimal(12,2) NOT NULL DEFAULT 0.00,
  `sgst` decimal(12,2) NOT NULL DEFAULT 0.00,
  `offer` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','processing','delivered','cancel') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `prescription_image` varchar(155) DEFAULT NULL,
  `status` enum('pending','processing','delivered','cancel') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2022-08-25 18:48:56', NULL),
(2, 'supervisor', '2022-08-25 18:51:59', NULL),
(3, 'deliveryboy', '2022-08-25 18:52:40', NULL),
(4, 'store', '2022-08-25 18:52:55', NULL),
(5, 'doctor', '2022-08-25 18:53:03', '2022-09-07 05:03:47'),
(6, 'users', '2022-11-16 12:46:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `name` varchar(155) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(6, 'Uttar Pradesh', 'inactive', '2022-09-08 07:44:11', '2022-09-08 12:21:39');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `box_quantity` int(11) DEFAULT NULL,
  `page_quantity` int(11) DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT NULL,
  `status` enum('add','order','cancle') DEFAULT 'add',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `medicine_id`, `box_quantity`, `page_quantity`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(9, 11, 1002, 55, '30.00', 'add', '2022-10-26 03:24:33', '2022-10-26 03:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` int(11) DEFAULT NULL,
  `email` varchar(220) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `approve_status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `email`, `password`, `approve_status`, `created_at`, `updated_at`) VALUES
(1, 1, 'daschowdhuryv@gmail.com', '$2b$12$fiO7DR9dijEoCapSSlelkeNkqMUW7HqCWztiM6kqamdUN.LokUfI6', 'active', '2022-09-05 15:10:02', NULL),
(2, 2, 'prosun@gmail.com', '$2b$12$BZ0Yl9Etj/47yXSDFW/j3Os3TpfPNnzihW9Y2/7Qu5Ky6weXxlHcC', 'active', '2022-09-05 15:12:10', NULL),
(3, 3, 'prabir@gmail.com', '$2b$12$gmZDow26pmFSVkuh4WHEJubH8gJROnbd7IDUW.m1rQSee9/1yjF0G', 'active', '2022-09-05 15:18:13', NULL),
(4, 4, 'arnab@gmail.com', '$2b$12$lvG9OPAL5uJgw7XFLeWqbOts2I9EotjDRJ2sCOS37akWW4LL6O2jm', 'active', '2022-09-05 15:24:22', NULL),
(5, 5, 'somnath@gmail.com', '$2b$12$QLtVnY/gboR8hP2VVmeTXuEAuYRrWuUPsDPc2F8zM2LlChYgRhlFa', 'active', '2022-09-05 15:35:38', NULL),
(7, 5, 'ga@ga', '$2b$12$EUbqyMx1J933QYpEXcpd4eV8Ho1fhRwapYMQlrsMGItpiF25dOTty', 'active', '2022-10-10 00:53:28', NULL),
(8, 6, 'zyz@pp', '$2b$12$UcTfIw2bhhe2WG75uZPKBeYsCerJf3M3Ov94KFSGpGs34/xFGHIwq', 'active', '2022-11-16 12:56:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `city_name` varchar(155) DEFAULT NULL,
  `landmark` varchar(155) DEFAULT NULL,
  `address` varchar(155) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `pincode`, `state_id`, `city_name`, `landmark`, `address`, `created_at`, `updated_at`) VALUES
(1, 1, 7233, 333, 'vvvvvvvvvv', '333', '3333333', '2022-09-06 16:16:58', '2022-09-06 16:17:19');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(155) DEFAULT NULL,
  `email` varchar(155) DEFAULT NULL,
  `image_profile` varchar(155) DEFAULT NULL,
  `phone_number` varchar(12) DEFAULT NULL,
  `aadhar_card_no` varchar(16) DEFAULT NULL,
  `aadhar_card_image` varchar(155) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `name`, `email`, `image_profile`, `phone_number`, `aadhar_card_no`, `aadhar_card_image`, `created_at`, `updated_at`) VALUES
(1, 1, 'Aritra Das Chowdhury', NULL, 'sanjeevani-1662481113961-774370189.jpg', '8617535011', 'undefined', NULL, '2022-09-05 15:10:02', '2022-09-06 16:18:33'),
(2, 2, 'Prosun Banerjee', NULL, 'sanjeevani-1662481132334-891961983.jpg', '8615464544', 'undefined', NULL, '2022-09-05 15:12:10', '2022-09-06 16:18:52'),
(3, 3, 'Prabir Mondal', NULL, 'sanjeevani-1662481148230-987722381.jpg', '9609194520', 'undefined', NULL, '2022-09-05 15:18:14', '2022-09-06 16:19:08'),
(4, 4, 'Arnab Sarkar', NULL, 'sanjeevani-1662481165863-280638739.jpg', '7746343553', 'undefined', NULL, '2022-09-05 15:24:23', '2022-09-06 16:19:25'),
(5, 5, 'Somnath halder', NULL, 'sanjeevani-1662481184178-388360720.jpeg', '698598848', 'undefined', 'sanjeevani-1662446401082-125241589.jpg', '2022-09-05 15:35:38', '2022-09-06 16:19:44'),
(6, 6, 'ABC', NULL, NULL, '46444643', NULL, NULL, '2022-09-14 15:19:09', NULL),
(7, 7, 'gym', NULL, NULL, '861775656565', 'undefined', 'sanjeevani-1665428847557-618387866.png', '2022-10-10 00:53:28', '2022-10-10 19:07:27'),
(8, 8, 'xyz', NULL, NULL, '1234567888', NULL, NULL, '2022-11-16 12:56:21', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicine_images`
--
ALTER TABLE `medicine_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `normaluser`
--
ALTER TABLE `normaluser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_medicine_details`
--
ALTER TABLE `order_medicine_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cart_details`
--
ALTER TABLE `cart_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `medicine_images`
--
ALTER TABLE `medicine_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `normaluser`
--
ALTER TABLE `normaluser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
