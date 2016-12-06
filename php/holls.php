<?php
include "conf.php";

if(isset($_REQUEST['get_list']))
{
    $quer = $dbh->prepare("SELECT id, title_holl FROM jw_holls");
    $quer->execute();
    $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
    $result['success'] = true;
    $result['data'] = $rows;
    $result['msg'] = '';
    echo json_encode($result);
}
if(isset($_REQUEST['edit']))
{
    $_POST = json_decode(file_get_contents('php://input'), true);
    if($_POST['id'] > 0)
    {
        $sql = "update jw_holls set title_holl = :title_holl where id = :id";
        $quer = $dbh->prepare($sql);
        $quer->bindParam(':id', $_POST['id'], PDO::PARAM_INT);
    }
    else{
        $sql = "insert into jw_holls (title_holl) values (:title_holl)";
        $quer = $dbh->prepare($sql);
    }

    $quer->bindParam(':title_holl', $_POST['title_holl'], PDO::PARAM_STR);
    $quer->execute();

    if(!$_POST['id'] || $_POST['id'] < 1 || $_POST['id'] == '')
    {
        $_POST['id'] = $dbh->lastInsertId();
    }

    $result['success'] = true;
    $result['data'] = $_POST;
    $result['msg'] = '';
    echo json_encode($result);
}
if(isset($_REQUEST['get_list_check']))
{
    $quer = $dbh->prepare("SELECT id, title_holl FROM jw_holls");
    $quer->execute();
    $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
    $rows_check = array();
    for($i=0; $i<count($rows); $i++)
    {
        //{ boxLabel: 'Общий пионер', name: 'op', inputValue: '1' },
        $row = $rows[$i];
        $rows_check[] = array('boxLabel'=> $row['title_holl'], 'name' => 'holl_id', 'inputValue' => $row['id']);
    }
    $result['success'] = true;
    $result['data'] = $rows_check;
    $result['msg'] = '';
    echo json_encode($result);
}
