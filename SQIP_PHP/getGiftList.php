<?php
$servername = "w.rdc.sae.sina.com.cn:3306";
$username = "15oojm55k2";
$password = "31303jzzm2yz421wwmmzyihjlx022wwkij0x2yzk";
$dbname = "app_mugic";
 
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
mysql_query('set names utf8');
$sql = "SELECT ID,name,amount,path,record FROM giftList";
$result = $conn->query($sql);
$giftList=array();
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {		
       $giftList[] = $row;
    }
	$json=json_encode($giftList);
	echo urldecode($json);
} else {
    echo "0 结果";
}
$conn->close();
?>