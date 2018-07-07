<?php

$con = mysql_connect("w.rdc.sae.sina.com.cn:3306","15oojm55k2","31303jzzm2yz421wwmmzyihjlx022wwkij0x2yzk");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("app_mugic", $con);

$mysql = 'select nickName from SQIP_User where name="$_POST[nickName]"';



$sql="INSERT INTO SQIP_User (nickName, gender, record)
       VALUES
  ('$_POST[nickName]','$_POST[gender]','$_POST[record]')";
   mysql_query('set names utf8');
   if (!mysql_query($sql,$con))
   {
      die('Error: ' . mysql_error());
    }

mysql_close($con);
?>