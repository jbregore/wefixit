<?php


class Notification
{
    private $conn;

    public $table_name = "tbl_notification";

    public $user_id;
    public $notif_id;
    public $notif_text;
    public $notif_id_from;
    public $notif_id_to;
    public $created_at;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    //add notif
    public function addNotif()
    {

        $query = "INSERT INTO $this->table_name (notif_text, notif_id_from, notif_id_to, created_at, notif_status)
        VALUES (?,?,?, NOW(), ?)";

        $notif_status = 0;
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "sssi",
            $this->notif_text,
            $this->notif_id_from,
            $this->notif_id_to,
            $notif_status
        );

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function get_notif_count(){
        // Create query
        $query = "SELECT COUNT(*) as total_notif_count FROM $this->table_name WHERE notif_id_to = '$this->user_id' AND notif_status = '0'";

        //execute query
        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function updateNotifCount()
    {

        $query = "UPDATE $this->table_name SET notif_status = ? WHERE notif_id_to = ?";

        $stmt = mysqli_stmt_init($this->conn);

        if (!mysqli_stmt_prepare($stmt, $query)) {
            echo "SQL statement failed";
        } else {
            $notif_status = 1;
            mysqli_stmt_bind_param(
                $stmt,
                "is",
                $notif_status,
                $this->user_id
            );

            if (mysqli_stmt_execute($stmt)) {
                return true;
            }
            return false;
        }
    }

}
