<?php
// 允许跨域请求
header('Access-Control-Allow-Origin:*');
// 发送请求的函数
function http_request_json($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);//https的URL需要用到
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);//https的URL需要用到
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result[1] = curl_exec($ch);
    $result[0]= curl_getinfo($ch,CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $result;
}
// 获取响应到的数据
$text = $_GET['text'];
// 拼接为发送请求的URL
$req_url = "http://api.qingyunke.com/api.php?key=free&appid=0&msg=".$text;
// 接收响应的数据
$ret = http_request_json($req_url);
// 响应给调用者
echo $ret[1];
?>
