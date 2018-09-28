<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

$message = [];
$output = [
    'success' => null,
    'messages' => []
];

$message['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
if(empty($message['name'])){
    $output['success'] = false;
    $output['messages'][] = 'missing name key';
}
$message['email'] = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
if(empty($message['email'])){
    $output['success'] = false;
    $output['messages'][] = 'invalid email key';
}
$message['message'] = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
if(empty($message['message'])){
    $output['success'] = false;
    $output['messages'][] = 'missing message key';
}
// $message['subject'] = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
// if(empty($message['message'])){
//     $output['success'] = false;
//     $output['messages'][] = 'missing subject key';
// }
// $message['phone'] = preg_replace('/[^0-9]/','', $_POST['phone_number']);
// if(empty($message['phone']) && count ($message['phone']) >= 10 && count($message['phone'])<=11){
//     $output['success'] = false;
//     $output['messages'][] = 'missing phone';
// }

// foreach($_POST as $key=>$value){
// 	$_POST[$key] = htmlentities( addslashes( $value ));
// }

if($output['success'] !== null){
    http_response_code(422);
    echo json_encode($output);
    exit();
}

// set up email object
$mail = new PHPMailer;
$mail->SMTPDebug = 0;           // Enable verbose debug output. Change to 0 to disable debugging output.

$mail->isSMTP();                // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;         // Enable SMTP authentication


$mail->Username = EMAIL_USER;   // SMTP username
$mail->Password = EMAIL_PASS;   // SMTP password
$mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;              // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = 'kevincodes3212@gmail.com';  // sender's email address (shows in "From" field)
$mail->FromName = 'Kevin';   // sender's name (shows in "From" field)
$mail->addAddress('kevin.young3212@gmail.com', 'Coding Yoda');  // Add a recipient
//$mail->addAddress('ellen@example.com');                        // Name is optional
$mail->addReplyTo($_POST['email']);                          // Add a reply-to address
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML
//Only neccesary is no subject provided
$message['subject'] = $message['name']. "has sent you a message on your portfolio";
$message['subject'] = substr($message['message'], 0, 78);
$mail->Subject = 'mailer message from '.$_POST['name'];
$mail->Body    = "
	time: ".date('Y-m-d H:is:s')."<br>
	from: {$_SERVER['REMOTE_ADDR']}<br>
	name: {$_POST['name']}<br>
	email: {$_POST['email']}<br>
	subject: {$message['subject']}<br>
	message: {$_POST['body']}
";
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

// if(!$mail->send()) {
//     echo 'Message could not be sent.';
//     echo 'Mailer Error: ' . $mail->ErrorInfo;
// } else {
//     echo 'Message has been sent';
// }

if(!$mail->send()) {
    $output['success']=false;
    $output['messages'][] = $mail ->ErrorInfo;
} else {
    $output['success']=true;
}
echo json_encode($output);
?>