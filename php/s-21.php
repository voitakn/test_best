<?php
include_once "conf.php";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
<title>Бланк S-21</title>
<style>
td, div, p{font:italic 12px Verdana;margin:0; padding:0;}
body{margin:0; padding:0;}
img, table{border:0;}
</style>
</head>

<body>
<div style="width: 1150px; margin: auto">
<?php
$usdata = array();
$otdata = array();
$trv = 0;

$years = array('11-12','12-13','13-14','14-15','15-16');
$js = json_decode($_GET['s_21']);
$period = $_GET['period'];
$cnt = count($js);
if($cnt > 1)
{
    for ($i=0; $i<$cnt; $i++)
    {
        $usda = $js[$i];
        $sql = "SELECT * FROM jw_sobr WHERE id = $usda";
        $quer = $dbh->prepare($sql);
        $quer->execute();
        $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
        $squs = $rows[0];
        ?>
        <div style="position: relative; float: left;  width:561px; height:387px; margin-bottom: 22px;">
        <img src="/images/s-21.png" border="0" style="position:absolute;  top: 7px" />
        <div style="position: relative;">
            <div style="position:absolute; top:44px; left:50px;"><?=$squs['fio']?></div>
        <?php
        if($squs['pol'] == "жен.") $pol_st = "top:40px; left:536px;";
        if($squs['pol'] == "муж.") $pol_st = "top:28px; left:536px;";
        ?>
        <img src="/images/v.jpg" style="position:absolute;<?=$pol_st?>" />

        <?php  if($squs['st'] == 1) {?>
            <img src="/images/v.jpg" style="position:absolute;top:100px; left:443px" /> <?php }
        if($squs['sp'] == 1) {?>
            <img src="/images/v.jpg" style="position:absolute;top:100px; left:487px" /> <?php }
        if($squs['op'] == 1) {?>
            <img src="/images/v.jpg" style="position:absolute;top:112px; left:443px" /> <?php } ?>

        <div style="position:absolute; top:60px; left:80px;"><?=$squs['adr']?></div>

        <div style="position:absolute; top:77px; left:75px;"><?=$squs['tel']?></div>

        <div style="position:absolute; top:77px; left:255px;"><?=$squs['mob']?></div>

        <div style="position:absolute; top:77px; left:470px;"><?=$squs['data_r']?></div>

        <div style="position:absolute; top:100px; left:95px;"><?=$squs['data_k']?></div>

        <div style="position:absolute; top:100px; left:385px;"><?=$squs['po_do']?></div>

        <div style="position:absolute; top:135px; left:20px;"><?=$period?></div>
        </div>
        <div style="font-size:13px; position: relative; margin-top: 152px; height: 207px">
            <?php
            $all_kni = 0;
            $all_bro = 0;
            $all_chas = 0;
            $all_jur = 0;
            $all_pov = 0;
            $all_izb = 0;
            $sql = "select * from jw_order where userid = ".$usda." && god = '".$period."' order by num_mes";
            $quer = $dbh->prepare($sql);
            $quer->execute();
            $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
            $tops = 0;
            $nmes = 1;
            $kmes = 1;
            //foreach($rows as $orot)
            for($a=0; $a<count($rows); $a++)
            {
                $orot = $rows[$a];
                $all_kni = ($orot['kni'] > 0) ? $all_kni + $orot['kni'] : $all_kni;
                $all_bro = ($orot['bro'] > 0) ? $all_bro + $orot['bro'] : $all_bro;
                $all_chas = ($orot['chas'] > 0) ? $all_chas + $orot['chas'] : $all_chas;
                $all_jur = ($orot['jur'] > 0) ? $all_jur + $orot['jur'] : $all_jur;
                $all_pov = ($orot['pov'] > 0) ? $all_pov + $orot['pov'] : $all_pov;
                $all_izb = ($orot['izb'] > 0) ? $all_izb + $orot['izb'] : $all_izb;
                if($nmes < $orot['num_mes'])
                {
                    $kmes = $orot['num_mes'] - $nmes;
                    $nmes += $kmes;
                    $tops += (16*$kmes);
                }
                ?>
                <div style="position: relative; top:<?=$tops?>px; left:70px; height: 16px;">
                    <div style="position:absolute;left:10px;font-size:11px;"><?php if($orot['kni'] > 0) echo $orot['kni']; ?></div>
                    <div style="position:absolute; left:60px;font-size:11px;"><?php if($orot['bro'] > 0) echo $orot['bro'];?></div>
                    <div style="position:absolute; left:100px;font-size:11px;"><?php if($orot['chas'] > 0) echo $orot['chas'];?></div>
                    <div style="position:absolute; left:145px;font-size:11px;"><?php if($orot['jur'] > 0) echo $orot['jur'];?></div>
                    <div style="position:absolute; left:190px;font-size:11px;"><?php if($orot['pov'] > 0) echo $orot['pov'];?></div>
                    <div style="position:absolute; left:240px;font-size:11px;"><?php if($orot['izb'] > 0) echo $orot['izb'];?></div>
                    <div style="position:absolute; left:290px;font-size:11px; width:150px;">
                        <?php echo $orot['prim']; if($orot['pp'] == 1) echo " (под.п.)";?></div>
                </div>
                <?php


                $nmes++;
                //$tops += 16;
                if($a == count($rows)-1) {
                    ?>
                    <div style="position:absolute; bottom: 0; left:70px; height: 15px;">
                        <div style="position:absolute;left:10px;font-size:11px;"><b><?=$all_kni?></b></div>
                        <div style="position:absolute; left:60px;font-size:11px;"><b><?=$all_bro?></b></div>
                        <div style="position:absolute; left:100px;font-size:11px;"><b><?=$all_chas?></b></div>
                        <div style="position:absolute; left:145px;font-size:11px;"><b><?=$all_jur?></b></div>
                        <div style="position:absolute; left:190px;font-size:11px;"><b><?=$all_pov?></b></div>
                        <div style="position:absolute; left:240px;font-size:11px;"><b><?=$all_izb?></b></div>
                        <div style="position:absolute; left:290px;font-size:11px; width:150px;"></div>
                    </div><?php
                }
            }
        ?> </div></div><?php

    }
}
else if($cnt == 1)
{
    $usda = $js[0];
    for($i=0; $i<5; $i++)
    {
        $sql = "SELECT * FROM jw_sobr WHERE id = $usda";
        $quer = $dbh->prepare($sql);
        $quer->execute();
        $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
        $squs = $rows[0];
        ?>
        <div style="position: relative; float: left;  width:561px; height:387px; margin-bottom: 22px;">
        <img src="/images/s-21.png" border="0" style="position:absolute;  top: 7px" />
        <div style="position: relative;">
            <div style="position:absolute; top:44px; left:50px;"><?=$squs['fio']?></div>
            <?php
            if($squs['pol'] == "жен.") $pol_st = "top:40px; left:536px;";
            if($squs['pol'] == "муж.") $pol_st = "top:28px; left:536px;";
            ?>
            <img src="/images/v.jpg" style="position:absolute;<?=$pol_st?>" />

            <?php  if($squs['st'] == 1) {?>
                <img src="/images/v.jpg" style="position:absolute;top:100px; left:443px" /> <?php }
            if($squs['sp'] == 1) {?>
                <img src="/images/v.jpg" style="position:absolute;top:100px; left:487px" /> <?php }
            if($squs['op'] == 1) {?>
                <img src="/images/v.jpg" style="position:absolute;top:112px; left:443px" /> <?php } ?>

            <div style="position:absolute; top:60px; left:80px;"><?=$squs['adr']?></div>

            <div style="position:absolute; top:77px; left:75px;"><?=$squs['tel']?></div>

            <div style="position:absolute; top:77px; left:255px;"><?=$squs['mob']?></div>

            <div style="position:absolute; top:77px; left:470px;"><?=$squs['data_r']?></div>

            <div style="position:absolute; top:100px; left:95px;"><?=$squs['data_k']?></div>

            <div style="position:absolute; top:100px; left:385px;"><?=$squs['po_do']?></div>

            <div style="position:absolute; top:135px; left:20px;"><?=$years[$i]?></div>
        </div>
        <div style="font-size:13px; position: relative; margin-top: 152px; height: 207px">
            <?php
            $all_kni = 0;
            $all_bro = 0;
            $all_chas = 0;
            $all_jur = 0;
            $all_pov = 0;
            $all_izb = 0;
            $sql = "select * from jw_order where userid = ".$usda." && god = '".$years[$i]."' order by num_mes";
            $quer = $dbh->prepare($sql);
            $quer->execute();
            $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
            $tops = 0;
            $nmes = 1;
            $kmes = 1;
            //foreach($rows as $orot)
            for($a=0; $a<count($rows); $a++)
            {
                $orot = $rows[$a];
                $all_kni = ($orot['kni'] > 0) ? $all_kni + $orot['kni'] : $all_kni;
                $all_bro = ($orot['bro'] > 0) ? $all_bro + $orot['bro'] : $all_bro;
                $all_chas = ($orot['chas'] > 0) ? $all_chas + $orot['chas'] : $all_chas;
                $all_jur = ($orot['jur'] > 0) ? $all_jur + $orot['jur'] : $all_jur;
                $all_pov = ($orot['pov'] > 0) ? $all_pov + $orot['pov'] : $all_pov;
                $all_izb = ($orot['izb'] > 0) ? $all_izb + $orot['izb'] : $all_izb;
                if($nmes < $orot['num_mes'])
                {
                    $kmes = $orot['num_mes'] - $nmes;
                    $nmes += $kmes;
                    $tops += (16*$kmes);
                }
                ?>
                <div style="position: relative;top:<?=$tops?>px; left:70px; height: 16px;">
                    <div style="position:absolute;left:10px;font-size:11px;"><?php if($orot['kni'] > 0) echo $orot['kni']; ?></div>
                    <div style="position:absolute; left:60px;font-size:11px;"><?php if($orot['bro'] > 0) echo $orot['bro'];?></div>
                    <div style="position:absolute; left:100px;font-size:11px;"><?php if($orot['chas'] > 0) echo $orot['chas'];?></div>
                    <div style="position:absolute; left:145px;font-size:11px;"><?php if($orot['jur'] > 0) echo $orot['jur'];?></div>
                    <div style="position:absolute; left:190px;font-size:11px;"><?php if($orot['pov'] > 0) echo $orot['pov'];?></div>
                    <div style="position:absolute; left:240px;font-size:11px;"><?php if($orot['izb'] > 0) echo $orot['izb'];?></div>
                    <div style="position:absolute; left:290px;font-size:11px; width:150px;">
                        <?php echo $orot['prim']; if($orot['pp'] == 1) echo " (под.п.)";?></div>
                </div>
                <?php


                $nmes++;
                if($a == count($rows)-1) {
                    ?>
                    <div style="position:absolute; bottom: 0; left:70px; height: 15px;">
                    <div style="position:absolute;left:10px;font-size:11px;"><b><?=$all_kni?></b></div>
                    <div style="position:absolute; left:60px;font-size:11px;"><b><?=$all_bro?></b></div>
                    <div style="position:absolute; left:100px;font-size:11px;"><b><?=$all_chas?></b></div>
                    <div style="position:absolute; left:145px;font-size:11px;"><b><?=$all_jur?></b></div>
                    <div style="position:absolute; left:190px;font-size:11px;"><b><?=$all_pov?></b></div>
                    <div style="position:absolute; left:240px;font-size:11px;"><b><?=$all_izb?></b></div>
                    <div style="position:absolute; left:290px;font-size:11px; width:150px;"></div>
                    </div><?php
                }
            }
            ?> </div></div><?php
    }
}
else
{
    if(isset($_GET['all']))
    {
        $year_cnt = count($years);
        $year = $years[$year_cnt-1];
        $sql = "SELECT * FROM jw_sobr WHERE arhive = 0 and pk = 0 ORDER BY fio";
        $quer = $dbh->prepare($sql);
        $quer->execute();
        $rows = $quer->fetchAll(PDO::FETCH_ASSOC);
        $trv = 0;
        foreach($rows as $squs)
        {
            ?><td width="551" style="position:relative; width:551px; height:370px; vertical-align:top;">
            <img src="/images/s-21.png" border="0" style="" width="561" height="350" />
            <div style="position:absolute; top:34px; left:50px;"><?=$squs['fio']?></div>
            <?php

            $usda = $squs['id'];
            if($squs['pol'] == "жен.") $pol_st = "top:30px; left:536px;";
            if($squs['pol'] == "муж.") $pol_st = "top:20px; left:536px;";
            ?>
            <img src="/images/v.jpg" style="position:absolute;<?=$pol_st?>" />

            <?php  if($squs['st'] == 1) {?>
                <img src="/images/v.jpg" style="position:absolute;top:83px; left:443px" /> <?php }
            if($squs['sp'] == 1) {?>
                <img src="/images/v.jpg" style="position:absolute;top:83px; left:487px" /> <?php }
            if($squs['op'] == 1) {?>
                <img src="/images/v.jpg" style="position:absolute;top:95px; left:443px" /> <?php } ?>

            <div style="position:absolute; top:49px; left:80px;"><?=$squs['adr']?></div>

            <div style="position:absolute; top:65px; left:75px;"><?=$squs['tel']?></div>

            <div style="position:absolute; top:65px; left:255px;"><?=$squs['mob']?></div>

            <div style="position:absolute; top:65px; left:470px;"><?=$squs['data_r']?></div>

            <div style="position:absolute; top:86px; left:95px;"><?=$squs['data_k']?></div>

            <div style="position:absolute; top:86px; left:380px;"><?=$squs['po_do']?></div>

            <div style="position:absolute; top:115px; left:20px;"><?=$year?></div>
            <div style="font-size:13px;">
                <?php
                $sql_o = "SELECT * FROM jw_order WHERE userid = :userid and god = :god  ORDER BY num_mes";
                $quer_o = $dbh->prepare($sql_o);
                $quer_o->bindParam(':userid', $usda, PDO::PARAM_INT);
                $quer_o->bindParam(':god', $year, PDO::PARAM_STR);
                $quer_o->execute();
                $rows_o = $quer_o->fetchAll(PDO::FETCH_ASSOC);
                $tops = 129;
                $nmes = 1;
                $kmes = 1;
                $all_kni = 0;
                $all_bro = 0;
                $all_chas = 0;
                $all_jur = 0;
                $all_pov = 0;
                $all_izb = 0;

                foreach($rows_o as $orot)
                {
                    if($nmes < $orot['num_mes'])
                    {
                        $kmes = $orot['num_mes'] - $nmes;
                        $nmes += $kmes;
                        $tops += (14.5*$kmes);
                    }
                    ?>
                    <div style="position:absolute; top:<?=$tops?>px; left:70px; height: 15px;">
                        <div style="position:absolute;left:10px;font-size:11px;"><?php if($orot['kni'] > 0) echo $orot['kni']; ?></div>
                        <div style="position:absolute; left:60px;font-size:11px;"><?php if($orot['bro'] > 0) echo $orot['bro'];?></div>
                        <div style="position:absolute; left:100px;font-size:11px;"><?php if($orot['chas'] > 0) echo $orot['chas'];?></div>
                        <div style="position:absolute; left:145px;font-size:11px;"><?php if($orot['jur'] > 0) echo $orot['jur'];?></div>
                        <div style="position:absolute; left:190px;font-size:11px;"><?php if($orot['pov'] > 0) echo $orot['pov'];?></div>
                        <div style="position:absolute; left:240px;font-size:11px;"><?php if($orot['izb'] > 0) echo $orot['izb'];?></div>
                        <div style="position:absolute; left:290px;font-size:11px; width:150px;">

                            <?php echo $orot['prim']; if($orot['pp'] == 1) echo " (под.п.)";?></div>
                    </div>
                    <?php
                    $all_kni += $orot['kni'];
                    $all_bro += $orot['bro'];
                    $all_chas += $orot['chas'];
                    $all_jur += $orot['jur'];
                    $all_pov += $orot['pov'];
                    $all_izb += $orot['izb'];

                    $nmes++;
                    $tops += 14.5;
                }
                ?>
                <div style="position:absolute; bottom: 53px; left:70px; height: 15px;">
                    <div style="position:absolute;left:10px;font-size:11px;"><b><?php  echo $all_kni; ?></b></div>
                    <div style="position:absolute; left:60px;font-size:11px;"><b><?php  echo $all_bro;?></b></div>
                    <div style="position:absolute; left:100px;font-size:11px;"><b><?php  echo $all_chas;?></b></div>
                    <div style="position:absolute; left:145px;font-size:11px;"><b><?php echo $all_jur;?></b></div>
                    <div style="position:absolute; left:190px;font-size:11px;"><b><?php  echo $all_pov;?></b></div>
                    <div style="position:absolute; left:240px;font-size:11px;"><b><?php  echo $all_izb;?></b></div>
                    <div style="position:absolute; left:290px;font-size:11px; width:150px;"></div>
                    <?php
                    ?>
                </div></td><?php
            if($trv == 1) {
                echo "</tr><tr>";
                $trv = 0;
            }
            else
            {
                $trv++;
            }
        }
    }
}

?>
</div>
<!--
</tr>
</table>-->
</body>
</html>