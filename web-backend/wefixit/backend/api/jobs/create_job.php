<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(404);
    echo "Not found!";

    return;
}

include "../../config/database.php";
include "../../models/jobs.php";


$database = new Database();
$db = $database->getConnection();

$jobs = new Jobs($db);

$data = json_decode(file_get_contents("php://input"));

session_start();
$jobs->user_id = $_SESSION['user_id'];
$jobs->job_headline = $data->job_headline;
$jobs->job_location = $data->job_location;
$jobs->job_services = $data->job_services;
$jobs->job_age = $data->job_age;
$jobs->job_scope = $data->job_scope;
$jobs->job_rate_desc = $data->job_rate_desc;
$jobs->job_rate = $data->job_rate;
$jobs->job_desc = $data->job_desc;

$isCreated = $jobs->addJob();

if($isCreated) {
    //201 status okay
    http_response_code(201);
    echo json_encode(array("message" => "1 record added"));
    return;
}

http_response_code(500);
