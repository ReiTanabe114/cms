<?php
  // Database configuration
  $db_host = 'localhost';
  $db_user = 'root';
  $db_pass = '';
  $db_name = 'school_cms';
  
  // Create database connection
  $conn = new mysqli($db_host, $db_user, $db_pass);
  
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  
  // Create database if it doesn't exist
  $sql = "CREATE DATABASE IF NOT EXISTS $db_name";
  if ($conn->query($sql) === TRUE) {
    echo "<p>Database created successfully or already exists.</p>";
  } else {
    echo "<p>Error creating database: " . $conn->error . "</p>";
  }
  
  // Select the database
  $conn->select_db($db_name);
  
  // Create tables
  $tables = array();
  
  // Landing page elements table
  $tables[] = "CREATE TABLE IF NOT EXISTS landing_page_elements (
    id INT(11) NOT NULL AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    position INT(11) NOT NULL,
    PRIMARY KEY (id)
  )";
  
  // Announcements table
  $tables[] = "CREATE TABLE IF NOT EXISTS announcements (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    is_pinned TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
  )";
  
  // Faculty table
  $tables[] = "CREATE TABLE IF NOT EXISTS faculty (
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
  
  // Contact info table
  $tables[] = "CREATE TABLE IF NOT EXISTS contact_info (
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
  
  // Social media table
  $tables[] = "CREATE TABLE IF NOT EXISTS social_media (
    id INT(11) NOT NULL AUTO_INCREMENT,
    platform VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  )";
  
  // Global settings table
  $tables[] = "CREATE TABLE IF NOT EXISTS global_settings (
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
  
  // Create each table
  $success = true;
  foreach ($tables as $sql) {
    if ($conn->query($sql) !== TRUE) {
      echo "<p>Error creating table: " . $conn->error . "</p>";
      $success = false;
    }
  }
  
  if ($success) {
    echo "<p>All tables created successfully.</p>";
  }
  
  // Insert default data
  $default_data = array();
  
  // Default global settings
  $default_data[] = "INSERT INTO global_settings (primary_color, secondary_color, accent_color, background_color, text_color) 
    SELECT '#3b82f6', '#10b981', '#f59e0b', '#ffffff', '#1f2937' 
    FROM dual 
    WHERE NOT EXISTS (SELECT 1 FROM global_settings LIMIT 1)";
  
  // Default contact info
  $default_data[] = "INSERT INTO contact_info (address, city, state, zip_code, main_phone, alternate_phone, fax, email, website) 
    SELECT '123 School Street', 'Anytown', 'State', '12345', '(555) 123-4567', '', '', 'info@schoolname.edu', 'www.schoolname.edu' 
    FROM dual 
    WHERE NOT EXISTS (SELECT 1 FROM contact_info LIMIT 1)";
  
  // Insert default data
  $data_success = true;
  foreach ($default_data as $sql) {
    if ($conn->query($sql) !== TRUE) {
      echo "<p>Error inserting default data: " . $conn->error . "</p>";
      $data_success = false;
    }
  }
  
  if ($data_success) {
    echo "<p>Default data inserted successfully.</p>";
  }
  
  // Close connection
  $conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>School CMS Installation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #3b82f6;
    }
    .success {
      color: #10b981;
      font-weight: bold;
    }
    .error {
      color: #ef4444;
      font-weight: bold;
    }
    .instructions {
      background-color: #f3f4f6;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>School Website CMS Installation</h1>
  
  <div class="instructions">
    <h2>Next Steps:</h2>
    <ol>
      <li>Make sure your XAMPP server is running (Apache and MySQL).</li>
      <li>If you encountered any errors above, please fix them before continuing.</li>
      <li>Delete this file (install.php) for security reasons.</li>
      <li>Navigate to <a href="index.php">index.php</a> to start using your CMS.</li>
    </ol>
    
    <h3>Important Notes:</h3>
    <ul>
      <li>This CMS does not require user accounts and will automatically save your changes to the database.</li>
      <li>All data is stored in the MySQL database named 'school_cms'.</li>
      <li>If you need to reset your CMS, you can drop the database and run this installation script again.</li>
    </ul>
  </div>
</body>
</html>