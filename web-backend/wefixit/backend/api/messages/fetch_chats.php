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

$data = json_decode(file_get_contents("php://input"));

session_start();
$messages->user_id = $_SESSION['user_id'];
// $messages->incoming_msg_id = $data->incoming_msg_id;

$result = $messages->fetch_chats();
$messages_arr = array();

while($row = $result->fetch_assoc()){
	array_push($messages_arr, $row);
}

// set http status code to - 200 ok
http_response_code(200);
echo json_encode($messages_arr);
