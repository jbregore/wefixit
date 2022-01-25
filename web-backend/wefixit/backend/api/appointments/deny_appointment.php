<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "DELETE"){
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

http_response_code(201);
echo json_encode(
	array(
		"message" => $appointments->deny_appointment()
	)
);