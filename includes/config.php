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
  
  // Create tables if they don't exist
  function createTablesIfNotExist() {
    global $conn;
    
    // Landing page elements table
    $sql = "CREATE TABLE IF NOT EXISTS landing_page_elements (
      id INT(11) NOT NULL AUTO_INCREMENT,
      type VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      position INT(11) NOT NULL,
      PRIMARY KEY (id)
    )";
    $conn->query($sql);
    
    // Announcements table
    $sql = "CREATE TABLE IF NOT EXISTS announcements (
      id INT(11) NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      date DATE NOT NULL,
      is_pinned TINYINT(1) NOT NULL DEFAULT 0,
      PRIMARY KEY (id)
    )";
    $conn->query($sql);
    
    // Faculty table
    $sql = "CREATE TABLE IF NOT EXISTS faculty (
      id INT(11) NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      department VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      bio TEXT NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )";
    $conn->query($sql);
    
    // Contact info table
    $sql = "CREATE TABLE IF NOT EXISTS contact_info (
      id INT(11) NOT NULL AUTO_INCREMENT,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      zip_code VARCHAR(20) NOT NULL,
      main_phone VARCHAR(50) NOT NULL,
      alternate_phone VARCHAR(50) NOT NULL,
      fax VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      website VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )";
    $conn->query($sql);
    
    // Social media table
    $sql = "CREATE TABLE IF NOT EXISTS social_media (
      id INT(11) NOT NULL AUTO_INCREMENT,
      platform VARCHAR(100) NOT NULL,
      url VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )";
    $conn->query($sql);
    
    // Global settings table
    $sql = "CREATE TABLE IF NOT EXISTS global_settings (
      id INT(11) NOT NULL AUTO_INCREMENT,
      primary_color VARCHAR(20) NOT NULL DEFAULT '#3b82f6',
      secondary_color VARCHAR(20) NOT NULL DEFAULT '#10b981',
      accent_color VARCHAR(20) NOT NULL DEFAULT '#f59e0b',
      background_color VARCHAR(20) NOT NULL DEFAULT '#ffffff',
      text_color VARCHAR(20) NOT NULL DEFAULT '#1f2937',
      heading_font VARCHAR(50) NOT NULL DEFAULT 'Arial',
      body_font VARCHAR(50) NOT NULL DEFAULT 'Arial',
      heading_size INT(11) NOT NULL DEFAULT 24,
      body_size INT(11) NOT NULL DEFAULT 16,
      container_width INT(11) NOT NULL DEFAULT 1200,
      spacing INT(11) NOT NULL DEFAULT 16,
      rounded_corners TINYINT(1) NOT NULL DEFAULT 1,
      use_shadows TINYINT(1) NOT NULL DEFAULT 1,
      PRIMARY KEY (id)
    )";
    $conn->query($sql);
    
    // Insert default global settings if not exists
    $result = $conn->query("SELECT id FROM global_settings LIMIT 1");
    if ($result->num_rows == 0) {
      $conn->query("INSERT INTO global_settings (primary_color, secondary_color, accent_color, background_color, text_color) VALUES ('#3b82f6', '#10b981', '#f59e0b', '#ffffff', '#1f2937')");
    }
    
    // Insert default contact info if not exists
    $result = $conn->query("SELECT id FROM contact_info LIMIT 1");
    if ($result->num_rows == 0) {
      $conn->query("INSERT INTO contact_info (address, city, state, zip_code, main_phone, alternate_phone, fax, email, website) VALUES ('123 School Street', 'Anytown', 'State', '12345', '(555) 123-4567', '', '', 'info@schoolname.edu', 'www.schoolname.edu')");
    }
  }
  
  // Create tables when the file is included
  createTablesIfNotExist();
?>