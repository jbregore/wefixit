<?php

// get vkey
if (isset($_GET['vkey'])) {
    $vkey = $_GET['vkey'];

    $mysqli = NEW mysqli('localhost', 'root', '', 'dbehiremo');

    $resultSet = $mysqli->query("SELECT verified, vkey FROM tbl_users WHERE verified = '0' AND vkey = '$vkey'
    LIMIT 1");
    
    if($resultSet->num_rows == 1){
        // echo "email is validated";
        $update = $mysqli->query("UPDATE tbl_users SET verified='1', status='1' WHERE vkey='$vkey' LIMIT 1");
        // if($update){
        // }
    }
    else{
    }

    $resultSett = $mysqli->query("SELECT vkey FROM tbl_users WHERE vkey = '$vkey'
    LIMIT 1");

    if($resultSett->num_rows == 1){

    }else{
        die("Something went wrong");
    }
    
} else {
    die("Something went wrong");
}
