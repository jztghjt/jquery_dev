<?php
$cb=$_GET['callback'];//getJSON('xxxx.com?callback=?') 中的callback
$array=array('aaa'=>'aaa','bbb'=>'bbb');
$result=json_encode($array);
echo($cb."(".$result.")");
exit();
?>
