<?php

$con = mysql_connect("w.rdc.sae.sina.com.cn:3306","15oojm55k2","31303jzzm2yz421wwmmzyihjlx022wwkij0x2yzk");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("app_mugic", $con);

$sql="UPDATE taskRecord SET content='$_POST[task]'
    WHERE tID = $_POST[id]";
mysql_query('set names utf8');
if (!mysql_query($sql,$con))
 {
      die('Error: ' . mysql_error());
 }




mysql_close($con);
?>