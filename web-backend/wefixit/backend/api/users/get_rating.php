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

$database = new Database();
$db = $database->getConnection();

$users = new Users($db);

$data = json_decode(file_get_contents("php://input"));
$users->user_id = $data->id;

$result = $users->get_user_rating();

$rating_arr = array(
    'average_rating' => $result 
);

// while($row = $result->fetch_assoc()) {
//     array_push($job_arr, $row);
// }

http_response_code(200);
echo json_encode($rating_arr);
