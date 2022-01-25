<?php


class Main
{
    private $conn;

    public $table_name = "tbl_jobs";

    public $id;
    public $user_id;
    public $job_createdAt;
    public $page;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function fetch_services()
    {

        $record_per_page = 9;
        $start_from = ($this->page - 1) * $record_per_page;

        $query = "SELECT * FROM $this->table_name WHERE status != 'occupied' ORDER by job_createdAt DESC LIMIT $start_from, $record_per_page";
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function fetch_latest_feedbacks()
    {

        $query = "SELECT * FROM tbl_feedbacks order by id DESC";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            $main_arr = array();

            while ($row = mysqli_fetch_assoc($result)) {
                $my_id = $row['fb_from'];
                $query2 = "SELECT * FROM tbl_users WHERE user_id = '$my_id' AND role = 'client'";

                $stmt2 = mysqli_stmt_init($this->conn);

                if (!mysqli_stmt_prepare($stmt2, $query2)) {
                    echo "SQL statement failed gago";
                } else {
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);

                    while ($row2 = mysqli_fetch_assoc($result2)) {
                        $f_id =  $row2['user_id'];
                        // echo 'gago';
                        array_push($main_arr, $f_id);
                    }
                }
            }

            $i = 0;
            $new_array = array();
            while ($i < count($main_arr)) {
                $fb_id = $main_arr[$i];
                $query3 = "SELECT * FROM tbl_feedbacks WHERE fb_from = '$fb_id' order by id DESC ";

                $stmt3 = mysqli_stmt_init($this->conn);

                if (!mysqli_stmt_prepare($stmt3, $query3)) {
                    echo "SQL statement failed";
                } else {
                    mysqli_stmt_execute($stmt3);
                    $result3 = mysqli_stmt_get_result($stmt3);

                    while ($row3 = $result3->fetch_assoc()) {
                        array_push($new_array, $row3);
                    }
                }
                $i++;
            }

            return $new_array;
        }

        // Create query
        // $query = "SELECT * FROM tbl_feedbacks";

        // //execute query
        // $stmt = $this->conn->query($query);

        // return $stmt;
    }
}
