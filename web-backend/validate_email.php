<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
	http_response_code(404);
	echo "Not Found";
	return;
}

$datas = json_decode(file_get_contents("php://input"));

$email = $datas->user_email;
// $email = $_POST['email'];

if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
    //400 - bad request
    http_response_code(400);
    // $user_arr = array(
    //     'message' => 'Email address is invalid format',
    // );
    // echo json_encode($user_arr);
    exit("Email address is invalid format");
}

$api_key = "27df982ccbff438ab4d9919b3894a136";

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => "https://emailvalidation.abstractapi.com/v1?api_key=$api_key&email=$email",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true
]);

$response = curl_exec($ch);

curl_close($ch);

$data = json_decode($response, true);

if ($data['deliverability'] === "UNDELIVERABLE"){
    http_response_code(400);
    exit("Email Undeliverable");
}

if($data["is_disposable_email"]["value"] === true){
    http_response_code(400);
    exit("Email is Disposable");
}

//200 - okay
http_response_code(200);
$user_arr = array(
    'message' => 'Email address is valid',
);
echo json_encode($user_arr);
// echo "Email address is valid";