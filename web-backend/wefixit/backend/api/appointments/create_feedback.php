<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(404);
    echo "Not found!";

    return;
}

include "../../config/database.php";
include "../../models/appointments.php";


$database = new Database();
$db = $database->getConnection();

$appointments = new Appointments($db);

$data = json_decode(file_get_contents("php://input"));

session_start();
$appointments->fb_from = $_SESSION['user_id'];
$appointments->id = $data->id;
$appointments->fb_to = $data->fb_to;
$appointments->fb_comment = $data->fb_comment;
$appointments->fb_star = $data->fb_star;

$isCreated = $appointments->addFeedback();

if($isCreated) {
    //201 status okay
    http_response_code(201);
    echo json_encode(array("message" => "1 record added"));
    return;
}

http_response_code(500);
