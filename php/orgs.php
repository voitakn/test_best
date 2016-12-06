<?php
include "conf.php";

if(isset($_REQUEST['get_list']))
{
    if(isset($_REQUEST['holls']))
    {
        $quer = $dbh->prepare('SELECT DISTINCT(og.id), og.title_org, og.adres, og.phone, og.worker
        FROM jw_orgs og left join jw_org_holls oh ON oh.org_id = og.id WHERE oh.holl_id IN '.$_REQUEST['holls']);
    }
    else
    {
        $quer = $dbh->prepare("SELECT * FROM jw_orgs");
    }
    $quer->execute();
    $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
    $rows_json = array();
    foreach($rows as $row)
    {
        $row['holl_id'] = array();
        $row['holls'] = '';
        $quer2 = $dbh->prepare("SELECT ho.* FROM jw_org_holls oho left join jw_holls ho ON ho.id = oho.holl_id where oho.org_id = :org_id");
        $quer2->bindParam(':org_id', $row['id'], PDO::PARAM_INT);
        $quer2->execute();
        $rows_holls = $quer2->fetchAll(PDO::FETCH_ASSOC);
        if(count($rows_holls) > 0)
        {
            foreach($rows_holls as $rh)
            {
                $row['holl_id'][] = $rh['id'];
                $row['holls'] .= '['.$rh['title_holl'].'] ';
            }
        }
        $rows_json[] = $row;

    }
    $result['success'] = true;
    $result['data'] = $rows_json;
    $result['msg'] = '';
    echo json_encode($result);
}
if(isset($_REQUEST['get_by_holl']))
{
    if($_REQUEST['get_by_holl'] > 0)
    {
        $quer = $dbh->prepare("SELECT jw_orgs.*
            FROM  jw_org_holls left join jw_orgs
            ON jw_org_holls.org_id = jw_orgs.id
            WHERE jw_org_holls.holl_id = :holl_id");
        $quer->bindParam(':holl_id', $_REQUEST['get_by_holl'], PDO::PARAM_INT);
        $quer->execute();
        $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
        $result['success'] = true;
        $result['data'] = $rows;
        $result['msg'] = '';
        echo json_encode($result);
    }
}
//holl_id
if(isset($_REQUEST['get_holls']))
{
    if($_REQUEST['get_holls'] > 0)
    {
        $quer = $dbh->prepare("SELECT jw_holls.*
            FROM  jw_org_holls left join jw_holls
            ON jw_org_holls.holl_id = jw_holls.id
            WHERE jw_org_holls.org_id = :org_id");
        $quer->bindParam(':org_id', $_REQUEST['get_holls'], PDO::PARAM_INT);
        $quer->execute();
        $rows = $quer->fetchAll(PDO::FETCH_ASSOC);

        $result['success'] = true;
        $result['data'] = $rows;
        $result['msg'] = '';
        echo json_encode($result);
    }
}

if(isset($_REQUEST['edit']))
{
    if(!isset($_REQUEST['title_org']))
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
    }
    else
    {
        $_POST = $_REQUEST;
    }
    $id = 0;
    if(isset($_POST['id']) && $_POST['id'] > 0)
    {
        $id = $_POST['id'];
        $sql = "update jw_orgs set
            title_org = :title_org,
            adres = :adres,
            phone = :phone,
            worker = :worker
            where id = :id";
        $quer = $dbh->prepare($sql);
        $quer->bindParam(':id', $_POST['id'], PDO::PARAM_INT);
    }
    else
    {
        $sql = "insert into jw_orgs (title_org, adres, phone, worker)
                values (:title_org, :adres, :phone, :worker)";
        $quer = $dbh->prepare($sql);
    }
    $quer->bindParam(':title_org', $_POST['title_org'], PDO::PARAM_STR);
    $quer->bindParam(':adres', $_POST['adres'], PDO::PARAM_STR);
    $quer->bindParam(':phone', $_POST['phone'], PDO::PARAM_STR);
    $quer->bindParam(':worker', $_POST['worker'], PDO::PARAM_STR);
    $quer->execute();
    if($id == 0)
    {
        $_POST['id'] = $dbh->lastInsertId();
    }
    if(isset($_POST['holl_id']))
    {
        $sql = "delete from jw_org_holls where org_id = :org_id";
        $quer = $dbh->prepare($sql);
        $quer->bindParam(':org_id', $_POST['id'], PDO::PARAM_INT);
        $quer->execute();
        if(isset($_POST['holl_id'])) {
            $sql = "insert into jw_org_holls (org_id,  holl_id) values (:org_id, :holl_id)";
            if(gettype($_POST['holl_id']) == "array") {
                foreach($_POST['holl_id'] as $hid)
                {
                    $quer = $dbh->prepare($sql);
                    $quer->bindParam(':org_id', $_POST['id'], PDO::PARAM_INT);
                    $quer->bindParam(':holl_id', $hid, PDO::PARAM_INT);
                    $quer->execute();
                }
            } else if(gettype($_POST['holl_id']) == "string" && $_POST['holl_id'] != "")
            {
                $quer = $dbh->prepare($sql);
                $quer->bindParam(':org_id', $_POST['id'], PDO::PARAM_INT);
                $quer->bindParam(':holl_id', $_POST['holl_id'], PDO::PARAM_INT);
                $quer->execute();
            }
        }
    }
    $result = $_POST;

    $result['holls'] = '';
    $result['holl_id'] = array();
    $quer2 = $dbh->prepare("SELECT ho.* FROM jw_org_holls oho left join jw_holls ho ON ho.id = oho.holl_id where oho.org_id = :org_id");
    $quer2->bindParam(':org_id', $_POST['id'], PDO::PARAM_INT);
    $quer2->execute();
    $rows_holls = $quer2->fetchAll(PDO::FETCH_ASSOC);
    if(count($rows_holls) > 0)
    {
        foreach($rows_holls as $rh)
        {
            $result['holl_id'][] = $rh['id'];
            $result['holls'] .= '['.$rh['title_holl'].'] ';
        }
    }

    $result['success'] = true;
    $result['data'] = $result;
    $result['msg'] = '';
    echo json_encode($result);
}
if(isset($_REQUEST['org_to_holl']))
{
    /*
     * CREATE TABLE `jw_org_holls` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `org_id` int(11) DEFAULT NULL,
     `holl_id` int(11) DEFAULT NULL,
     */
    $id = 0;
    if(!isset($_REQUEST['org_id']))
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
    }
    else
    {
        $_POST = $_REQUEST;
    }
    if($_POST['id'] > 0)
    {
        $quer = $dbh->prepare("update jw_org_holls set org_id=:org_id, holl_id=:holl_id where id=:id");
        $quer->bindParam(':id', $_REQUEST['id'], PDO::PARAM_INT);
        $id = $_POST['id'];
    }
    else
    {
        $quer = $dbh->prepare("insert into jw_org_holls (org_id, holl_id) values (:org_id, :holl_id)");
    }

    $quer->bindParam(':org_id', $_REQUEST['org_id'], PDO::PARAM_INT);
    $quer->bindParam(':holl_id', $_REQUEST['holl_id'], PDO::PARAM_INT);
    $quer->execute();
    if($id == 0)
    {
        $_POST['id'] = $dbh->lastInsertId();
    }
    if($_POST['id'] > 0)
    {
        $result['success'] = true;
        $result['data'] = $_POST;
        $result['msg'] = '';
    }
    else
    {
        $result['success'] = false;
        $result['data'] = array();
        $result['msg'] = 'Ошибка при добавлении организации к залу.';
    }

    echo json_encode($result);
}