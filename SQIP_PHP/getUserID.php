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
$name=$_GET[nickName];
$sql = "SELECT * FROM SQIP_User WHERE find_in_set('$_GET[nickName]',nickName); ";
$result = $conn->query($sql);
 
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        echo $row["ID"];
		
    }
} else {
	$res=0;
    echo 0;
}
$conn->close();
?>