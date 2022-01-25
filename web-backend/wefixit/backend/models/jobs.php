<?php


class Jobs
{
    private $conn;

    public $table_name = "tbl_jobs";

    public $id;
    public $user_id;
    public $job_headline;
    public $job_location;
    public $job_services;
    public $job_age;
    public $job_scope;
    public $job_rate_desc;
    public $job_rate;
    public $job_desc;
    public $job_createdAt;
    public $page;
    public $search;
    public $filter_search;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    //add job
    public function addJob()
    {
        $query = "INSERT INTO $this->table_name (user_id, job_headline, job_location, job_services, job_age_range, job_scope,
         job_rate_desc, job_rate, job_desc, job_createdAt)
        VALUES (?,?,?,?,?,?,?,?,?, NOW() )";

        $array = $this->job_services;
        $cameArray = implode(",", $array);

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "sssssssss",
            $this->user_id,
            $this->job_headline,
            $this->job_location,
            $cameArray,
            $this->job_age,
            $this->job_scope,
            $this->job_rate_desc,
            $this->job_rate,
            $this->job_desc
        );

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function fetch_my_job_post()
    {

        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        $query = "SELECT * FROM $this->table_name WHERE user_id = '$this->user_id' ORDER by job_createdAt DESC LIMIT $start_from, $record_per_page";
        $stmt = $this->conn->query($query);

        return $stmt;
    }


    public function my_job_total()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_job_count FROM $this->table_name WHERE user_id = '$this->user_id'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function all_job_post_total()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_job_count FROM $this->table_name 
        WHERE user_id != '$this->user_id' AND status != 'occupied'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }


    public function get_time_ago($timee)
    {
        date_default_timezone_set('Asia/Manila');
        list($date, $time) = explode(' ', $timee);
        list($year, $month, $day) = explode('-', $date);
        list($hour, $minutes, $seconds) = explode(':', $time);

        $unit_timestamp = mktime($hour, $minutes, $seconds, $month, $day, $year);
        return $unit_timestamp;
    }

    public function convertToAgoFormat($timestamp)
    {
        date_default_timezone_set('Asia/Manila');
        $time_difference = time() - $timestamp;

        if ($time_difference < 1) {
            return 'less than 1 second ago';
        }

        $condition = array(
            12 * 30 * 24 * 60 * 60 =>  'year',
            30 * 24 * 60 * 60       =>  'month',
            24 * 60 * 60            =>  'day',
            60 * 60                 =>  'hour',
            60                      =>  'minute',
            1                       =>  'second'
        );

        foreach ($condition as $secs => $str) {
            $d = $time_difference / $secs;

            if ($d >= 1) {
                $t = floor($d);
                return $t . ' ' . $str . ($t > 1 ? 's' : '') . ' ago';
            }
        }
    }

    //delete
    public function deleteJob()
    {
        // Create query
        $query = "DELETE FROM $this->table_name WHERE id = ?";

        // prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "s", $this->id);

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    // get edit jobs
    public function fetch_single_edit()
    {
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE id = ?";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "s", $this->id);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            while ($row = mysqli_fetch_assoc($result)) {
                $this->id = $row['id'];
                $this->user_id = $row['user_id'];
                $this->job_headline = $row['job_headline'];
                $this->job_location = $row['job_location'];
                $this->job_services = $row['job_services'];
                $this->job_age = $row['job_age_range'];
                $this->job_scope = $row['job_scope'];
                $this->job_rate_desc = $row['job_rate_desc'];
                $this->job_rate = $row['job_rate'];
                $this->job_desc = $row['job_desc'];
                $this->job_createdAt = $row['job_createdAt'];
            }
        }
    }

    //update 
    public function updateJobPost()
    {

        $query = "UPDATE $this->table_name SET job_headline = ?, job_location = ?, job_services = ?,
        job_age_range = ?, job_scope = ?, job_rate_desc = ?, job_rate = ?, job_desc = ? WHERE id = ?";

        $stmt = mysqli_stmt_init($this->conn);

        $array = $this->job_services; // Your array  
        $cameArray = implode(",", $array);

        // echo $cameArray; 

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            session_start();
            mysqli_stmt_bind_param(
                $stmt,
                "ssssssssi",
                $this->job_headline,
                $this->job_location,
                $cameArray,
                $this->job_age,
                $this->job_scope,
                $this->job_rate_desc,
                $this->job_rate,
                $this->job_desc,
                $this->id
            );

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    //search my job post
    public function fetch_search_job_result_my_post()
    {

        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        $query = "SELECT * FROM $this->table_name WHERE user_id = '$this->user_id' AND $this->filter_search LIKE '%$this->search%' ORDER by job_createdAt DESC LIMIT $start_from, $record_per_page";
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    //search all job post
    public function fetch_search_job_result_all_post()
    {

        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        $query = "SELECT * FROM $this->table_name WHERE user_id != '$this->user_id' AND $this->filter_search LIKE '%$this->search%' AND status != 'occupied'  ORDER by job_createdAt DESC LIMIT $start_from, $record_per_page";
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function fetch_search_job_result_my_count()
    {

        // Create query
        $query = "SELECT COUNT(*) as total_job_count FROM $this->table_name WHERE user_id = '$this->user_id' AND $this->filter_search LIKE '%$this->search%'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function  fetch_search_job_result_all_count()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_job_count FROM $this->table_name
         WHERE user_id != '$this->user_id' AND status != 'occupied'
         AND $this->filter_search LIKE '%$this->search%' ";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    //show proposals
    public function fetch_allProposals()
    {
        $query = "SELECT * FROM tbl_jobs INNER JOIN tbl_proposals 
        ON (tbl_proposals.job_post_id = tbl_jobs.id) 
        INNER JOIN tbl_users ON (tbl_users.user_id = tbl_proposals.user_id)
        WHERE tbl_proposals.job_post_id = '$this->id'";
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    //get proposal count
    public function my_proposal_total()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_proposal_count FROM tbl_proposals WHERE job_post_id = '$this->id'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    //delete proposal
    public function declineProposal()
    {
        // Create query
        $query = "DELETE FROM tbl_proposals WHERE job_post_id = ? AND user_id = ?";

        // prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $this->id, $this->user_id);

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    public function fetch_all_job_post()
    {

        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        $query = "SELECT * FROM $this->table_name WHERE user_id != '$this->user_id' AND status != 'occupied' ORDER by job_createdAt DESC LIMIT $start_from, $record_per_page";
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function fetch_all_my_post()
    {

        $query = "SELECT * FROM $this->table_name
         WHERE user_id = '$this->user_id' 
         AND status != 'occupied' ORDER BY job_createdAt DESC ";
        $stmt = $this->conn->query($query);

        return $stmt;
    }
    

    //add proposal
    public function addProposal(){

        $validate = "SELECT * FROM tbl_proposals WHERE job_post_id = '$this->id'
        AND user_id = '$this->user_id'";
        $vallidate = mysqli_query($this->conn, $validate);

        if (mysqli_num_rows($vallidate) > 0) {
            http_response_code(400);
            // echo "Creation failed, duplicates";
            return;
        } else {
            // echo "gago ka";
            // echo $this->whole_id;
        }

        $query = "INSERT INTO tbl_proposals (job_post_id, user_id, created_at)
        VALUES (?,?, NOW())";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "ss",
            $this->id,
            $this->user_id
        );

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    //add save job
    public function addSavedJob(){

        $validate = "SELECT * FROM tbl_saved_jobs WHERE job_post_id = '$this->id'
        AND freelancer_id = '$this->user_id'";
        $vallidate = mysqli_query($this->conn, $validate);

        if (mysqli_num_rows($vallidate) > 0) {
            http_response_code(400);
            // echo "Creation failed, duplicates";
            return;
        } else {
            // echo "gago ka";
            // echo $this->whole_id;
        }

        $query = "INSERT INTO tbl_saved_jobs (job_post_id, freelancer_id, created_at)
        VALUES (?,?, NOW())";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "ss",
            $this->id,
            $this->user_id
        );

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function fetch_saved_jobs()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        // $query = "SELECT * FROM $this->table_name WHERE role='freelancer' ORDER by created_at DESC LIMIT $start_from, $record_per_page";
        // $stmt = $this->conn->query($query);

        // $query = "SELECT user_id FROM tbl_users INNER JOIN tbl_saved_jobs 
        // ON (tbl_saved_jobs.freelancer_id = tbl_users.user_id) 
        // WHERE tbl_saved_jobs.freelancer_id = '$this->user_id'
        // ORDER by tbl_saved_jobs.created_at DESC LIMIT $start_from, $record_per_page";
        $query = "SELECT job_post_id FROM tbl_users INNER JOIN tbl_saved_jobs 
        ON (tbl_saved_jobs.freelancer_id = tbl_users.user_id) 
        WHERE tbl_saved_jobs.freelancer_id = '$this->user_id'
        ORDER by tbl_saved_jobs.created_at DESC LIMIT $start_from, $record_per_page";
        // SELECT * FROM tbl_users INNER JOIN tbl_saved_jobs 
        // ON (tbl_saved_jobs.freelancer_id = tbl_users.user_id) 
        // WHERE tbl_saved_jobs.freelancer_id = 'ksvlh2wtrrxeij7iic';
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function job_total_saved()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_job_count FROM tbl_saved_jobs WHERE freelancer_id='$this->user_id'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    //delete saved job
    public function deleteSavedJob()
    {
        // Create query
        $query = "DELETE FROM tbl_saved_jobs WHERE job_post_id = ? AND freelancer_id = ?";

        // prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $this->id, $this->user_id);

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

    //search job saved
    public function search_job_saved()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        // Create query
        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search LIKE '%$this->search%'
        ORDER by job_createdAt DESC LIMIT $start_from, $record_per_page";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $job_arr_saved = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $my_id = $row['id'];
                $query2 = "SELECT * FROM tbl_saved_jobs WHERE job_post_id = '$my_id'
                AND freelancer_id='$this->user_id'";
                $stmt2 = mysqli_stmt_init($this->conn);
                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = $result2->fetch_assoc()) {
                        array_push($job_arr_saved, $row);
                    }
                }
            }
            return $job_arr_saved;
        }
    }
    
    public function fetch_search_job_count_saved()
    {
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search LIKE '%$this->search%'";

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
                $my_id = $row['id'];
                $query2 = "SELECT * FROM tbl_saved_jobs WHERE job_post_id = '$my_id'
                AND freelancer_id = '$this->user_id'";
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
    
    public function fetch_applied_jobs()
    {
        // /0/2/4
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;
        // Create query
        $query = "SELECT * FROM $this->table_name ORDER by job_createdAt DESC ";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $job_arr_saved = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $my_id = $row['id'];
                $query2 = "SELECT * FROM tbl_proposals WHERE job_post_id = '$my_id'
                AND user_id='$this->user_id'";
                $stmt2 = mysqli_stmt_init($this->conn);
                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = $result2->fetch_assoc()) {
                        array_push($job_arr_saved, $row);
                    }
                }
            }
            return $job_arr_saved;
        }
    }

    public function job_total_applied()
    {
        // Create query
        $query = "SELECT COUNT(*) as total_job_count FROM tbl_proposals WHERE user_id='$this->user_id'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    //search job saved
    public function search_job_applied()
    {
        $record_per_page = 10;
        $start_from = ($this->page - 1) * $record_per_page;

        // Create query
        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search LIKE '%$this->search%'
        ORDER by job_createdAt DESC LIMIT $start_from, $record_per_page";

        //prepare and bind
        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $job_arr_saved = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $my_id = $row['id'];
                $query2 = "SELECT * FROM tbl_proposals WHERE job_post_id = '$my_id'
                AND user_id='$this->user_id'";
                $stmt2 = mysqli_stmt_init($this->conn);
                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    while ($row = $result2->fetch_assoc()) {
                        array_push($job_arr_saved, $row);
                    }
                }
            }
            return $job_arr_saved;
        }
    }

    public function fetch_search_job_count_applied()
    {
        // Create query
        $query = "SELECT * FROM $this->table_name WHERE $this->filter_search LIKE '%$this->search%'";

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
                $my_id = $row['id'];
                $query2 = "SELECT * FROM tbl_proposals WHERE job_post_id = '$my_id'
                AND user_id = '$this->user_id'";
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
    

    
}
