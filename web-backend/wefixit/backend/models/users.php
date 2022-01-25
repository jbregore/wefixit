<?php


class Users
{
    private $conn;

    public $table_name = "tbl_users";


    public $user_id;
    public $role;
    public $name;
    public $fname;
    public $gender;
    public $address;
    public $address_lat;
    public $address_longt;
    public $birthday;
    public $age;
    public $vkey;
    public $verified;
    public $front_id;
    public $back_id;
    public $whole_id;
    public $email;
    public $password;
    public $rating;
    public $portfolio;
    public $self_intro;
    public $rate;
    public $service_offer;
    public $profile_photo;
    public $created_at;

    //search
    public $search;
    public $filter_search;
    public $page;

    public $freelancer_id;
    public $old_password;
    public $new_password;
    public $start;
    public $limit;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function validate_duplicate_email()
    {
        $validate = "SELECT email FROM $this->table_name WHERE email = '$this->email'";
        $vallidate = mysqli_query($this->conn, $validate);

        if (mysqli_num_rows($vallidate) > 0) {
            http_response_code(400);
            // echo "Creation failed, email is already exist!";
            return true;
        } else {
            // echo $this->whole_id;
            return false;
        }
    }

    //add user
    public function addUser()
    {
        $validate = "SELECT email FROM $this->table_name WHERE email = '$this->email'";
        $vallidate = mysqli_query($this->conn, $validate);

        if (mysqli_num_rows($vallidate) > 0) {
            http_response_code(400);
            echo "Creation failed, email is already exist!";
            return;
        } else {
            echo $this->whole_id;
        }

        $query = "INSERT INTO $this->table_name (user_id, role, name, fname, gender, address,
        address_lat, address_longt,
         birthday, age, vkey, verified, front_id, back_id, whole_id, email, password, rating, portfolio, self_intro,
         pay_rate, services_offer, profile_photo, status, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, NOW() )";

        $vkey = md5(time() . $this->name);
        $verified = "0";
        $rating = "0";
        $portfolio = "";
        $self_intro = "";
        $rate = "";
        $service_offer = "";
        $new_password = md5($this->password);
        $profile_photo = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";
        $status = "0";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "sssssssssissssssssssssss",
            $this->user_id,
            $this->role,
            $this->name,
            $this->fname,
            $this->gender,
            $this->address,
            $this->address_lat,
            $this->address_longt,
            $this->birthday,
            $this->age,
            $vkey,
            $verified,
            $this->front_id,
            $this->back_id,
            $this->whole_id,
            $this->email,
            $new_password,
            $rating,
            $portfolio,
            $self_intro,
            $rate,
            $service_offer,
            $profile_photo,
            $status
        );

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // fetch all users
    public function fetchAll()
    {
        $record_per_page = 10;
        $start_from = ($this->start - 1) * $record_per_page;

        $admin_verified = "";
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE verified = '0' AND admin_verified = '$admin_verified'
        
        ORDER by created_at DESC LIMIT $start_from, $record_per_page";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function fetchAllUser()
    {
        $record_per_page = 10;
        $start_from = ($this->start - 1) * $record_per_page;

        $admin_verified = "";
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE verified = '1' 
        AND admin_verified = '1' AND role = 'freelancer'
        ORDER by created_at DESC LIMIT $start_from, $record_per_page";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }



    //get self user
    public function fetch_self()
    {
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE vkey = ?";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "s", $this->vkey);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            while ($row = mysqli_fetch_assoc($result)) {

                $this->user_id = $row['user_id'];
                $this->role = $row['role'];
                $this->name = $row['name'];
                $this->fname = $row['fname'];
                $this->gender = $row['gender'];
                $this->address = $row['address'];
                $this->birthday = $row['birthday'];
                $this->age = $row['age'];

                $this->vkey = $row['vkey'];
                $this->verified = $row['verified'];
                $this->front_id = $row['front_id'];
                $this->back_id = $row['back_id'];
                $this->whole_id = $row['whole_id'];
                $this->email = $row['email'];
                $this->password = $row['password'];
                $this->rating = $row['rating'];

                $this->portfolio = $row['portfolio'];
                $this->self_intro = $row['self_intro'];
                $this->rate = $row['pay_rate'];
                $this->service_offer = $row['services_offer'];
                $this->created_at = $row['created_at'];
            }
        }
    }

    // get single user
    public function fetch_single()
    {
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE user_id = ?";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "s", $this->user_id);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            while ($row = mysqli_fetch_assoc($result)) {

                $this->user_id = $row['user_id'];
                $this->role = $row['role'];
                $this->name = $row['name'];
                $this->fname = $row['fname'];
                $this->gender = $row['gender'];
                $this->address = $row['address'];
                $this->birthday = $row['birthday'];
                $this->age = $row['age'];

                $this->vkey = $row['vkey'];
                $this->verified = $row['verified'];
                $this->front_id = $row['front_id'];
                $this->back_id = $row['back_id'];
                $this->whole_id = $row['whole_id'];
                $this->email = $row['email'];
                $this->password = $row['password'];
                $this->rating = $row['rating'];

                $this->portfolio = $row['portfolio'];
                $this->self_intro = $row['self_intro'];
                $this->rate = $row['pay_rate'];
                $this->service_offer = $row['services_offer'];
                $this->profile_photo = $row['profile_photo'];
                $this->status = $row['status'];
                $this->created_at = $row['created_at'];
            }
        }
    }

    //send email approved talent
    public function adminSendForgot()
    {
        $to_vkey = md5(time() . $this->email);

        $query = "UPDATE $this->table_name SET vkey = ? WHERE email = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            session_start();
            mysqli_stmt_bind_param(
                $stmt,
                "ss",
                $to_vkey,
                $this->email,
            );

            if (mysqli_stmt_execute($stmt)) {
            }
        }

        $to = $this->email;
        $subject = "Reset Password";
        $message = "<p>Click this link to proceed. 
        <a href='http://192.168.42.241/ehiremo/frontend/forgot-password.php?pkey=$to_vkey'> Reset your password. </a>
        </p>";

        $headers = "From: abcd@gmail.com";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $mail_sent = mail($to, $subject, $message, $headers);
        if ($mail_sent == true) {
            //mail sent
            return true;
        } else {
            // echo "Mail failed";
            return false;
        }
    }

    //send email approved talent
    public function adminSendEmail()
    {
        $to_vkey = $this->vkey;
        $to = $this->email;
        $subject = "Verification Complete";
        $message = "
        <p>You are now verified at, and you can now access the app.</p>
        ";

        $headers = "From: abcd@gmail.com";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $mail_sent = mail($to, $subject, $message, $headers);
        if ($mail_sent == true) {

            $query = "UPDATE $this->table_name SET admin_verified = ? WHERE email = ? AND vkey = ?";

            $stmt = mysqli_stmt_init($this->conn);

            $admin_status = "1";
            if (!mysqli_stmt_prepare($stmt, $query)) {
                echo "SQL statement failed";
            } else {
                session_start();
                mysqli_stmt_bind_param(
                    $stmt,
                    "sss",
                    $admin_status,
                    $this->email,
                    $this->vkey,
                );

                if (mysqli_stmt_execute($stmt)) {
                    echo "Mail sent";
                    return true;
                }
            }
        } else {
            echo "Mail failed";
            return false;
        }
    }

    //send email approved client
    public function adminSendEmailClient()
    {
        $to_vkey = $this->vkey;
        $to = $this->email;
        $subject = "Verification Complete";
        $message = "
        <p>You are now verified, and you can now access the app.</p>
        ";

        $headers = "From: abcd@gmail.com";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $mail_sent = mail($to, $subject, $message, $headers);
        if ($mail_sent == true) {
            $query = "UPDATE $this->table_name SET admin_verified = ? WHERE email = ? AND vkey = ?";

            $stmt = mysqli_stmt_init($this->conn);

            $admin_status = "1";
            if (!mysqli_stmt_prepare($stmt, $query)) {
                echo "SQL statement failed";
            } else {
                session_start();
                mysqli_stmt_bind_param(
                    $stmt,
                    "sss",
                    $admin_status,
                    $this->email,
                    $this->vkey,
                );

                if (mysqli_stmt_execute($stmt)) {
                    echo "Mail sent";
                    return true;
                }
            }
        } else {
            echo "Mail failed";
            return false;
        }
    }

    //send email deny talent
    public function adminDenyEmail()
    {
        $to_vkey = $this->vkey;
        $to = $this->email;

        $subject = "Invalid Credentials";
        $message = "<p>As much as we would like to verify your account, it seems that we encounter some issues upon verification process.</p>
        <p>If you think you input wrong credentials, You can sign up again  
        and submit your details together with a valid ID for verification. Make sure that the photo of the ID is
         readable and clear and should match the details on your account. </p>
         ";

        $headers = "From: abcd@gmail.com";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $mail_sent = mail($to, $subject, $message, $headers);
        if ($mail_sent == true) {
            // echo "Mail sent";
            $query = "DELETE FROM $this->table_name WHERE email = ? AND vkey = ?";

            // prepare and bind
            $stmt = mysqli_stmt_init($this->conn);

            if (!mysqli_stmt_prepare($stmt, $query)) {
                echo "SQL statement failed";
            } else {
                mysqli_stmt_bind_param($stmt, "ss", $this->email, $this->vkey);

                if (mysqli_stmt_execute($stmt)) {
                    return true;
                }
                return false;
            }
            return true;
        } else {
            // echo "Mail failed";
            return false;
        }
    }

    //send email deny client
    public function adminDenyEmailClient()
    {
        $to_vkey = $this->vkey;
        $to = $this->email;
        $subject = "Invalid Credentials";
        $message = "<p>As much as we would like to verify your account, it seems that we encounter some issues upon verification process.</p>
        <p>You may sign up again at <a href='http://192.168.42.241/ehiremo/frontend/sign-up-details.php'> eHiremo </a> and submit a valid ID for verification. Make sure that the photo of the ID is
         readable and clear and should match the details on your account. </p>
         <p>This is an auto generated email.DO NOT REPLY.</p>
        <p>-eHiremo</p>";

        $headers = "From: abcd@gmail.com";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $mail_sent = mail($to, $subject, $message, $headers);
        if ($mail_sent == true) {
            // echo "Mail sent";
            $query = "DELETE FROM $this->table_name WHERE email = ? AND vkey = ?";

            // prepare and bind
            $stmt = mysqli_stmt_init($this->conn);

            if (!mysqli_stmt_prepare($stmt, $query)) {
                echo "SQL statement failed";
            } else {
                mysqli_stmt_bind_param($stmt, "ss", $this->email, $this->vkey);

                if (mysqli_stmt_execute($stmt)) {
                    return true;
                }
                return false;
            }
            return true;
        } else {
            // echo "Mail failed";
            return false;
        }
    }


    //verify talent
    public function verifyTalent()
    {
        $my_vkey = $this->vkey;
        $query = "SELECT verified, vkey FROM $this->table_name WHERE verified = '0' AND vkey ='$my_vkey'";

        //execute query
        $stmt = $this->conn->query($query);

        if ($stmt->num_rows == 1) {
            echo "email is validated";
        } else {
            echo "email not validated";
        }
        // return $stmt;
    }

    //update talent getting started
    public function updateGettingStarted()
    {
        $query = "UPDATE $this->table_name SET pay_rate = ?, services_offer = ?, self_intro = ?,
        portfolio = ? WHERE user_id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        $array = $this->service_offer; // Your array  
        $cameArray = implode(",", $array);

        echo $cameArray;

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param(
                $stmt,
                "sssss",
                $this->rate,
                $cameArray,
                $this->self_intro,
                $this->portfolio,
                $this->user_id,
            );

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    //update talent getting started pic
    public function updateGettingStartedPic()
    {
        $query = "UPDATE $this->table_name SET profile_photo = ?, pay_rate = ?, services_offer = ?, self_intro = ?,
        portfolio = ? WHERE user_id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        $array = $this->service_offer; // Your array  
        $cameArray = implode(",", $array);

        echo $cameArray;

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            session_start();
            mysqli_stmt_bind_param(
                $stmt,
                "ssssss",
                $this->profile_photo,
                $this->rate,
                $cameArray,
                $this->self_intro,
                $this->portfolio,
                $_SESSION['user_id']
            );

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    //login
    public function login()
    {
        $query = "SELECT * FROM $this->table_name WHERE email = ? 
        AND password = ? ";

        $new_password = md5($this->password);
        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $this->email, $new_password);

            //execute query
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if (mysqli_stmt_execute($stmt)) {

                if (mysqli_num_rows($result) == 1) {

                    while ($row = mysqli_fetch_assoc($result)) {
                        $this->user_id = $row['user_id'];
                        $this->role = $row['role'];
                        $this->verified = $row['verified'];
                    }

                    // AND verified != '0'

                    $row = mysqli_fetch_assoc($result);
                    session_start();
                    $_SESSION['user_id'] = $this->user_id;
                    $_SESSION['role'] = $this->role;


                    $query = "UPDATE $this->table_name SET status = '1' WHERE user_id = ?";

                    $stmt = mysqli_stmt_init($this->conn);

                    if (!mysqli_stmt_prepare($stmt, $query)) {
                        echo "SQL statement failed";
                    } else {
                        mysqli_stmt_bind_param(
                            $stmt,
                            "s",
                            $_SESSION['user_id']
                        );

                        if (mysqli_stmt_execute($stmt)) {
                        }
                    }

                    if ($this->verified == "1") {
                        return "verified";
                        $_SESSION['verified'] = $this->verified;
                    } else {
                        return "not verified";
                    }

                    // $_SESSION['user_username'] = $this->user_username;
                    // return true;
                } else {
                    // echo "failed";
                    return false;
                }
            } //end first stmt
            return false;
        }
    }

    public function logout()
    {
        $query = "UPDATE $this->table_name SET status = '0' WHERE user_id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param(
                $stmt,
                "s",
                $_SESSION['user_id']
            );

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
        }
    }

    public function get_user_rating()
    {
        $query = "SELECT rating FROM $this->table_name WHERE user_id = ?";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "s", $this->user_id);

            //execute query
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if (mysqli_stmt_execute($stmt)) {
                while ($row = mysqli_fetch_array($result)) {
                    return $row["rating"];
                }
                // $ratings = 0;
                // while ($row_ratings = mysqli_fetch_object($result)){
                //     $ratings += $row_ratings->rating;
                // }

                // $average_ratings = 0;
                // if($ratings>0){
                //     $average_ratings = $ratings / mysqli_num_rows($result);
                // }
                // return $average_ratings;

            }
            return false;
        }


        // $query = "SELECT * FROM tbl_user_ratings WHERE user_id = ?";

        // //prepare and bind
        // $stmt = mysqli_stmt_init($this->conn);

        // if(!mysqli_stmt_prepare($stmt, $query)){
        // 	echo "SQL statement failed";
        // }
        // else{
        // 	mysqli_stmt_bind_param($stmt, "s", $this->user_id);

        // 	//execute query
        // 	mysqli_stmt_execute($stmt);
        // 	$result = mysqli_stmt_get_result($stmt);

        // 	if(mysqli_stmt_execute($stmt)){

        //         $ratings = 0;
        //         while ($row_ratings = mysqli_fetch_object($result)){
        //             $ratings += $row_ratings->rating;
        //         }

        //         $average_ratings = 0;
        //         if($ratings>0){
        //             $average_ratings = $ratings / mysqli_num_rows($result);
        //         }
        //         return $average_ratings;

        // 	}
        // 	return false;
        // } 
    }

    //browse freelancers
    public function show_freelancers()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        if ($this->role == "freelancer") {
            $query = "SELECT * FROM $this->table_name WHERE role='freelancer'
            AND user_id != '$this->user_id' AND verified != '0'
            ORDER by created_at DESC LIMIT $start_from, $record_per_page";
            $stmt = $this->conn->query($query);

            return $stmt;
        } else {
            $query = "SELECT * FROM $this->table_name WHERE role='freelancer' AND verified != '0'
            ORDER by created_at DESC LIMIT $start_from, $record_per_page";
            $stmt = $this->conn->query($query);

            return $stmt;
        }
    }

    public function show_clients()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        if ($this->role == "freelancer") {
            $query = "SELECT * FROM $this->table_name WHERE role='client'
            AND user_id != '$this->user_id' AND verified != '0'
            ORDER by created_at DESC LIMIT $start_from, $record_per_page";
            $stmt = $this->conn->query($query);

            return $stmt;
        } else {
            $query = "SELECT * FROM $this->table_name WHERE role='freelancer' AND verified != '0'
            ORDER by created_at DESC LIMIT $start_from, $record_per_page";
            $stmt = $this->conn->query($query);

            return $stmt;
        }
    }


    public function freelancer_total()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_freelancer_count
         FROM $this->table_name WHERE role='freelancer' AND verified != '0' 
         AND user_id != '$this->user_id'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function freelancer_total_saved()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_freelancer_count FROM tbl_saved_freelancers WHERE client_id='$this->user_id'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    //search freelancer
    public function search_freelancer()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search 
        LIKE '%$this->search%' AND role='freelancer' AND user_id != '$this->user_id'
        AND verified != '0'
        ORDER by created_at DESC LIMIT $start_from, $record_per_page";
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function search_by_service()
    {
        $query = "SELECT * FROM $this->table_name WHERE services_offer 
        LIKE '%$this->search%' AND role='freelancer'
        AND verified != '0'";
        $stmt = $this->conn->query($query);

        return $stmt;
    }



    //search pending
    public function search_pending()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search 
        LIKE '%$this->search%' AND verified = '0'
        ORDER by created_at DESC LIMIT $start_from, $record_per_page";
        $stmt = $this->conn->query($query);

        return $stmt;
    }


    public function fetch_search_freelancer_count()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_freelancer_count FROM $this->table_name 
        WHERE $this->filter_search LIKE '%$this->search%' AND role='freelancer'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function fetch_search_freelancer_count_saved()
    {
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search LIKE '%$this->search%'
         AND role='freelancer'";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            $freelancer_arr = array();
            $count = 0;
            while ($row = mysqli_fetch_assoc($result)) {
                $my_id = $row['user_id'];
                $query2 = "SELECT * FROM tbl_saved_freelancers WHERE freelancer_id = '$my_id'
                AND client_id = '$this->user_id'";
                $stmt2 = mysqli_stmt_init($this->conn);
                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row2 = $result2->fetch_assoc()) {
                        array_push($freelancer_arr, $row2);
                    }
                }
            }
            $freelancer_count = count($freelancer_arr);
            return $freelancer_count;
        }
    }

    public function fetch_saved_freelancers()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        // $query = "SELECT * FROM $this->table_name WHERE role='freelancer' ORDER by created_at DESC LIMIT $start_from, $record_per_page";
        // $stmt = $this->conn->query($query);

        $query = "SELECT freelancer_id FROM tbl_users INNER JOIN tbl_saved_freelancers 
        ON (tbl_saved_freelancers.client_id = tbl_users.user_id) 
        WHERE tbl_saved_freelancers.client_id = '$this->user_id'
        ORDER by tbl_saved_freelancers.created_at DESC LIMIT $start_from, $record_per_page";
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    //search freelancer saved
    public function search_freelancer_saved()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        // Create query
        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search LIKE '%$this->search%'
        ORDER by created_at DESC LIMIT $start_from, $record_per_page";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $freelancer_arr_saved = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $my_id = $row['user_id'];
                $query2 = "SELECT * FROM tbl_saved_freelancers WHERE freelancer_id = '$my_id'
                AND client_id='$this->user_id'";
                $stmt2 = mysqli_stmt_init($this->conn);
                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = $result2->fetch_assoc()) {
                        array_push($freelancer_arr_saved, $row);
                    }
                }
            }
            return $freelancer_arr_saved;
        }
    }

    public function search_hired_freelancer()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        // Create query
        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search LIKE '%$this->search%'
        ORDER by created_at DESC LIMIT $start_from, $record_per_page";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            $freelancer_arr = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $my_id = $row['user_id'];
                $query2 = "SELECT * FROM tbl_appointments WHERE freelancer_id = '$my_id'
                 and client_id='$this->user_id'
                and (c_status != 'done' || f_status != 'done')";
                $stmt2 = mysqli_stmt_init($this->conn);
                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = $result2->fetch_assoc()) {
                        array_push($freelancer_arr, $row);
                    }
                }
            }
            return $freelancer_arr;
        }
    }

    public function search_my_job()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        // Create query
        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search LIKE '%$this->search%'
        ORDER by created_at DESC LIMIT $start_from, $record_per_page";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            $freelancer_arr = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $my_id = $row['user_id'];
                $query2 = "SELECT * FROM tbl_appointments WHERE client_id = '$my_id' and freelancer_id='$this->user_id'";
                $stmt2 = mysqli_stmt_init($this->conn);
                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = $result2->fetch_assoc()) {
                        array_push($freelancer_arr, $row);
                    }
                }
            }
            return $freelancer_arr;
        }
    }


    public function hired_fetch_search_freelancer_count()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        // Create query
        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search LIKE '%$this->search%'
        ORDER by created_at DESC LIMIT $start_from, $record_per_page";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            $freelancer_arr = array();
            $count = 0;
            while ($row = mysqli_fetch_assoc($result)) {
                $my_id = $row['user_id'];
                $query2 = "SELECT * FROM tbl_appointments WHERE freelancer_id = '$my_id'
                 and client_id='$this->user_id' and (c_status != 'done' || f_status != 'done')";
                $stmt2 = mysqli_stmt_init($this->conn);
                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = $result2->fetch_assoc()) {
                        $count++;
                        array_push($freelancer_arr, $row);
                    }
                }
            }
            return $count;
        }
    }

    //add saved freelancer
    public function addSavedFreelancer()
    {
        $validate = "SELECT freelancer_id FROM tbl_saved_freelancers WHERE freelancer_id = '$this->freelancer_id'
        AND client_id = '$this->user_id'";
        $vallidate = mysqli_query($this->conn, $validate);

        if (mysqli_num_rows($vallidate) > 0) {
            http_response_code(400);
            // echo "This freelancer is already saved.";
            echo json_encode(array("message" => "not added"));
            return;
        } else {
        }

        $query = "INSERT INTO tbl_saved_freelancers (client_id, freelancer_id, created_at)
        VALUES (?,?, NOW() )";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "ss",
            $this->user_id,
            $this->freelancer_id,
        );

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    //delete saved freelancer
    public function deleteSavedFreelancer()
    {
        // Create query
        $query = "DELETE FROM tbl_saved_freelancers WHERE client_id = ? AND freelancer_id = ?";

        // prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $this->user_id, $this->freelancer_id);

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    //update client profile pic
    public function updateClientPic()
    {
        $query = "UPDATE $this->table_name SET profile_photo = ? WHERE user_id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            session_start();
            mysqli_stmt_bind_param(
                $stmt,
                "ss",
                $this->profile_photo,
                $_SESSION['user_id']
            );

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    //user change pass
    public function change_password()
    {
        // Create query
        $query = "SELECT password FROM $this->table_name WHERE user_id = ? AND password = ?";
        $old_passwordd = md5($this->old_password);

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $this->user_id, $old_passwordd);
            //execute query
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if (mysqli_stmt_execute($stmt)) {

                if (mysqli_num_rows($result) == 1) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $old_pass = $row['password'];
                    }

                    if ($old_pass == $old_passwordd) {
                        //execute query
                        $change = "UPDATE $this->table_name SET password = ? WHERE user_id = ?";
                        $stmt = mysqli_stmt_init($this->conn);
                        $new_passwordd = md5($this->new_password);

                        if (!mysqli_stmt_prepare($stmt, $change)) {
                            echo "SQL statement failed";
                        } else {
                            mysqli_stmt_bind_param($stmt, "ss", $new_passwordd, $this->user_id);

                            if (mysqli_stmt_execute($stmt)) {
                                return true;
                            }
                            return false;
                        }
                    }
                } else {
                    // echo "failed";
                    return false;
                }
            } //end first stmt
            return false;
        }
    }

    //forgot password
    public function change_password_forgot()
    {
        //create query
        $change = "UPDATE $this->table_name SET password = ? WHERE vkey = ?";
        $stmt = mysqli_stmt_init($this->conn);
        $old_passwordd = md5($this->old_password);

        if (!mysqli_stmt_prepare($stmt, $change)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $old_passwordd, $this->vkey);

            if (mysqli_stmt_execute($stmt)) {
                $query2 = "SELECT * FROM $this->table_name WHERE vkey = ?";

                //prepare and bind
                $stmt2 = mysqli_stmt_init($this->conn);

                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_bind_param($stmt2, "s", $this->vkey);

                    //execute query
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);

                    if (mysqli_stmt_execute($stmt2)) {

                        if (mysqli_num_rows($result2) == 1) {

                            while ($row = mysqli_fetch_assoc($result2)) {
                                $this->user_id = $row['user_id'];
                                $this->role = $row['role'];
                            }

                            session_start();
                            $_SESSION['user_id'] = $this->user_id;
                            $_SESSION['role'] = $this->role;
                            return true;
                        } else {
                            return false;
                        }
                    } //end first stmt
                    return false;
                }
            }
            return false;
        }
    }

    public function hired_freelancer_total()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_freelancer_count FROM 
        tbl_appointments WHERE client_id='$this->user_id' AND 
        (c_status != 'done' || f_status != 'done')";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function my_job_total()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_freelancer_count FROM 
        tbl_appointments WHERE freelancer_id='$this->user_id' AND (c_status != 'done' || f_status != 'done')";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }


    public function freelancer_my_job_count()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_freelancer_count FROM 
        tbl_appointments WHERE freelancer_id='$this->user_id' AND 
        (c_status != 'done' || f_status != 'done')";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }


    public function switchIntoClient()
    {
        $query = "UPDATE $this->table_name SET role = 'client' WHERE user_id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param(
                $stmt,
                "s",
                $this->user_id
            );

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    public function switchIntoFreelancer()
    {
        $query = "UPDATE $this->table_name SET role = 'freelancer' WHERE user_id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param(
                $stmt,
                "s",
                $this->user_id
            );

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    public function get_email_forgot()
    {
        $query = "SELECT * FROM $this->table_name where email = '$this->email'";

        $stmt = $this->conn->query($query);
        return $stmt;
    }

    public function get_name_message()
    {

        // echo $this->name;
        $query = "SELECT * FROM tbl_users INNER JOIN tbl_messages 
        ON (tbl_messages.incoming_msg_id = tbl_users.user_id || tbl_messages.outcoming_msg_id = tbl_users.user_id) 
        WHERE tbl_users.name LIKE '%$this->name%' ";
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function new_chat_message()
    {

        // echo $this->name;
        $query = "SELECT * FROM tbl_users WHERE name LIKE '%$this->name%' 
        AND user_id != '$this->user_id' AND verified != '0'";
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function get_notif()
    {

        $query = "SELECT * FROM tbl_notification WHERE notif_id_to = '$this->user_id' ORDER by created_at DESC LIMIT 10";
        $stmt = $this->conn->query($query);

        return $stmt;
    }



    //MOBILE
    public function isUserExists()
    {
        $query = "SELECT * FROM $this->table_name WHERE email = ? AND password = ? ";

        $new_password = md5($this->password);
        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);
        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
            return false;
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $this->email, $new_password);

            //execute query
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if (mysqli_stmt_execute($stmt)) {

                if (mysqli_num_rows($result) == 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    public function isAccountVerified()
    {
        $my_vkey = $this->vkey;
        $query = "SELECT verified, vkey FROM $this->table_name WHERE verified = '0' AND vkey ='$my_vkey'";

        //execute query
        $stmt = $this->conn->query($query);

        if ($stmt->num_rows == 1) {
            return true;
        } else {
            return false;
        }
    }
}
