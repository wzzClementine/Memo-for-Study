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
$sql = "SELECT day FROM signD WHERE ID=$_GET[id]";
$result = $conn->query($sql);
 
if ($result->num_rows > 0) {
    // �������
    while($row = $result->fetch_assoc()) {
        echo $row["day"];
    }
} else {
    echo "0 ���";
}
$conn->close();
?>