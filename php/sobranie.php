<?php
include "conf.php";

if(isset($_REQUEST['get_list']))
{
    $arhive = (isset($_REQUEST['arhive'])) ? "arhive = 1" : "arhive = 0";
    $pk = (isset($_REQUEST['pk'])) ? "pk = 1" : "pk = 0";

    $sql = "SELECT * FROM jw_sobr WHERE $arhive and $pk ORDER BY fio";

    $quer = $dbh->prepare($sql);
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
        $sql = "update jw_sobr set fio = :fio,
                pol = :pol,
                adr = :adr,
                tel = :tel,
                mob = :mob,
                data_r = :data_r,
                data_k = :data_k,
                po_do = :po_do,
                st = :st,
                sp = :sp,
                op = :op,
                arhive = :arhive,
                pk = :pk
                where id = :id";
        $quer = $dbh->prepare($sql);
        $quer->bindParam(':id', $_POST['id'], PDO::PARAM_INT);
    }
    else
    {
        $sql = "insert into jw_sobr
                (fio, pol, adr, tel, mob, data_r, data_k, po_do, st, sp, op, arhive, pk)
                values
                (:fio, :pol, :adr, :tel, :mob, :data_r, :data_k, :po_do, :st, :sp, :op, :arhive, :pk)";
        $quer = $dbh->prepare($sql);

    }
    $st = $_POST['st'] == true ? 1 : 0;
    $sp = $_POST['sp'] == true ? 1 : 0;
    $op = $_POST['op'] == true ? 1 : 0;
    $arhive = $_POST['arhive'] == true ? 1 : 0;
    $pk = $_POST['pk'] == true ? 1 : 0;
    $quer->bindParam(':fio', $_POST['fio'], PDO::PARAM_STR);
    $quer->bindParam(':pol', $_POST['pol'], PDO::PARAM_STR);
    $quer->bindParam(':adr', $_POST['adr'], PDO::PARAM_STR);
    $quer->bindParam(':tel', $_POST['tel'], PDO::PARAM_STR);
    $quer->bindParam(':mob', $_POST['mob'], PDO::PARAM_STR);
    $quer->bindParam(':data_r', $_POST['data_r'], PDO::PARAM_STR);
    $quer->bindParam(':data_k', $_POST['data_k'], PDO::PARAM_STR);
    $quer->bindParam(':po_do', $_POST['po_do'], PDO::PARAM_STR);
    $quer->bindParam(':st', $st, PDO::PARAM_INT);
    $quer->bindParam(':sp', $sp, PDO::PARAM_INT);
    $quer->bindParam(':op', $op, PDO::PARAM_INT);
    $quer->bindParam(':arhive', $arhive, PDO::PARAM_INT);
    $quer->bindParam(':pk', $pk, PDO::PARAM_INT);
    $quer->execute();

    $_POST['id'] = $_POST['id'] > 0 ? $_POST['id'] : $dbh->lastInsertId();

    $result['success'] = true;
    $result['data'] = $_POST;
    $result['msg'] = '';
    echo json_encode($result);
}