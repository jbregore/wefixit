<?php

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json');

$data = array('status' => false);
$response = array();

$upload_dir = 'http://192.168.42.241/wefixit/backend/uploads/user_ids/';

$upload_url = 'http://192.168.42.241/wefixit/backend/uploads/user_ids/';

if (isset($_POST['submit'])) {
    $target_file = basename($_FILES['file']['name']);
    $file_type = pathinfo($target_file, PATHINFO_EXTENSION);
    $is_image = getimagesize($_FILES['file']['tmp_name']);
    if ($is_image) {
        $fileNameNew = uniqid('', true) . "." . $file_type;
        $fileDest = $upload_dir . $fileNameNew;
        $fileTmpName = $_FILES['file']['tmp_name'];
        move_uploaded_file($fileTmpName,
        $_SERVER["DOCUMENT_ROOT"]. "/wefixit/backend/uploads/user_ids/". $fileNameNew);

        $response['urlpic'] = $upload_url .  $fileNameNew;
        $response['message'] = "Successfully uploaded";

    } else {
        $response['message'] = "File is not an image";
    }
}


echo json_encode($response);
