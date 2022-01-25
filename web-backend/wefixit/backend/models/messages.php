<?php


class Messages
{
    private $conn;

    public $table_name = "tbl_messages";

    public $id;
    public $user_id;
    public $incoming_msg_id;
    public $outcoming_msg_id;
    public $msg;
    public $created_at;
    public $status;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function fetch_messages()
    {
        // echo $this->user_id;
        // echo $this->incoming_msg_id;
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE (outcoming_msg_id = '$this->user_id' 
        AND incoming_msg_id = '$this->incoming_msg_id') OR (outcoming_msg_id = '$this->incoming_msg_id' 
        AND incoming_msg_id = '$this->user_id')";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    //add job
    public function addMessage()
    {
        $query = "INSERT INTO $this->table_name (incoming_msg_id, outcoming_msg_id, msg, created_at)
        VALUES (?,?,?, NOW() )";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "sss",
            $this->incoming_msg_id,
            $this->user_id,
            $this->msg,
        );

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function fetch_chats()
    {
        // echo $this->user_id;
        // echo $this->incoming_msg_id;
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE outcoming_msg_id = '$this->user_id' 
        OR incoming_msg_id = '$this->user_id' ORDER BY created_at DESC";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function fetch_single_chats_profile()
    {
        $query = "SELECT * FROM tbl_users INNER JOIN tbl_messages
        ON (tbl_users.user_id = (tbl_messages.outcoming_msg_id || tbl_messages.incoming_msg_id))
         WHERE tbl_users.user_id = ?
        ORDER BY tbl_messages.created_at DESC LIMIT 1";

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
                $this->created_at = $row['created_at'];
            }
        }
    }

    public function get_last_message()
    {
        // echo $this->user_id;
        // echo $this->incoming_msg_id;
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE outcoming_msg_id = '$this->id' 
        OR incoming_msg_id = '$this->id' ORDER BY id DESC";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            while ($row = mysqli_fetch_assoc($result)) {
                $this->id = $row['id'];
                $this->incoming_msg_id = $row['incoming_msg_id'];
                $this->outcoming_msg_id = $row['outcoming_msg_id'];
                $this->msg = $row['msg'];
                $this->created_at = $row['created_at'];
            }
        }

        //execute query
        // $stmt = $this->conn->query($query);

        // return $stmt;
    }

    public function get_message_profile()
    {
        // echo $this->user_id;
        // echo $this->incoming_msg_id;
        // Create query
        // SELECT * FROM tbl_messages INNER JOIN tbl_users WHERE tbl_users.user_id = 'kuzl2h538h0xy47o92t'

        session_start();
        $my_id = $_SESSION['user_id'];

        $query = "SELECT * FROM $this->table_name 
        INNER JOIN tbl_users ON (tbl_users.user_id = '$this->id')  
        WHERE tbl_messages.outcoming_msg_id = '$this->id' AND tbl_messages.incoming_msg_id = '$my_id'
        OR  tbl_messages.incoming_msg_id = '$this->id' AND tbl_messages.outcoming_msg_id = '$my_id'
        AND tbl_users.user_id = '$this->id'
        ORDER BY tbl_messages.id DESC LIMIT 1";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            while ($row = mysqli_fetch_assoc($result)) {
                $this->user_id = $row['user_id'];
                $this->status = $row['status'];
                $this->profile_photo = $row['profile_photo'];
                $this->name = $row['name'];
                $this->id = $row['id'];
                $this->incoming_msg_id = $row['incoming_msg_id'];
                $this->outcoming_msg_id = $row['outcoming_msg_id'];
                $this->msg = $row['msg'];
                $this->created_at = $row['created_at'];
            }
        }

        //execute query
        // $stmt = $this->conn->query($query);

        // return $stmt;
    }

    public function get_created_at()
    {
        $query = "SELECT * FROM $this->table_name 
        WHERE id = '$this->id'LIMIT 1";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            while ($row = mysqli_fetch_assoc($result)) {
                $this->created_at = $row['created_at'];
            }
        }

        //execute query
        // $stmt = $this->conn->query($query);

        // return $stmt;
    }
    
    public function get_message_count(){
        // Create query
        $query = "SELECT COUNT(*) as total_message_count FROM $this->table_name WHERE 
        incoming_msg_id = '$this->user_id' AND msg_status = '0'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function updateMessageCount()
    {

        $query = "UPDATE $this->table_name SET msg_status = ? WHERE incoming_msg_id = ? AND msg_status = '0'";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            $message_status = 1;
            mysqli_stmt_bind_param(
                $stmt,
                "is",
                $message_status,
                $this->user_id
            );

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }


    // public function get_time_ago($timee)
    // {
    //     date_default_timezone_set('Asia/Manila');
    //     list($date, $time) = explode(' ', $timee);
    //     list($year, $month, $day) = explode('-', $date);
    //     list($hour, $minutes, $seconds) = explode(':', $time);

    //     $unit_timestamp = mktime($hour, $minutes, $seconds, $month, $day, $year);
    //     return $unit_timestamp;
    // }

    // public function convertToAgoFormat($timestamp)
    // {
    //     date_default_timezone_set('Asia/Manila');
    //     $time_difference = time() - $timestamp;

    //     if ($time_difference < 1) {
    //         return 'less than 1 second ago';
    //     }

    //     $condition = array(
    //         12 * 30 * 24 * 60 * 60 =>  'year',
    //         30 * 24 * 60 * 60       =>  'month',
    //         24 * 60 * 60            =>  'day',
    //         60 * 60                 =>  'hour',
    //         60                      =>  'minute',
    //         1                       =>  'second'
    //     );

    //     foreach ($condition as $secs => $str) {
    //         $d = $time_difference / $secs;

    //         if ($d >= 1) {
    //             $t = floor($d);
    //             return $t . ' ' . $str . ($t > 1 ? 's' : '');
    //         }
    //     }
    // }
}
