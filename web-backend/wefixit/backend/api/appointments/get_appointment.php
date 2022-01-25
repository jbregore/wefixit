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

// $data = json_decode(file_get_contents("php://input"));
$data = json_decode(file_get_contents("php://input"));

$appointments->client_id =  $data->client_id;
$appointments->freelancer_id =  $data->freelancer_id;

// get product
$appointments->get_appointment();

// create array
$appointment_arr = array(
	'id' => $appointments->id,
	'client_id' => $appointments->client_id,
	'freelancer_id' => $appointments->freelancer_id,
	'proj_cost' => $appointments->proj_cost,
	'proj_addr' => $appointments->proj_addr,
	'start_date' => $appointments->start_date,
	'end_date' => $appointments->end_date,
	'service' => $appointments->service,
	'created_at' => $appointments->created_at,
);

// make json
echo json_encode($appointment_arr);