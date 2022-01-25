<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "PUT"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/notification.php";

// instantiate database
$database = new Database();
$db = $database->getConnection();

$notification = new Notification($db);

session_start();
$notification->user_id = $_SESSION['user_id'];

if($notification->updateNotifCount()) {
	http_response_code(201);
	echo json_encode(
		array("message" => "Notif Updated")
	);
} else {
	echo json_encode(
		array("message" => "Notif Not Updated")
	);
}
