<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "GET"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/appointments.php";

// instantiate database
$database = new Database();
$db = $database->getConnection();

$appointments = new Appointments($db);

session_start();
$appointments->id = $_GET['id'] ? $_GET['id'] : die();
$result = $appointments->client_fetch_feedbacks();
$appointments_arr = array();

while($row = $result->fetch_assoc()){
	array_push($appointments_arr, $row);
}

// set http status code to - 200 ok
http_response_code(200);
echo json_encode($appointments_arr);

