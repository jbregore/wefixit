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
$jobs->id = $data->job_post_id;

$isCreated = $jobs->addProposal();

if($isCreated) {
    //201 status okay
    http_response_code(201);
    echo json_encode(array("message" => "1 record added"));
    return;
}else{
    echo json_encode(array("message" => "already"));
}

// http_response_code(500);
