<?php
  session_start();
  include 'includes/config.php';
  include 'includes/functions.php';
  
  // Check if user is logged in
  if(!isset($_SESSION['user_id']) && basename($_SERVER['PHP_SELF']) != 'login.php') {
    header("Location: login.php");
    exit();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>School Website CMS</title>
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/script.js" defer></script>
</head>
<body>
  <div class="app-container">
    <?php if(isset($_SESSION['user_id'])): ?>
      <!-- Header -->
      <header class="header">
        <div class="logo-container">
          <div class="logo">S</div>
          <h1>School Website Builder</h1>
        </div>
        <div class="header-actions">
          <button class="btn btn-outline" onclick="saveChanges()">
            <span class="icon">💾</span>
            <span>Save</span>
          </button>
          <button class="btn btn-outline" onclick="previewWebsite()">
            <span class="icon">👁️</span>
            <span>Preview</span>
          </button>
          <button class="btn btn-primary" onclick="publishWebsite()">
            <span class="icon">📤</span>
            <span>Publish</span>
          </button>
          <div class="user-menu">
            <button class="btn btn-user" onclick="toggleUserMenu()">
              <div class="user-avatar">
                <span class="icon">👤</span>
              </div>
              <span><?php echo $_SESSION['username']; ?></span>
            </button>
            <div class="dropdown-menu" id="userDropdown">
              <div class="dropdown-header">My Account</div>
              <a href="settings.php" class="dropdown-item">
                <span class="icon">⚙️</span>
                <span>Settings</span>
              </a>
              <a href="logout.php" class="dropdown-item">
                <span class="icon">🚪</span>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div class="main-container">
        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-header">
            <span class="icon">📋</span>
            <h2>School CMS</h2>
          </div>
          
          <div class="sidebar-section">
            <p class="sidebar-label">Website Sections</p>
            <nav class="sidebar-nav">
              <a href="index.php" class="nav-item active">
                <span class="icon">🏠</span>
                <span>Landing Page</span>
              </a>
              <a href="announcements.php" class="nav-item">
                <span class="icon">📢</span>
                <span>Announcements</span>
              </a>
              <a href="faculty.php" class="nav-item">
                <span class="icon">👨‍🏫</span>
                <span>Faculty Info</span>
              </a>
              <a href="contact.php" class="nav-item">
                <span class="icon">📞</span>
                <span>Contact Details</span>
              </a>
            </nav>
          </div>
          
          <div class="sidebar-divider"></div>
          
          <div class="sidebar-section">
            <p class="sidebar-label">Customization</p>
            <nav class="sidebar-nav">
              <a href="customization.php" class="nav-item">
                <span class="icon">🎨</span>
                <span>Global Customization</span>
              </a>
              <a href="settings.php" class="nav-item">
                <span class="icon">⚙️</span>
                <span>Settings</span>
              </a>
            </nav>
          </div>
          
          <div class="sidebar-footer">
            <a href="help.php" class="nav-item">
              <span class="icon">❓</span>
              <span>Help & Support</span>
            </a>
            <a href="logout.php" class="nav-item nav-danger">
              <span class="icon">🚪</span>
              <span>Logout</span>
            </a>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
          <!-- Section Tabs -->
          <div class="section-tabs">
            <div class="tabs">
              <button class="tab active" data-tab="landing-page">
                <span class="icon">🏠</span>
                <span>Landing Page</span>
              </button>
              <button class="tab" data-tab="announcements">
                <span class="icon">📢</span>
                <span>Announcements</span>
              </button>
              <button class="tab" data-tab="faculty">
                <span class="icon">👨‍🏫</span>
                <span>Faculty Info</span>
              </button>
              <button class="tab" data-tab="contact">
                <span class="icon">📞</span>
                <span>Contact Details</span>
              </button>
              <button class="tab" data-tab="customization">
                <span class="icon">🎨</span>
                <span>Global Customization</span>
              </button>
            </div>
          </div>

          <!-- Tab Content -->
          <div class="tab-content">
            <!-- Landing Page Editor -->
            <div class="tab-pane active" id="landing-page">
              <?php include 'includes/landing-page-editor.php'; ?>
            </div>
            
            <!-- Announcements Editor -->
            <div class="tab-pane" id="announcements">
              <?php include 'includes/announcements-editor.php'; ?>
            </div>
            
            <!-- Faculty Editor -->
            <div class="tab-pane" id="faculty">
              <?php include 'includes/faculty-editor.php'; ?>
            </div>
            
            <!-- Contact Editor -->
            <div class="tab-pane" id="contact">
              <?php include 'includes/contact-editor.php'; ?>
            </div>
            
            <!-- Global Customization Editor -->
            <div class="tab-pane" id="customization">
              <?php include 'includes/global-customization-editor.php'; ?>
            </div>
          </div>
        </main>
      </div>

      <!-- Preview Modal -->
      <div class="modal" id="previewModal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>School Website Preview</h2>
            <button class="close-btn" onclick="closePreviewModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="preview-container">
              <!-- Preview content will be loaded here -->
              <?php include 'includes/preview-content.php'; ?>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" onclick="closePreviewModal()">
              <span class="icon">❌</span>
              <span>Return to Editor</span>
            </button>
            <button class="btn btn-primary" onclick="approveAndPublish()">
              <span class="icon">✅</span>
              <span>Approve & Publish</span>
            </button>
          </div>
        </div>
      </div>
    <?php else: ?>
      <div class="login-redirect">
        <p>Please <a href="login.php">login</a> to access the CMS.</p>
      </div>
    <?php endif; ?>
  </div>
</body>
</html>