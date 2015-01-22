<?php
$amount = urlencode($_POST['amount']);
  $from = urlencode($_POST['from']);
  $to = urlencode($_POST['to']);
  $get = file_get_contents("https://www.google.com/finance/converter?a=$amount&from=$from&to=$to");
  $get = explode("<span class=bld>",$get);
  $get = explode("</span>",$get[1]);  
  $converted_amount = preg_replace("/[^0-9\.]/", null, $get[0]);
echo $converted_amount;
?>
