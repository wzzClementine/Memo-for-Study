<?php
$servername = "w.rdc.sae.sina.com.cn:3306";
$username = "15oojm55k2";
$password = "31303jzzm2yz421wwmmzyihjlx022wwkij0x2yzk";
$dbname = "app_mugic";
 
// ��������
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("����ʧ��: " . $conn->connect_error);
} 
mysql_query('set names utf8');
$sql = "SELECT tID,ID,content,sign FROM taskRecord WHERE ID=$_GET[id]";
$result = $conn->query($sql);
$taskList=array();
if ($result->num_rows > 0) {
    // �������
    while($row = $result->fetch_assoc()) {		
       $taskList[] = $row;
    }
	$json=json_encode($taskList);
	echo urldecode($json);
} else {
    echo "0 ���";xmj
}
$conn->close();
?>