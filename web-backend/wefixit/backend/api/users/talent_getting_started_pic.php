<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "PUT"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/users.php";

$database = new Database();
$db = $database->getConnection();

$user = new Users($db);

$data = json_decode(file_get_contents("php://input"));

$user->profile_photo = $data->profile_picture;
$user->rate = $data->pay_rate;
$user->service_offer = $data->services_offer;
$user->self_intro = $data->self_intro;
$user->portfolio = $data->portfolio;

if($user->updateGettingStartedPic()) {
	http_response_code(201);
	echo json_encode(
		array("message" => "Profile Updated")
	);
} else {
	echo json_encode(
		array("message" => "Profile Not Updated")
	);
}