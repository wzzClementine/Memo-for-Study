<?php

$con = mysql_connect("w.rdc.sae.sina.com.cn:3306","15oojm55k2","31303jzzm2yz421wwmmzyihjlx022wwkij0x2yzk");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("app_mugic", $con);
if($_POST[sign]==0){
	mysql_query("UPDATE taskRecord SET sign=1
    WHERE tID = $_POST[id]");
}else{
	mysql_query("UPDATE taskRecord SET sign=0
    WHERE tID = $_POST[id]");
}




mysql_close($con);
?>