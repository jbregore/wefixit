<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(404);
    echo "Not found!";

    return;
}

include "../../config/database.php";
include "../../models/messages.php";


$database = new Database();
$db = $database->getConnection();

$messages = new Messages($db);

$data = json_decode(file_get_contents("php://input"));

session_start();
$messages->user_id = $_SESSION['user_id'];
$messages->incoming_msg_id = $data->incoming_msg_id;
$messages->msg = $data->msg;

$isCreated = $messages->addMessage();

if($isCreated) {
    //201 status okay
    http_response_code(201);
    echo json_encode(array("message" => "1 message sent"));
    return;
}

http_response_code(500);
