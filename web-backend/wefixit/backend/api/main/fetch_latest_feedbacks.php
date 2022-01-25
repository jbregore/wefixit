<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "GET"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/main.php";

// instantiate database
$database = new Database();
$db = $database->getConnection();

$main = new Main($db);

$result = $main->fetch_latest_feedbacks();

// set http status code to - 200 ok
http_response_code(200);
echo json_encode($result);

