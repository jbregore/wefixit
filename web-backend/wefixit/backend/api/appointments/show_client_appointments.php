<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/appointments.php";

$database = new Database();
$db = $database->getConnection();

$appointments = new appointments($db);

$data = json_decode(file_get_contents("php://input"));


session_start();
$appointments->user_id = $data->id;

//fetch my job form db
$result_my_appointments = $appointments->client_prev_appointments();

//total array
$dash_arr = array();

// job count
while($row = $result_my_appointments->fetch_assoc()){
	$dash_arr['total_appoint'] = $row;
}

// set http status code to - 200 ok
http_response_code(200);
echo json_encode($dash_arr);
