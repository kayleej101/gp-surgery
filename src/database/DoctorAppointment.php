<?php

//connecting to database
$host = "localhost";
$username = "";
$password = "";
$dbname = "gpwebsite";
$connection = mysqli_connect($host, $username, $password, $dbname);

//adding notes to appointment
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $appointmentNumber = $_POST["appointmentNumber"];
  $notes = $_POST["appointmentNotes"];

  //updating notes
  $query = "UPDATE appointments SET appointmentNotes = ? WHERE appointmentNumber = ?";
  $statement = mysqli_prepare($connection, $query);
  mysqli_stmt_bind_param($statement, "si", $notes, $appointmentNumber);
  mysqli_stmt_execute($statement);

  //checking if the query executed successfully
  if (mysqli_affected_rows($connection) > 0) {
    echo "Notes added successfully";
  } else {
    echo "Error: " . mysqli_error($connection);
  }

  //closing the prepared statement
  mysqli_stmt_close($statement);
}

//closing the database connection
mysqli_close($connection);

?>