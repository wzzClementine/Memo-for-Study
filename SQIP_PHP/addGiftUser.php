<?php

$con = mysql_connect("w.rdc.sae.sina.com.cn:3306","15oojm55k2","31303jzzm2yz421wwmmzyihjlx022wwkij0x2yzk");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("app_mugic", $con);


mysql_query("UPDATE giftList SET user=concat(user,';$_POST[uid]') WHERE ID=$_POST[id]");

mysql_query('set names utf8');
 
echo $_POST[uid];

mysql_close($con);
?>