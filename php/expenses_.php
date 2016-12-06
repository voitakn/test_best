<?php
include "conf.php";

echo 'test';

if(isset($_GET['get_list']))
{
    if(!isset($_REQUEST['date_from']))
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
    }
    else
    {
        $_POST = $_REQUEST;
    }

    $date_f = DateTime::createFromFormat('d-m-Y', $_POST['date_from']);
    $date_from = $date_f->format('Y-m-d');
    $date_t = DateTime::createFromFormat('d-m-Y', $_POST['date_to']);
    $date_to = $date_t->format('Y-m-d');
    if($date_from != '' && $date_to != '') {

        $rows = get_expenses($dbh, $date_from, $date_to);
        $result['success'] = true;
        $result['data'] = $rows;
        $result['msg'] = '';
        echo json_encode($result);
    } else {
        $result['success'] = false;
        $result['data'] = array();
        $result['msg'] = 'Для отображения расходов нужно указать период';
        echo json_encode($result);
    }

}

if(isset($_REQUEST['edit']))
{
    if(!isset($_REQUEST['ex_type']))
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
    }
    else
    {
        $_POST = $_REQUEST;
    }
    $id = 0;
    $date_f = DateTime::createFromFormat('d-m-Y', $_POST['create_date']);
    $create_date = $date_f->format('Y-m-d');
    if(isset($_POST['id']) && $_POST['id'] > 0)
    {
        $id = $_POST['id'];
        $sql = 'update jw_expenses set
            ex_type = :ex_type,
            holl_id = :holl_id,
            org_id = :org_id,
            coment = :coment,
            amount = :amount,
            create_date = :create_date
            where id = :id';
        $quer = $dbh->prepare($sql);
        $quer->bindParam(':id', $_POST['id'], PDO::PARAM_INT);
    }
    else
    {
        $sql = 'insert into jw_expenses (ex_type, holl_id, org_id, coment, amount, create_date)
                values (:ex_type, :holl_id, :org_id, :coment, :amount, :create_date)';
        $quer = $dbh->prepare($sql);
    }
    $quer->bindParam(':ex_type', $_POST['ex_type'], PDO::PARAM_INT);
    $quer->bindParam(':holl_id', $_POST['holl_id'], PDO::PARAM_INT);
    if($_POST['ex_type'] == 1) {
        $quer->bindParam(':org_id', $_POST['org_id'], PDO::PARAM_INT);
    } else {
        $_POST['org_id'] = '0';
        $quer->bindParam(':org_id', $_POST['org_id'], PDO::PARAM_INT);
    }

    $quer->bindParam(':coment', $_POST['coment'], PDO::PARAM_STR);
    $quer->bindParam(':amount', $_POST['amount'], PDO::PARAM_STR);
    $quer->bindParam(':create_date', $create_date, PDO::PARAM_STR);
    $quer->execute();
    if($id == 0)
    {
        $_POST['id'] = $dbh->lastInsertId();
        $id = $_POST['id'];
    }
    getById($id, $dbh);
}
if(isset($_GET['get_id']))
{
    getById($_GET['get_id'], $dbh);
}

if(isset($_REQUEST['export'])) {
    if(!isset($_REQUEST['date_from']))
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
    }
    else
    {
        $_POST = $_REQUEST;
    }
    $date_f = DateTime::createFromFormat('d-m-Y', $_POST['date_from']);
    $date_from = $date_f->format('Y-m-d');
    $date_t = DateTime::createFromFormat('d-m-Y', $_POST['date_to']);
    $date_to = $date_t->format('Y-m-d');
    if($date_from != '' && $date_to != '') {
        $rows = get_expenses($dbh, $date_from, $date_to);

        header('Content-Type: text/html; charset=windows-1251');
        header('P3P: CP="NOI ADM DEV PSAi COM NAV OUR OTRo STP IND DEM"');
        header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('Cache-Control: post-check=0, pre-check=0', FALSE);
        header('Pragma: no-cache');
        header('Content-transfer-encoding: binary');
        header('Content-Disposition: attachment; filename=list.xls');
        header('Content-Type: application/x-unknown');

        ?><table border="1">
        <tr>
            <td><b><?=htmlentities(iconv("utf-8", "windows-1251", "Тип"), ENT_QUOTES, "cp1251");?></b></td>
            <td><b><?=htmlentities(iconv("utf-8", "windows-1251", "Зал"), ENT_QUOTES, "cp1251");?></b></td>
            <td><b><?=htmlentities(iconv("utf-8", "windows-1251", "Сумма"), ENT_QUOTES, "cp1251");?></b></td>
            <td><b><?=htmlentities(iconv("utf-8", "windows-1251", "Дата"), ENT_QUOTES, "cp1251");?></b></td>
            <td><b><?=htmlentities(iconv("utf-8", "windows-1251", "Организация"), ENT_QUOTES, "cp1251");?></b></td>
            <td><b><?=htmlentities(iconv("utf-8", "windows-1251", "Назначение"), ENT_QUOTES, "cp1251");?></b></td>
        </tr>
        <?
        foreach($rows as $row) {
            ?>
            <tr>
                <td><?=htmlentities(iconv("utf-8", "windows-1251", $row['ex_type_name']), ENT_QUOTES, "cp1251");?></td>
                <td><?=htmlentities(iconv("utf-8", "windows-1251", $row['title_holl']), ENT_QUOTES, "cp1251");?></td>
                <td><?=htmlentities(iconv("utf-8", "windows-1251", str_replace(".", ",", $row['amount'])), ENT_QUOTES, "cp1251");?></td>
                <td><?=htmlentities(iconv("utf-8", "windows-1251", $row['create_date']), ENT_QUOTES, "cp1251");?></td>
                <td><?=htmlentities(iconv("utf-8", "windows-1251", $row['title_org']), ENT_QUOTES, "cp1251");?></td>
                <td><?=htmlentities(iconv("utf-8", "windows-1251", $row['coment']), ENT_QUOTES, "cp1251");?></td>
            </tr>
            <?
        }
        ?></table><?

    } else {
        echo 'Для отображения расходов нужно указать период';
    }
}

function get_expenses($dbh, $date_from, $date_to) {

    $sql = "SELECT ex.id, ex.ex_type, ex.holl_id, h.title_holl, ex.org_id, o.title_org, ex.coment,
        IF(ex.ex_type = 1, CONCAT('-', ex.amount), ex.amount) AS amount,
        IF(ex.ex_type = 1, 'Расход', 'Приход') AS ex_type_name,
        DATE_FORMAT(ex.create_date,'%d-%m-%Y') as create_date
        FROM jw_expenses ex
        LEFT JOIN jw_holls h ON h.id = ex.holl_id
        LEFT JOIN jw_orgs o ON o.id = ex.org_id
        WHERE";
    if(isset($_POST['holl_id'])) {
        $sql .= " ex.holl_id = :holl_id AND ";
    }
    if(isset($_POST['org_id'])) {
        $sql .= " ex.org_id = :org_id AND ";
    }
    if(isset($_POST['ex_type'])) {
        $sql .= " ex.ex_type = :ex_type AND ";
    }
    $sql .= " ex.create_date BETWEEN :date_from and :date_to ORDER BY ex.create_date DESC";

    $quer = $dbh->prepare($sql);
    if(isset($_POST['holl_id'])) {
        $quer->bindParam(':holl_id', $_POST['holl_id'], PDO::PARAM_INT);
    }
    if(isset($_POST['org_id'])) {
        $quer->bindParam(':org_id', $_POST['org_id'], PDO::PARAM_INT);
    }
    if(isset($_POST['ex_type'])) {
        $quer->bindParam(':ex_type', $_POST['ex_type'], PDO::PARAM_INT);
    }

    $quer->bindParam(':date_from', $date_from, PDO::PARAM_STR);
    $quer->bindParam(':date_to', $date_to, PDO::PARAM_STR);
    $quer->execute();
    $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}


function getById($id, $dbh){
    $sql = "SELECT ex.id, ex.ex_type, ex.holl_id, h.title_holl, ex.org_id, o.title_org, ex.coment,
            IF(ex.ex_type = 1, CONCAT('-', ex.amount), ex.amount) AS amount,
            IF(ex.ex_type = 1, 'Расход', 'Приход') AS ex_type_name,
            DATE_FORMAT(ex.create_date,'%d-%m-%Y') as create_date
            FROM jw_expenses ex
            LEFT JOIN jw_holls h ON h.id = ex.holl_id
            LEFT JOIN jw_orgs o ON o.id = ex.org_id
            WHERE ex.id = :id";
    $quer = $dbh->prepare($sql);
    $quer->bindParam(':id', $id, PDO::PARAM_INT);
    $quer->execute();
    $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
    $result['success'] = true;
    $result['data'] = $rows[0];
    $result['msg'] = '';
    echo json_encode($result);
}
