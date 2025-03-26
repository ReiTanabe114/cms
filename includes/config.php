<?php
  // Database configuration
  $db_host = 'localhost';
  $db_user = 'root';
  $db_pass = '';
  $db_name = 'school_cms';
  
  // Create database connection
  $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
  
  // Check connection
  if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  
  // Set character set
  $conn->set_charset("utf8mb4");
  
  // Website configuration
  define('SITE_NAME', 'School Website CMS');
  define('SITE_URL', 'http://localhost/school-cms');
  
  // Error reporting
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
?>