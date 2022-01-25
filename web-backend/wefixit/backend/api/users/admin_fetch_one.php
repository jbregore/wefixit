<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "GET"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/users.php";

// instantiate database
$database = new Database();
$db = $database->getConnection();

// instantiate user
$user = new Users($db);

// get user_id
$user->user_id = $_GET['user_id'] ? $_GET['user_id'] : die();

// get user
$user->fetch_single();

// create array
$user_arr = array(
	'user_id' => $user->user_id,
	'role' => $user->role,
	'name' => $user->name,
	'fname' => $user->fname,
	'gender' => $user->gender,
	'address' => $user->address,
	'birthday' => $user->birthday,
	'age' => $user->age,
	'vkey' => $user->vkey,
	'verified' => $user->verified,
	'front_id' => $user->front_id,
	'back_id' => $user->back_id,
	'whole_id' => $user->whole_id,
	'email' => $user->email,
	'password' => $user->password,
	'rating' => $user->rating,
    'portfolio' => $user->portfolio,
	'self_intro' => $user->self_intro,
	'rate' => $user->rate,
	'service_offer' => $user->service_offer,
	'created_at' => $user->created_at,
);

// set http status code to - 200 ok
http_response_code(200);
// make json
echo json_encode($user_arr);