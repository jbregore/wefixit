<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "GET"){
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
$result = $notification->get_notif_count();
$notification_arr = array();

while($row = $result->fetch_assoc()){
	$dash_arr['total_notif_count'] = $row;
}

http_response_code(200);
echo json_encode($dash_arr);
