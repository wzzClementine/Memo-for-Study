<?php

$con = mysql_connect("w.rdc.sae.sina.com.cn:3306","15oojm55k2","31303jzzm2yz421wwmmzyihjlx022wwkij0x2yzk");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("app_mugic", $con);

$query_num = 6; //可写入的次数,修改该值来决定写入次数。
for($i=1;$i<=$query_num;$i++){
 mysql_query("insert into taskRecord (ID,content,sign) values ($_POST[id],'',0)");
}
mysql_query('set names utf8');
 
echo "success!";



mysql_close($con);
?>