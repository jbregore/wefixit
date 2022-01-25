<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/users.php";

// instantiate database
$database = new Database();
$db = $database->getConnection();

//instantiate user
$user = new Users($db);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->login_email;
$user->password = $data->login_password;

//call login
$isLog = $user->login();

if($isLog == "verified"){
	//201 - created
	http_response_code(201);

	// user array
	$user_arr = array(
		'role' => $user->role,
		'session_id' => $_SESSION['user_id']
	);

	// make json
	echo json_encode($user_arr);
}else if($isLog == "not verified"){
	http_response_code(202);

	// user array
	$user_arr = array(
		'role' => $user->role,
		'session_id' => $_SESSION['user_id']
	);

	// make json
	echo json_encode($user_arr);
}
else{
	//500 - internal server error/ may problema sa db connection
	echo json_encode(array("message" => "no account found"));
	http_response_code(404);
}

