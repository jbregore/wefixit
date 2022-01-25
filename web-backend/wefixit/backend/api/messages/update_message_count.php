<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "PUT"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/messages.php";

// instantiate database
$database = new Database();
$db = $database->getConnection();

$messages = new Messages($db);

session_start();
$messages->user_id = $_SESSION['user_id'];

if($messages->updateMessageCount()) {
	http_response_code(201);
	echo json_encode(
		array("message" => "Message Notif Updated")
	);
} else {
	echo json_encode(
		array("message" => "Message Notif Not Updated")
	);
}
