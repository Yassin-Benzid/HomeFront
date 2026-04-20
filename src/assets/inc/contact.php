<?php
/*
 *  CONFIGURE EVERYTHING HERE
 */

// an email address that will be in the From field of the email.
$from = 'Homy <noreply@homy.com>';

// an email address that will receive the email with the output of the form
$sendTo = 'Support Homy <support@homy.com>'; // Update with your support address

// subject of the email
$subject = 'Nouvelle demande — Homy (réservations / location / tourisme)';

// form field names and their translations.
// array variable name => Text to appear in the email
$fields = array(
    'nom' => 'Nom',
    'prenom' => 'Prénom',
    'telephone' => 'Téléphone',
    'email' => 'E-mail',
    'inquiryType' => 'Type de demande',
    'destination' => 'Destination',
    'startDate' => 'Date de début',
    'endDate' => 'Date de fin',
    'guests' => 'Nombre de personnes',
    'carType' => 'Type de véhicule',
    'message' => 'Message'
);

// message that will be displayed when everything is OK :)
$okMessage = 'Merci ! Votre demande a bien été reçue. Notre équipe vous contactera sous 24 heures.';

// If something goes wrong, we will display this message.
$errorMessage = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ultérieurement.';

/*
 *  LET'S DO THE SENDING
 */

// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL & ~E_NOTICE);

try
{

    if(count($_POST) == 0) throw new \Exception('Form is empty');
            
    $emailText = "Nouveau message depuis le site Homy (réservations / tourisme)\n=============================\n";

    foreach ($_POST as $key => $value) {
        // If the field exists in the $fields array, include it in the email 
        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    // All the neccessary headers for the email.
    $headers = array('Content-Type: text/plain; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
    );
    
    // Send email
    mail($sendTo, $subject, $emailText, implode("\n", $headers));

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}


// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
// else just display the message
else {
    echo $responseArray['message'];
}
