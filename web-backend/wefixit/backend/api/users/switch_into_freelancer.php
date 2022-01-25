<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
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

session_start();
$user->user_id = $_SESSION['user_id'];

$isSwitch= $user->switchIntoFreelancer();

if($isSwitch) {
    //201 status okay
    $_SESSION['role'] = "freelancer";
    http_response_code(200);
    echo json_encode(array("message" => "switch success"));
    return;
}

http_response_code(500);
