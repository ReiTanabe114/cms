<?php
  session_start();
  include 'includes/config.php';
  include 'includes/functions.php';
  
  $error = '';
  
  // Check if user is already logged in
  if(isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
  }
  
  // Process login form
  if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Validate input
    if(empty($username) || empty($password)) {
      $error = "Please enter both username and password";
    } else {
      // Check credentials against database
      $sql = "SELECT id, username, password FROM users WHERE username = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("s", $username);
      $stmt->execute();
      $result = $stmt->get_result();
      
      if($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if(password_verify($password, $user['password'])) {
          // Set session variables
          $_SESSION['user_id'] = $user['id'];
          $_SESSION['username'] = $user['username'];
          
          // Redirect to dashboard
          header("Location: index.php");
          exit();
        } else {
          $error = "Invalid username or password";
        }
      } else {
        $error = "Invalid username or password";
      }
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - School Website CMS</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo">S</div>
        <h1>School Website CMS</h1>
      </div>
      
      <?php if(!empty($error)): ?>
        <div class="alert alert-error">
          <?php echo $error; ?>
        </div>
      <?php endif; ?>
      
      <form method="POST" action="login.php" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
        </div>
        
        <button type="submit" class="btn btn-primary btn-block">Login</button>
      </form>
      
      <div class="login-footer">
        <p>Don't have an account? Contact your administrator.</p>
      </div>
    </div>
  </div>
</body>
</html>