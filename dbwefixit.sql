-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2022 at 05:42 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbwefixit`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_appointments`
--

CREATE TABLE `tbl_appointments` (
  `id` int(11) NOT NULL,
  `client_id` varchar(100) NOT NULL,
  `freelancer_id` varchar(100) NOT NULL,
  `jobpost_id` int(11) NOT NULL,
  `proj_desc` text NOT NULL,
  `proj_cost` varchar(100) NOT NULL,
  `proj_addr` varchar(200) NOT NULL,
  `start_date` varchar(100) NOT NULL,
  `end_date` varchar(100) NOT NULL,
  `service` text NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `c_status` varchar(100) NOT NULL,
  `f_status` varchar(100) NOT NULL,
  `c_rating` varchar(100) NOT NULL,
  `f_rating` varchar(100) NOT NULL,
  `c_set` varchar(20) NOT NULL,
  `f_set` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_appointments`
--

INSERT INTO `tbl_appointments` (`id`, `client_id`, `freelancer_id`, `jobpost_id`, `proj_desc`, `proj_cost`, `proj_addr`, `start_date`, `end_date`, `service`, `created_at`, `c_status`, `f_status`, `c_rating`, `f_rating`, `c_set`, `f_set`) VALUES
(67, 'kytqwnw8je5xj3dtg6a', 'bysus0eq8j8x2q808a646', 19, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '1000', 'Baliuag', '1/15/2022', '1/17/2022', 'riderse,', '2022-01-15 00:49:05', 'done', 'done', '2.5', '4', '', ''),
(76, 'kytqwnw8je5xj3dtg6a', 'qysus0eq8j8x2q808a646', 0, '', '3000', 'tilapaps', '1/25/2022', '1/28/2022', 'plumbing', '2022-01-25 21:46:37', 'done', 'done', '4.5', '5', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_fbphoto`
--

CREATE TABLE `tbl_fbphoto` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `fb_photos` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_fbphoto`
--

INSERT INTO `tbl_fbphoto` (`id`, `appointment_id`, `fb_photos`) VALUES
(79, 67, 'http://192.168.42.241/ehiremo/backend/uploads/feedback_photos/61e1ab0a4b17a7.13709692.jpg'),
(82, 76, 'http://192.168.42.241/ehiremo/backend/uploads/feedback_photos/61f0043208bb04.57706460.jpg'),
(83, 76, 'http://192.168.42.241/ehiremo/backend/uploads/feedback_photos/61f004321d64e8.10334502.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedbacks`
--

CREATE TABLE `tbl_feedbacks` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `fb_from` varchar(100) NOT NULL,
  `fb_to` varchar(100) NOT NULL,
  `fb_comment` text NOT NULL,
  `fb_star` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_feedbacks`
--

INSERT INTO `tbl_feedbacks` (`id`, `appointment_id`, `fb_from`, `fb_to`, `fb_comment`, `fb_star`) VALUES
(123, 67, 'bysus0eq8j8x2q808a646', 'kytqwnw8je5xj3dtg6a', 'salamat boss neggy sa 100 peso tip', '2.5'),
(124, 67, 'kytqwnw8je5xj3dtg6a', 'bysus0eq8j8x2q808a646', 'ayos ka kahit ambaho mo', '4'),
(130, 76, 'kytqwnw8je5xj3dtg6a', 'qysus0eq8j8x2q808a646', 'saludo ako sayo papi chulo', '4.5'),
(131, 76, 'qysus0eq8j8x2q808a646', 'kytqwnw8je5xj3dtg6a', 'maraming salamat din boss jb', '5');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_jobs`
--

CREATE TABLE `tbl_jobs` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `job_headline` varchar(50) NOT NULL,
  `job_location` varchar(50) NOT NULL,
  `job_services` varchar(200) NOT NULL,
  `job_age_range` varchar(50) NOT NULL,
  `job_scope` varchar(50) NOT NULL,
  `job_rate_desc` varchar(50) NOT NULL,
  `job_rate` varchar(50) NOT NULL,
  `job_desc` text NOT NULL,
  `job_createdAt` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_jobs`
--

INSERT INTO `tbl_jobs` (`id`, `user_id`, `job_headline`, `job_location`, `job_services`, `job_age_range`, `job_scope`, `job_rate_desc`, `job_rate`, `job_desc`, `job_createdAt`, `status`) VALUES
(13, 'ksvlawe2wtrrxeij7iic', 'Creative Design', 'Pulilan Bulacan', 'Graphic Designer', '18-45 years old', 'Small', 'Fixed Rate', 'Php 1,500', 'Hi! I\'m Mika and I am looking for a Graphic artist. I am looking for my third transaction. Check out my profile to see how good client I am. Don\'t hesitate to message me.', '2021-11-26 17:03:44', ''),
(14, 'ksvlaweg23wtrrxeij7iic', 'Programmer', 'Baliuag Bulacan', 'Programmer,Developer,Analyst', '18-41 years old', 'Medium', 'Fixed Rate', 'Php 10,000', 'Hello guys! I\'m Hello Mickey and I need a programmer. I am looking for my second transaction. Check out my profile for more info. Don\'t hesitate to message me.', '2021-11-26 18:05:44', ''),
(15, 'ksvlawe2wtr2sxeij7iic', 'Delivery Rider', 'Pulilan Bulacan', 'Deliveries', '18-50 years old', 'Small', 'Fixed Rate', 'Php 1,000', 'Hola! I\'m Tom Esguerra and I am looking for a delivery rider that will get my parcel from Pulilan to Manila. I am looking for my third tranasction. Check out my profile for more info. Don\'t hesitate to message me.', '2021-11-26 19:06:44', ''),
(16, 'ksvlaw8sd2wtr2sxeij7iic', 'Massage Therapist', 'Plaridel Bulacan', 'Massage,Home Service', '18-25 years old', 'Small', 'Fixed Rate', 'Php 1,000', 'Hello! I\'m Johny Bakay and I am looking for a massage therapist near my house at Plaridel, Bulacan. I am recently having back ache and I can\'t take it anymore. I need a therapist ASAP. Don\'t hesitate to message me.', '2021-11-26 20:02:44', ''),
(17, 'ksvl235sd2wtr2sxeij7iic', 'Photographer', 'Pulilan Bulacan', 'Photographer', '20-30 years old', 'Small', 'Fixed Rate', 'Php 5,000', 'Hola! I\'m Arvin Santos and I am looking for a photographer in my debut celebration. I am willing to pay a good rate. Check out my profile for more info and see how my previous customers love my work! Don\'t hesitate to message me.', '2021-11-27 17:02:44', ''),
(18, 'ksvlaw325avctrrxeij7iic', 'Headline 1 ', 'Pulilan Bulacan 1', '1 Service, 1 Service', '18-50 years old', 'Small 1', 'Fixed Rate 1', 'Php 10,000 1', '1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-27 18:02:44', ''),
(19, 'k325asb325avctrrxeij7iic', 'Lets go web dev', 'Pulilan Bulacan ', 'Web Developer, UI Designer', '18-50 years old ', 'Small ', 'Fixed Rate ', 'Php 10,000 ', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-27 19:02:44', 'occupied'),
(20, 'ksv879bhg5sd2wtr2sxeij7iic', 'Headline 3 ', 'Pulilan Bulacan 3', '3 Service, 3 Service', '18-50 years old 3', 'Small 3', 'Fixed Rate 3', 'Php 10,000 3', '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-28 17:09:44', ''),
(21, 'ksvlaw325avctrrxei54saiic', 'Headline 4', 'Pulilan Bulacan 4', '4 Service, 4 Service', '18-50 years old 4', 'Small 4', 'Fixed Rate 4', 'Php 10,000 4', '4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-28 18:08:44', ''),
(22, 'ksv879bhg5sd2wtr2sxeij7i01', 'Headline 5', 'Pulilan Bulacan 5', '50 Service, 5 Service, 5 Service, 5 Service', '18-50 years old 5', 'Small 5', 'Fixed Rate 5', 'Php 10,000 5', '5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-28 19:02:44', ''),
(53, 'k325asb325avctrrxeij7iic', 'Sample headline test', 'Sample Location Test', 'samp,test', '18-20 sample test', 'Large', 'Fixed Rate', 'Sample rate test', 'Sample description test', '2022-01-15 00:42:31', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_messages`
--

CREATE TABLE `tbl_messages` (
  `id` int(11) NOT NULL,
  `incoming_msg_id` varchar(100) NOT NULL,
  `outcoming_msg_id` varchar(100) NOT NULL,
  `msg` text NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `msg_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_messages`
--

INSERT INTO `tbl_messages` (`id`, `incoming_msg_id`, `outcoming_msg_id`, `msg`, `created_at`, `msg_status`) VALUES
(128, 'bysus0eq8j8x2q808a646', 'kytqwnw8je5xj3dtg6a', 'hello kabahuan', '2022-01-15 00:46:24', 0),
(129, 'kytqwnw8je5xj3dtg6a', 'bysus0eq8j8x2q808a646', 'hi neggy', '2022-01-15 00:47:32', 0),
(135, 'qysus0eq8j8x2q808a646', 'kytqwnw8je5xj3dtg6a', 'papi chulooo !!!', '2022-01-25 10:57:55', 0),
(136, 'kytqwnw8je5xj3dtg6a', 'qysus0eq8j8x2q808a646', 'hoy tanga', '2022-01-25 15:59:31', 0),
(137, 'qysus0eq8j8x2q808a646', 'bysus0eq8j8x2q808a646', 'PAPS', '2022-01-25 15:59:37', 0),
(138, 'qysus0eq8j8x2q808a646', 'kytqwnw8je5xj3dtg6a', 'gago', '2022-01-25 21:46:22', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

CREATE TABLE `tbl_notification` (
  `notif_id` int(11) NOT NULL,
  `notif_text` text NOT NULL,
  `notif_id_from` varchar(100) NOT NULL,
  `notif_id_to` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `notif_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_notification`
--

INSERT INTO `tbl_notification` (`notif_id`, `notif_text`, `notif_id_from`, `notif_id_to`, `created_at`, `notif_status`) VALUES
(207, 'wants to cancel the appointment ', 'kytqwnw8je5xj3dtg6a', 'qysus0eq8j8x2q808a646', '2022-01-25 21:42:51', 0),
(208, 'wants to mark this appointment done ', 'kytqwnw8je5xj3dtg6a', 'qysus0eq8j8x2q808a646', '2022-01-25 21:43:19', 0),
(209, 'Appointment has been finished.', 'kytqwnw8je5xj3dtg6a', 'qysus0eq8j8x2q808a646', '2022-01-25 21:45:06', 0),
(210, 'Appointment has been finished.', 'qysus0eq8j8x2q808a646', 'kytqwnw8je5xj3dtg6a', '2022-01-25 21:45:06', 0),
(211, 'wants to cancel the appointment ', 'qysus0eq8j8x2q808a646', 'kytqwnw8je5xj3dtg6a', '2022-01-25 21:47:28', 0),
(212, 'wants to mark this appointment done ', 'qysus0eq8j8x2q808a646', 'kytqwnw8je5xj3dtg6a', '2022-01-25 21:47:37', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_proposals`
--

CREATE TABLE `tbl_proposals` (
  `id` int(11) NOT NULL,
  `job_post_id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_saved_freelancers`
--

CREATE TABLE `tbl_saved_freelancers` (
  `id` int(11) NOT NULL,
  `client_id` varchar(200) NOT NULL,
  `freelancer_id` varchar(200) NOT NULL,
  `created_at` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_saved_freelancers`
--

INSERT INTO `tbl_saved_freelancers` (`id`, `client_id`, `freelancer_id`, `created_at`) VALUES
(90, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3xvi8e', '2022-01-15 00:41:13'),
(91, 'k325asb325avctrrxeij7iic', 'kwk2xwu53xvfu3xvi8e', '2022-01-15 00:41:16');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_saved_jobs`
--

CREATE TABLE `tbl_saved_jobs` (
  `id` int(11) NOT NULL,
  `job_post_id` int(11) NOT NULL,
  `freelancer_id` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_saved_jobs`
--

INSERT INTO `tbl_saved_jobs` (`id`, `job_post_id`, `freelancer_id`, `created_at`) VALUES
(44, 22, 'kwkrfdwu53xvfu3vi8e', '2022-01-15 00:30:01'),
(45, 18, 'kwkrfdwu53xvfu3vi8e', '2022-01-15 00:30:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` varchar(50) NOT NULL,
  `role` varchar(30) NOT NULL,
  `name` varchar(70) NOT NULL,
  `fname` varchar(70) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `address` varchar(70) NOT NULL,
  `address_lat` varchar(40) NOT NULL,
  `address_longt` varchar(40) NOT NULL,
  `birthday` varchar(70) NOT NULL,
  `age` int(11) NOT NULL,
  `vkey` varchar(70) NOT NULL,
  `verified` varchar(10) NOT NULL,
  `admin_verified` varchar(10) NOT NULL,
  `front_id` text NOT NULL,
  `back_id` text NOT NULL,
  `whole_id` text NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(70) NOT NULL,
  `rating` varchar(50) NOT NULL,
  `portfolio` text NOT NULL,
  `self_intro` text NOT NULL,
  `pay_rate` varchar(100) NOT NULL,
  `services_offer` text NOT NULL,
  `profile_photo` text NOT NULL,
  `status` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `role`, `name`, `fname`, `gender`, `address`, `address_lat`, `address_longt`, `birthday`, `age`, `vkey`, `verified`, `admin_verified`, `front_id`, `back_id`, `whole_id`, `email`, `password`, `rating`, `portfolio`, `self_intro`, `pay_rate`, `services_offer`, `profile_photo`, `status`, `created_at`) VALUES
('aikytqwnw8je5xj3dtg6a', 'client', 'Airo Ramirez', 'Airo', 'Male', 'Liciada Bustos Bulacan', '14.9989115', '120.8770185', '1/2/2001', 22, 'bc86f82b471db8be2798219ec6484b6', '1', '1', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a72510897.75903940.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a72510920.82493580.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a7257bdd4.61983001.jpg', 'airojbbbregore099@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '2.3125', '', '', '', '', 'http://192.168.42.241/wefixit/backend/uploads/user_profile_picture/airo.jpg\r\n', '0', '2022-01-25 14:36:46'),
('bysus0eq8j8x2q808a646', 'freelancer', 'Vincent De Guzman', 'Vincent', 'Male', 'Baliuag Bulacan', '14.980197', '120.893594', '1/2/2001', 21, 'e7e8b11b05035f62e2x24c1fd0ae7c', '1', '1', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61eec7a54d1837.77752867.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61eec7a54d4623.48197132.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61eec7a57e6342.96115831.jpg', 'kosanglando123@gmail.com', '0271bc781a4db4328a5f0af1ca7d2669', '3', 'http://192.168.42.241/wefixit/backend/uploads/portfolios/61eec469930c67.92035409 - Copy1.pdf', 'Hi Im vincent dg', 'Php200 /hr', 'riderse, technician', 'https://firebasestorage.googleapis.com/v0/b/midterm-redux.appspot.com/o/images-profile%2F247573711_4394103717375732_4303549708724153897_n.jpg?alt=media&token=e5a7cc86-c069-4298-accd-f570f0d1bd4a', '1', '2022-01-24 23:39:09'),
('ey12nw8je5xj3dtg6a', 'client', 'Em Orbiso', 'Em', 'Female', 'Drt Bulacan', '14.9989115', '120.8770185', '1/2/2001', 21, 'bc86f89c223b1db8be2798219ec6484b6', '1', '1', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a72510897.75903940.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a72510920.82493580.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a7257bdd4.61983001.jpg', 'emjbbbregore099@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '3.3125', '', '', '', '', 'https://firebasestorage.googleapis.com/v0/b/midterm-redux.appspot.com/o/images-profile%2F255640954_911430749748453_2058101333883857589_n.jpg?alt=media&token=242b3c76-a45e-42fd-85fd-4de8c7f6fddd', '0', '2022-01-25 14:36:39'),
('kytqwnw8je5xj3dtg6a', 'client', 'Jb T. Regore', 'Jb', 'Male', 'San Fernando Pampanga', '14.9989115', '120.8770185', '1/2/2001', 21, 'bc86f89c2471db8be2798219ec6484b6', '1', '1', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a72510897.75903940.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a72510920.82493580.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a7257bdd4.61983001.jpg', 'jbbbregore099@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '4.3125', '', '', '', '', 'http://192.168.42.241/wefixit/backend/uploads/user_profile_picture/jbe.jpg\r\n', '1', '2022-01-25 14:36:34'),
('liry12nw8je5xj3dtg6a', 'client', 'Lirra Santos', 'Lirra', 'Female', 'Malamig Bustos Bulacan', '14.9989115', '120.8770185', '1/2/2001', 21, '2x86f89c223b1db8be2798219ec6484b6', '1', '1', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a72510897.75903940.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a72510920.82493580.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61ef9a7257bdd4.61983001.jpg', 'lirrajbbbregore099@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '2.8', '', '', '', '', 'https://firebasestorage.googleapis.com/v0/b/midterm-redux.appspot.com/o/images-profile%2F41398374_1211072682366497_7844830235127185408_n.jpg?alt=media&token=9002f8fa-d09b-461b-a961-e633f68fe5b6', '0', '2022-01-25 14:36:43'),
('qysus0eq8j8x2q808a646', 'freelancer', 'Jv Villafuerte', 'Jv', 'Male', 'Baliuag Bulacan', '14.979759', '120.876578', '1/2/2001', 21, 'e7e8b11b05035f62e2x24c1fd0ae7c', '1', '1', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61eec7a54d1837.77752867.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61eec7a54d4623.48197132.jpg', 'http://192.168.42.241/wefixit/backend/uploads/user_ids/61eec7a57e6342.96115831.jpg', 'regore.jb0210@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '3.6875', 'http://192.168.42.241/wefixit/backend/uploads/portfolios/61eec469930c67.92035409 - Copy2.pdf', 'hi im papi chulo', 'Php300 /hr', 'plumbing, math tutor', 'https://firebasestorage.googleapis.com/v0/b/wefixit-f6dda.appspot.com/o/images-id%2F223123359_1717276171799869_2547011835838514186_n.jpg?alt=media&token=7251ce97-c43d-4ac6-b105-c036bf7ef546', '0', '2022-01-24 23:38:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_appointments`
--
ALTER TABLE `tbl_appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_fbphoto`
--
ALTER TABLE `tbl_fbphoto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_feedbacks`
--
ALTER TABLE `tbl_feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_jobs`
--
ALTER TABLE `tbl_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_messages`
--
ALTER TABLE `tbl_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`notif_id`);

--
-- Indexes for table `tbl_proposals`
--
ALTER TABLE `tbl_proposals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_saved_freelancers`
--
ALTER TABLE `tbl_saved_freelancers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_saved_jobs`
--
ALTER TABLE `tbl_saved_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_appointments`
--
ALTER TABLE `tbl_appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `tbl_fbphoto`
--
ALTER TABLE `tbl_fbphoto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `tbl_feedbacks`
--
ALTER TABLE `tbl_feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `tbl_jobs`
--
ALTER TABLE `tbl_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `tbl_messages`
--
ALTER TABLE `tbl_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `notif_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT for table `tbl_proposals`
--
ALTER TABLE `tbl_proposals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `tbl_saved_freelancers`
--
ALTER TABLE `tbl_saved_freelancers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `tbl_saved_jobs`
--
ALTER TABLE `tbl_saved_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
