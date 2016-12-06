<?php
include "conf.php";

if(isset($_REQUEST['get_list']))
{
    $quer = $dbh->prepare("SELECT id, text FROM jw_periods");
    $quer->execute();
    $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
    $result['success'] = true;
    $result['data'] = $rows;
    $result['msg'] = '';
    echo json_encode($result);
}