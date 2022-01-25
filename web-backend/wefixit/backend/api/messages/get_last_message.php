<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/messages.php";

$database = new Database();
$db = $database->getConnection();

$messages = new Messages($db);

$data = json_decode(file_get_contents("php://input"));
$messages->id = $data->id;


$messages->get_last_message();

// create array
$messages_arr = array(
	'id' => $messages->id,
	'incoming_msg_id' => $messages->incoming_msg_id,
	'outcoming_msg_id' => $messages->outcoming_msg_id,
	'msg' => $messages->msg,
	'created_at' => $messages->created_at,
);

// set http status code to - 200 ok
http_response_code(200);
// make json
echo json_encode($messages_arr);



