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

$appointments = new Appointments($db);

$data = json_decode(file_get_contents("php://input"));

$appointments->id = $data->id;

$result = $appointments->fetch_photos();

$appointments_arr = array();

while($row = $result->fetch_assoc()) {
    array_push($appointments_arr, $row);
}

http_response_code(200);
echo json_encode($appointments_arr);
