<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(404);
    echo "Not found!";

    return;
}

include "../../config/database.php";
include "../../models/users.php";


$database = new Database();
$db = $database->getConnection();

$user = new Users($db);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->user_email;

$isCreated = $user->adminSendForgot();

if ($isCreated) {
    //201 status okay
    http_response_code(201);
    echo json_encode(array("message" => "email sent"));
    return;
}

http_response_code(500);
