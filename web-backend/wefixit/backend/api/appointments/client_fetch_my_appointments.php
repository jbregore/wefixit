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

// instantiate database
$database = new Database();
$db = $database->getConnection();

$appointments = new Appointments($db);
$data = json_decode(file_get_contents("php://input"));
session_start();
$appointments->client_id = $_SESSION['user_id'];
$appointments->page = $data->pagee;
if(is_null($data->start)){

}else{
	$appointments->start = $data->start;
	$appointments->limit = $data->limit;
}
$result = $appointments->client_fetch_my_appointments();
$appointments_arr = array();

if($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		array_push($appointments_arr, $row);
	}
	// set http status code to - 200 ok
	http_response_code(200);
	// echo sizeof($appointments_arr);
	echo json_encode($appointments_arr);
}else{
	// echo "reachedMax";
	echo json_encode($appointments_arr);
	// exit("reachedMax");
}



