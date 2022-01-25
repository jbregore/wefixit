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
$appointments->client_id = $_SESSION['user_id'];
$appointments->freelancer_id = $data->freelancer_id;

$appointments->proj_cost = $data->proj_cost;
$appointments->proj_addr = $data->proj_addr;

$appointments->start_date = $data->start_date;
$appointments->end_date = $data->end_date;
$appointments->service = $data->service;

$isCreated = $appointments->addAppointment();

if($isCreated) {
    //201 status okay
    http_response_code(201);
    echo json_encode(array("message" => "1 record added"));
    return;
}

http_response_code(500);
