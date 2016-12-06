<?php
include "conf.php";
if(isset($_REQUEST['get_list']))
{
    $num_mes = $_REQUEST['num_mes'];
    $god = $_REQUEST['god'];
    if($num_mes != '' and $god != '')
    {
        $sql = "SELECT DISTINCT s.id as us_id, s.fio, s.tel, s.mob, o.* FROM jw_sobr as s LEFT JOIN jw_order as o
            ON
                s.id = o.userid and o.num_mes = :num_mes and o.god = :god
            WHERE
                s.arhive = 0 and s.pk = 0
            ORDER BY fio";
        $quer = $dbh->prepare($sql);
        $quer->bindParam(':num_mes', $num_mes, PDO::PARAM_INT);
        $quer->bindParam(':god', $god, PDO::PARAM_STR);
        $quer->execute();
        $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
        $result['success'] = true;
        $result['data'] = $rows;
        $result['msg'] = '';
        echo json_encode($result);
        exit;
    }
    $result['success'] = false;
    $result['data'] = array();
    $result['msg'] = 'Ошибка запроса! Не указан год и период для выборки.';
    echo json_encode($result);
}

if(isset($_REQUEST['save_data']))
{
    $_POST = json_decode(file_get_contents('php://input'), true);
    $id = $_POST['id'];
    $userid = $_POST['userid'];
    $num_mes = $_POST['num_mes'];
    $ord_mes = $_POST['ord_mes'] > 0 ? $_POST['ord_mes'] : $num_mes;
    $mes = $_POST['mes'];
    $god = $_POST['god'];
    $kni = $_POST['kni'];
    $bro = $_POST['bro'];
    $chas = $_POST['chas'];
    $jur = $_POST['jur'];
    $pov = $_POST['pov'];
    $izb = $_POST['izb'];
    $buk = $_POST['buk'];
    $prim = $_POST['prim'];
    $pp = ($_POST['pp'] > 0) ? 1 : 0;
    $op = ($_POST['op'] > 0) ? 1 : 0;

    if($id > 0)
    {
        $sql = "update jw_order set
					ord_mes = :ord_mes, kni = :kni, bro = :bro,
					chas = :chas, jur = :jur, pov = :pov,
					izb = :izb, buk = :buk, prim = :prim,
					pp = :pp, op = :op
					where id = :id";
        $quer = $dbh->prepare($sql);
        $quer->bindParam(':id', $id, PDO::PARAM_INT);
    }
    else
    {
        $sql = "insert into jw_order
        (userid, num_mes, ord_mes, mes, god, kni, bro, chas, jur, pov, izb, buk, prim, pp, op)
        values
        (:userid, :num_mes, :ord_mes, :mes, :god, :kni, :bro, :chas, :jur, :pov, :izb, :buk, :prim, :pp, :op)";
        $quer = $dbh->prepare($sql);
        $quer->bindParam(':userid', $userid, PDO::PARAM_INT);
        $quer->bindParam(':num_mes', $num_mes, PDO::PARAM_INT);
        $quer->bindParam(':mes', $mes, PDO::PARAM_STR);
        $quer->bindParam(':god', $god, PDO::PARAM_STR);
    }

    $quer->bindParam(':ord_mes', $ord_mes, PDO::PARAM_INT);
    $quer->bindParam(':kni', $kni, PDO::PARAM_INT);
    $quer->bindParam(':bro', $bro, PDO::PARAM_INT);
    $quer->bindParam(':chas', $chas, PDO::PARAM_INT);
    $quer->bindParam(':jur', $jur, PDO::PARAM_INT);
    $quer->bindParam(':pov', $pov, PDO::PARAM_INT);
    $quer->bindParam(':izb', $izb, PDO::PARAM_INT);
    $quer->bindParam(':buk', $buk, PDO::PARAM_INT);
    $quer->bindParam(':prim', $prim, PDO::PARAM_STR);
    $quer->bindParam(':pp', $pp, PDO::PARAM_INT);
    $quer->bindParam(':op', $op, PDO::PARAM_INT);
    $quer->execute();

    if(!$id || $id < 1 || $id == '')
    {
        $id = $dbh->lastInsertId();
        $_POST['id'] = $id;
    }

    $result['success'] = true;
    $result['data'] = $_POST;
    $result['msg'] = '';
    echo json_encode($result);

}

if(isset($_REQUEST['get_reports']))
{
    $sql = "select god, ord_mes,
            COUNT(id) as numbs, SUM(kni) as kni,
            SUM(bro) as bro, SUM(chas) as chas,
            SUM(buk) as buk, SUM(jur) as jur,
            SUM(pov) as pov, SUM(izb) as izb, pp, op
            from jw_order where god = :god and ord_mes = :ord_mes group by pp, op";
    $quer = $dbh->prepare($sql);
    $quer->bindParam(':ord_mes', $_REQUEST['ord_mes'], PDO::PARAM_INT);
    $quer->bindParam(':god', $_REQUEST['god'], PDO::PARAM_STR);
    $quer->execute();
    $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
    $result['success'] = true;
    $result['data'] = $rows;
    $result['msg'] = '';
    echo json_encode($result);
    exit;
}