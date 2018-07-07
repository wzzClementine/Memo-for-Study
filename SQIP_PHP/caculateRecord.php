<?php

$con = mysql_connect("w.rdc.sae.sina.com.cn:3306","15oojm55k2","31303jzzm2yz421wwmmzyihjlx022wwkij0x2yzk");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("app_mugic", $con);

mysql_query("UPDATE SQIP_User SET record=$_POST[record]
WHERE ID=$_POST[id]");



mysql_close($con);
?>