<?php

include "conf.php";
if(isset($_REQUEST['login']) && isset($_REQUEST['passw']))
{
    $quer = $dbh->prepare("SELECT id, login, suname, is_buh, is_sobr FROM jw_users WHERE login = :login and passw = :passw");
    $quer->bindParam(':login', $_REQUEST['login'], PDO::PARAM_STR);
    $quer->bindParam(':passw', sha1($_REQUEST['passw']), PDO::PARAM_STR);
    $quer->execute();

    $row = $quer->fetch(PDO::FETCH_ASSOC);
    $_SESSION['user'] = $row;
    ifAutorise();
}
function ifAutorise()
{
    if($_SESSION['user']['id'] > 0)
    {
        $user = json_encode($_SESSION['user']);
        echo '{"success": true, "data": '.$user.', "msg": ""}';
    }
    else
    {
        echo '{"success": false, "data": [], "msg": ""}';
    }
}
if(isset($_REQUEST['get_status']))
{
    ifAutorise();
}
if(isset($_REQUEST['logout']))
{
    unset($_SESSION['user']);
    ifAutorise();
}