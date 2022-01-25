<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER["REQUEST_METHOD"] !== "POST"){
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

$jobs->id = $data->id;

$result = $jobs->fetch_allProposals();

$job_arr = array();

while($row = $result->fetch_assoc()) {
    array_push($job_arr, $row);
}

http_response_code(200);
echo json_encode($job_arr);

