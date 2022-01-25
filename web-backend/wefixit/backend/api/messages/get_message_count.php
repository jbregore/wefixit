<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "GET"){
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
$result = $messages->get_message_count();
$messages_arr = array();

while($row = $result->fetch_assoc()){
	$dash_arr['total_message_count'] = $row;
}

http_response_code(200);
echo json_encode($dash_arr);
