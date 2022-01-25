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

session_start();
$jobs->user_id = $_SESSION['user_id'];
$jobs->page = $data->pagee;

$result = $jobs->fetch_applied_jobs();
http_response_code(200);
echo json_encode($result);
// $result = $jobs->fetch_applied_jobs();

// $user_arr = array();

// while($row = $result->fetch_assoc()) {
//     array_push($user_arr, $row);
// }

// http_response_code(200);
// echo json_encode($user_arr);

