<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/jobs.php";

$database = new Database();
$db = $database->getConnection();

$jobs = new Jobs($db);

$data = json_decode(file_get_contents("php://input"));
$jobs->id = $data->id;

$result_my_jobs_proposals = $jobs->my_proposal_total();

//total array
$dash_arr = array();

// job count
while($row = $result_my_jobs_proposals->fetch_assoc()){
	$dash_arr['total_proposal_count'] = $row;
}

// set http status code to - 200 ok
http_response_code(200);
echo json_encode($dash_arr);
