<?php


class Appointments
{
    private $conn;

    public $table_name = "tbl_appointments";

    public $id;
    public $client_id;
    public $freelancer_id;
    public $job_post_id;
    public $proj_desc;
    public $proj_cost;
    public $proj_addr;
    public $start_date;
    public $end_date;
    public $service;
    public $created_at;
    public $status;
    public $page;
    public $start;
    public $limit;
    public $role;
    public $photo;
    public $fb_from;
    public $fb_to;
    public $fb_comment;
    public $fb_star;
    public $c_rating;
    public $f_rating;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    // fetch all appointmens
    public function client_fetch_my_appointments()
    {
        // echo $this->client_id;
        // Create query
        if (is_null($this->limit)) {
            $record_per_page = 10;
            $start_from = ($this->page - 1) * $record_per_page;
            $query = "SELECT * FROM $this->table_name where client_id = '$this->client_id'
            and (c_status != 'done' || f_status != 'done') ORDER by created_at DESC LIMIT $start_from, $record_per_page";
            $stmt = $this->conn->query($query);
            return $stmt;
        } else {
            $record_per_page = $this->limit;
            $start_from = ($this->start - 1) * $record_per_page;

            // if(is_null($this->page)){
            //     $query = "SELECT * FROM $this->table_name where client_id = '$this->client_id'";
            // }else{
            $query = "SELECT * FROM $this->table_name where client_id = '$this->client_id' 
            ORDER by created_at DESC LIMIT $start_from, $record_per_page";
            // // }


            // //execute query
            // $stmt = $this->conn->query($query);

            // return $stmt;
            $stmt = $this->conn->query($query);
            return $stmt;
        }
    }

    public function client_fetch_feedbacks()
    {
        // Create query
        $query = "SELECT * FROM tbl_feedbacks where appointment_id = '$this->id'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function fetch_photos()
    {
        // Create query
        $query = "SELECT * FROM tbl_fbphoto where appointment_id = '$this->id'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    // fetch all appointmens
    public function client_fetch_profile_appointments()
    {

        $record_per_page = $this->limit;
        $start_from = ($this->start - 1) * $record_per_page;

        if ($this->role == "freelancer") {
            // Create query
            $query = "SELECT * FROM $this->table_name where freelancer_id = '$this->freelancer_id' 
            and c_status='done' and f_status='done'
            ORDER by created_at DESC LIMIT $start_from, $record_per_page";

            //execute query
            $stmt = $this->conn->query($query);

            return $stmt;
        } else if ($this->role == "client") {
            // Create query
            $query = "SELECT * FROM $this->table_name where client_id = '$this->client_id'
            and c_status='done' and f_status='done'
            ORDER by created_at DESC LIMIT $start_from, $record_per_page";

            //execute query
            $stmt = $this->conn->query($query);

            return $stmt;
        }
    }

    public function hired_fetch_search_freelancer_count()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_freelancer_count FROM $this->table_name 
        WHERE $this->filter_search LIKE '%$this->search%' AND role='freelancer'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    // fetch all appointmens
    public function freelancer_fetch_my_appointments()
    {
        // echo $this->client_id;
        // Create query
        if (is_null($this->limit)) {
            $record_per_page = 10;
            $start_from = ($this->page - 1) * $record_per_page;
            $query = "SELECT * FROM $this->table_name where freelancer_id = '$this->freelancer_id'
            and (c_status != 'done' || f_status != 'done') 
            AND c_set = 'YES' AND f_set = 'YES'
            ORDER by created_at DESC LIMIT $start_from, $record_per_page";
            $stmt = $this->conn->query($query);
            return $stmt;
        } else {
            $record_per_page = $this->limit;
            $start_from = ($this->start - 1) * $record_per_page;

            // if(is_null($this->page)){
            //     $query = "SELECT * FROM $this->table_name where client_id = '$this->client_id'";
            // }else{
            $query = "SELECT * FROM $this->table_name where freelancer_id = '$this->freelancer_id' 
            ORDER by created_at DESC LIMIT $start_from, $record_per_page";
            // // }


            // //execute query
            // $stmt = $this->conn->query($query);

            // return $stmt;
            $stmt = $this->conn->query($query);
            return $stmt;
        }
    }

    //add job
    public function addAppointment()
    {

        $query = "INSERT INTO $this->table_name (client_id, freelancer_id,
         proj_cost, proj_addr, start_date, end_date, service, c_set, created_at)
        VALUES (?,?,?,?,?,?,?,?, NOW() )";

        $array = $this->service;
        $cameArray = implode(",", $array);
        $c_set = "YES";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "ssssssss",
            $this->client_id,
            $this->freelancer_id,
            $this->proj_cost,
            $this->proj_addr,
            $this->start_date,
            $this->end_date,
            $cameArray,
            $c_set
        );

        if ($stmt->execute()) {
            $query = "UPDATE tbl_jobs SET status = ? WHERE id = ?";

            $stmt = mysqli_stmt_init($this->conn);

            if (!mysqli_stmt_prepare($stmt, $query)) {
                echo "SQL statement failed";
            } else {
                $status_occupied = "occupied";
                mysqli_stmt_bind_param(
                    $stmt,
                    "si",
                    $status_occupied,
                    $this->job_post_id
                );

                if (mysqli_stmt_execute($stmt)) {
                    return true;
                }
            }

            return true;
        }
        return false;
    }

    public function get_appointment()
    {

        // Create query
        $query = "SELECT * FROM $this->table_name WHERE freelancer_id = ? AND client_id = ? 
        AND c_set = 'YES' AND f_set != 'YES'";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $this->freelancer_id, $this->client_id);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            while ($row = mysqli_fetch_assoc($result)) {
                $this->id = $row['id'];
                $this->client_id = $row['client_id'];
                $this->freelancer_id = $row['freelancer_id'];
                $this->proj_cost = $row['proj_cost'];
                $this->proj_addr = $row['proj_addr'];
                $this->start_date = $row['start_date'];
                $this->end_date = $row['end_date'];
                $this->service = $row['service'];
                $this->created_at = $row['created_at'];
            }
        }
    }

    public function c_cancelAppointment()
    {
        $query0 = "SELECT c_status FROM $this->table_name where id = '$this->id'";

        $stmt0 = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt0, $query0)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt0);
            $result0 = mysqli_stmt_get_result($stmt0);
            while ($row0 = mysqli_fetch_assoc($result0)) {
                $my_cc_status = $row0['c_status'];
                if ($my_cc_status == "done") {
                    $query00 = "DELETE FROM tbl_fbphoto WHERE appointment_id = '$this->id'";

                    $stmt00 = mysqli_stmt_init($this->conn);

                    if (!mysqli_stmt_prepare($stmt00, $query00)) {
                        echo "SQL statement failed";
                    } else {
                        if (mysqli_stmt_execute($stmt00)) {
                        }
                    }
                    session_start();
                    $fb_from = $_SESSION['user_id'];
                    $query01 = "DELETE FROM tbl_feedbacks WHERE appointment_id = '$this->id' AND fb_from = '$fb_from'";

                    $stmt01 = mysqli_stmt_init($this->conn);

                    if (!mysqli_stmt_prepare($stmt01, $query01)) {
                        echo "SQL statement failed";
                    } else {
                        if (mysqli_stmt_execute($stmt01)) {
                        }
                    }
                }
            }
        }

        $query = "UPDATE $this->table_name SET c_status = ? WHERE id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            $status_occupied = "cancel";
            mysqli_stmt_bind_param(
                $stmt,
                "si",
                $status_occupied,
                $this->id
            );

            if (mysqli_stmt_execute($stmt)) {
                $query2 = "SELECT * FROM $this->table_name where id = '$this->id'";

                $stmt2 = mysqli_stmt_init($this->conn);

                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = mysqli_fetch_assoc($result2)) {
                        $my_id = $row['id'];
                        $my_c_status = $row['c_status'];
                        $my_f_status = $row['f_status'];
                        $my_jobpost_id = $row['jobpost_id'];
                        if ($my_c_status == $my_f_status) {
                            $query3 = "DELETE FROM $this->table_name WHERE id = '$my_id'";

                            $stmt3 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt3, $query3)) {
                                echo "SQL statement failed";
                            } else {
                                if (mysqli_stmt_execute($stmt3)) {
                                }
                            }

                            $query4 = "UPDATE tbl_jobs SET status = ? WHERE id = ?";

                            $stmt4 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt4, $query4)) {
                                echo "SQL statement failed";
                            } else {
                                $status_post = "";
                                mysqli_stmt_bind_param(
                                    $stmt4,
                                    "si",
                                    $status_post,
                                    $my_jobpost_id
                                );

                                if (mysqli_stmt_execute($stmt4)) {
                                    return "deleted";
                                }
                            }
                        }
                        // return $my_c_status;

                        // echo $my_c_status;
                        // echo $my_f_status;
                    }
                }

                return "updated";
            }
            return "failed";
        }
    }

    public function f_cancelAppointment()
    {

        $query0 = "SELECT f_status FROM $this->table_name where id = '$this->id'";

        $stmt0 = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt0, $query0)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt0);
            $result0 = mysqli_stmt_get_result($stmt0);
            while ($row0 = mysqli_fetch_assoc($result0)) {
                $my_ff_status = $row0['f_status'];
                if ($my_ff_status == "done") {
                    session_start();
                    $fb_from = $_SESSION['user_id'];
                    $query01 = "DELETE FROM tbl_feedbacks WHERE appointment_id = '$this->id' AND fb_from = '$fb_from'";

                    $stmt01 = mysqli_stmt_init($this->conn);

                    if (!mysqli_stmt_prepare($stmt01, $query01)) {
                        echo "SQL statement failed";
                    } else {
                        if (mysqli_stmt_execute($stmt01)) {
                        }
                    }
                }
            }
        }

        $query = "UPDATE $this->table_name SET f_status = ? WHERE id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            $status_occupied = "cancel";
            mysqli_stmt_bind_param(
                $stmt,
                "si",
                $status_occupied,
                $this->id
            );

            if (mysqli_stmt_execute($stmt)) {
                $query2 = "SELECT * FROM $this->table_name where id = '$this->id'";

                $stmt2 = mysqli_stmt_init($this->conn);

                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = mysqli_fetch_assoc($result2)) {
                        $my_id = $row['id'];
                        $my_c_status = $row['c_status'];
                        $my_f_status = $row['f_status'];
                        $my_jobpost_id = $row['jobpost_id'];
                        if ($my_c_status == $my_f_status) {
                            $query3 = "DELETE FROM $this->table_name WHERE id = '$my_id'";

                            $stmt3 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt3, $query3)) {
                                echo "SQL statement failed";
                            } else {
                                if (mysqli_stmt_execute($stmt3)) {
                                }
                            }

                            $query4 = "UPDATE tbl_jobs SET status = ? WHERE id = ?";

                            $stmt4 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt4, $query4)) {
                                echo "SQL statement failed";
                            } else {
                                $status_post = "";
                                mysqli_stmt_bind_param(
                                    $stmt4,
                                    "si",
                                    $status_post,
                                    $my_jobpost_id
                                );

                                if (mysqli_stmt_execute($stmt4)) {
                                    return "deleted";
                                }
                            }
                        }
                        // return $my_c_status;

                        // echo $my_c_status;
                        // echo $my_f_status;
                    }
                }

                return "updated";
            }
            return "failed";
        }
    }

    //add fb photos
    public function addFbPhotos()
    {
        $query = "INSERT INTO tbl_fbphoto (appointment_id, fb_photos)
        VALUES (?,?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "is",
            $this->id,
            $this->photo
        );

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    //add feedback
    public function addFeedback()
    {

        $query = "INSERT INTO tbl_feedbacks (appointment_id, fb_from, fb_to, fb_comment, fb_star)
        VALUES (?,?,?,?,?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "issss",
            $this->id,
            $this->fb_from,
            $this->fb_to,
            $this->fb_comment,
            $this->fb_star
        );

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function c_markasdoneAppointment()
    {
        $query = "UPDATE $this->table_name SET c_status = ?, c_rating = ? WHERE id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            $status_occupied = "done";
            mysqli_stmt_bind_param(
                $stmt,
                "ssi",
                $status_occupied,
                $this->c_rating,
                $this->id
            );

            if (mysqli_stmt_execute($stmt)) {
                $query2 = "SELECT * FROM $this->table_name where id = '$this->id'";

                $stmt2 = mysqli_stmt_init($this->conn);

                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = mysqli_fetch_assoc($result2)) {
                        $my_c_status = $row['c_status'];
                        $my_f_status = $row['f_status'];
                        $c_id = $row['client_id'];
                        $f_id = $row['freelancer_id'];
                        $c_ratingg = $row['c_rating'];
                        $f_ratingg = $row['f_rating'];
                        if ($my_c_status == $my_f_status) {
                            $query44 = "UPDATE $this->table_name SET c_set = '', f_set = '' WHERE id = '$this->id'";

                            $stmt44 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt44, $query44)) {
                                echo "SQL statement failed";
                            } else {
                                if (mysqli_stmt_execute($stmt44)) {
                                }
                            }
                            
                            $query3 = "SELECT rating FROM tbl_users where user_id = '$f_id'";

                            $stmt3 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt3, $query3)) {
                                echo "SQL statement failed";
                            } else {
                                mysqli_stmt_execute($stmt3);
                                $result3 = mysqli_stmt_get_result($stmt3);
                                while ($row2 = mysqli_fetch_assoc($result3)) {
                                    $old_rating = $row2['rating'];

                                    $new_rating = (floatval($old_rating) + floatval($c_ratingg)) / 2;
                                    $query4 = "UPDATE tbl_users SET rating = ? WHERE user_id = ?";

                                    $stmt4 = mysqli_stmt_init($this->conn);

                                    $new_rating = strval($new_rating);
                                    if (!mysqli_stmt_prepare($stmt4, $query4)) {
                                        echo "SQL statement failed";
                                    } else {
                                        mysqli_stmt_bind_param(
                                            $stmt4,
                                            "ss",
                                            $new_rating,
                                            $f_id
                                        );
                                        if (mysqli_stmt_execute($stmt4)) {
                                        }
                                    }
                                }
                            }

                            $query33 = "SELECT rating FROM tbl_users where user_id = '$c_id'";

                            $stmt33 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt33, $query33)) {
                                echo "SQL statement failed";
                            } else {
                                mysqli_stmt_execute($stmt33);
                                $result33 = mysqli_stmt_get_result($stmt33);
                                while ($row22 = mysqli_fetch_assoc($result33)) {
                                    $old_rating = $row22['rating'];

                                    $new_rating = (floatval($old_rating) + floatval($f_ratingg)) / 2;
                                    $query44 = "UPDATE tbl_users SET rating = ? WHERE user_id = ?";

                                    $stmt44 = mysqli_stmt_init($this->conn);

                                    $new_rating = strval($new_rating);
                                    if (!mysqli_stmt_prepare($stmt44, $query44)) {
                                        echo "SQL statement failed";
                                    } else {
                                        mysqli_stmt_bind_param(
                                            $stmt44,
                                            "ss",
                                            $new_rating,
                                            $c_id
                                        );
                                        if (mysqli_stmt_execute($stmt44)) {
                                        }
                                    }
                                }
                            }

                            return "success";
                        }
                    }
                }

                return "updated";
            }
            return "failed";
        }
    }

    public function f_markasdoneAppointment()
    {
        $query = "UPDATE $this->table_name SET f_status = ?, f_rating = ? WHERE id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            $status_occupied = "done";
            mysqli_stmt_bind_param(
                $stmt,
                "ssi",
                $status_occupied,
                $this->f_rating,
                $this->id
            );

            if (mysqli_stmt_execute($stmt)) {
                $query2 = "SELECT * FROM $this->table_name where id = '$this->id'";

                $stmt2 = mysqli_stmt_init($this->conn);

                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = mysqli_fetch_assoc($result2)) {
                        $my_c_status = $row['c_status'];
                        $my_f_status = $row['f_status'];
                        $c_id = $row['client_id'];
                        $f_id = $row['freelancer_id'];
                        $c_ratingg = $row['c_rating'];
                        $f_ratingg = $row['f_rating'];
                        if ($my_c_status == $my_f_status) {


                            $query44 = "UPDATE $this->table_name SET c_set = '', f_set = '' WHERE id = '$this->id'";

                            $stmt44 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt44, $query44)) {
                                echo "SQL statement failed";
                            } else {
                                if (mysqli_stmt_execute($stmt44)) {
                                }
                            }

                            $query3 = "SELECT rating FROM tbl_users where user_id = '$f_id'";

                            $stmt3 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt3, $query3)) {
                                echo "SQL statement failed";
                            } else {
                                mysqli_stmt_execute($stmt3);
                                $result3 = mysqli_stmt_get_result($stmt3);
                                while ($row2 = mysqli_fetch_assoc($result3)) {
                                    $old_rating = $row2['rating'];

                                    $new_rating = (floatval($old_rating) + floatval($c_ratingg)) / 2;
                                    $query4 = "UPDATE tbl_users SET rating = ? WHERE user_id = ?";

                                    $stmt4 = mysqli_stmt_init($this->conn);

                                    $new_rating = strval($new_rating);
                                    if (!mysqli_stmt_prepare($stmt4, $query4)) {
                                        echo "SQL statement failed";
                                    } else {
                                        mysqli_stmt_bind_param(
                                            $stmt4,
                                            "ss",
                                            $new_rating,
                                            $f_id
                                        );
                                        if (mysqli_stmt_execute($stmt4)) {
                                        }
                                    }
                                }
                            }

                            $query33 = "SELECT rating FROM tbl_users where user_id = '$c_id'";

                            $stmt33 = mysqli_stmt_init($this->conn);

                            if (!mysqli_stmt_prepare($stmt33, $query33)) {
                                echo "SQL statement failed";
                            } else {
                                mysqli_stmt_execute($stmt33);
                                $result33 = mysqli_stmt_get_result($stmt33);
                                while ($row22 = mysqli_fetch_assoc($result33)) {
                                    $old_rating = $row22['rating'];

                                    $new_rating = (floatval($old_rating) + floatval($f_ratingg)) / 2;
                                    $query44 = "UPDATE tbl_users SET rating = ? WHERE user_id = ?";

                                    $stmt44 = mysqli_stmt_init($this->conn);

                                    $new_rating = strval($new_rating);
                                    if (!mysqli_stmt_prepare($stmt44, $query44)) {
                                        echo "SQL statement failed";
                                    } else {
                                        mysqli_stmt_bind_param(
                                            $stmt44,
                                            "ss",
                                            $new_rating,
                                            $c_id
                                        );
                                        if (mysqli_stmt_execute($stmt44)) {
                                        }
                                    }
                                }
                            }

                            return "success";
                        }
                    }
                }
                return "updated";
            }
            return "failed";
        }
    }

    public function accept_appointment()
    {
        $query = "UPDATE $this->table_name SET f_set = ? WHERE id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            $status_set = "YES";
            mysqli_stmt_bind_param(
                $stmt,
                "si",
                $status_set,
                $this->id
            );

            if (mysqli_stmt_execute($stmt)) {

                return "updated";
            }
            return "failed";
        }
    }

    public function deny_appointment()
    {
        $query = "DELETE FROM $this->table_name WHERE id = '$this->id'";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {

            if (mysqli_stmt_execute($stmt)) {

                return "deleted";
            }
            return "failed";
        }
    }

    public function client_prev_appointments()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_appoint FROM $this->table_name 
        WHERE client_id = '$this->user_id' AND c_status = 'done' AND f_status = 'done'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }
}
