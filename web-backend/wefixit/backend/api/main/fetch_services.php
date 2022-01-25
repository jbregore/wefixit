<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/main.php";

$database = new Database();
$db = $database->getConnection();

$main = new Main($db);

$data = json_decode(file_get_contents("php://input"));
$main->page = $data->pagee;

$result = $main->fetch_services();

$job_arr = array();

while($row = $result->fetch_assoc()) {
    array_push($job_arr, $row);
}

http_response_code(200);
echo json_encode($job_arr);
