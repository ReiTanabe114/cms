<?php
  include 'includes/config.php';
  include 'includes/functions.php';
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
            <a href="#" class="nav-item" onclick="switchTab('announcements'); return false;">
              <span class="icon">📢</span>
              <span>Announcements</span>
            </a>
            <a href="#" class="nav-item" onclick="switchTab('faculty'); return false;">
              <span class="icon">👨‍🏫</span>
              <span>Faculty Info</span>
            </a>
            <a href="#" class="nav-item" onclick="switchTab('contact'); return false;">
              <span class="icon">📞</span>
              <span>Contact Details</span>
            </a>
          </nav>
        </div>
        
        <div class="sidebar-divider"></div>
        
        <div class="sidebar-section">
          <p class="sidebar-label">Customization</p>
          <nav class="sidebar-nav">
            <a href="#" class="nav-item" onclick="switchTab('customization'); return false;">
              <span class="icon">🎨</span>
              <span>Global Customization</span>
            </a>
          </nav>
        </div>
        
        <div class="sidebar-footer">
          <a href="#" class="nav-item" onclick="showHelp(); return false;">
            <span class="icon">❓</span>
            <span>Help & Support</span>
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Section Tabs -->
        <div class="section-tabs">
          <div class="tabs">
            <button class="tab active" data-tab="landing-page" onclick="switchTab('landing-page')">
              <span class="icon">🏠</span>
              <span>Landing Page</span>
            </button>
            <button class="tab" data-tab="announcements" onclick="switchTab('announcements')">
              <span class="icon">📢</span>
              <span>Announcements</span>
            </button>
            <button class="tab" data-tab="faculty" onclick="switchTab('faculty')">
              <span class="icon">👨‍🏫</span>
              <span>Faculty Info</span>
            </button>
            <button class="tab" data-tab="contact" onclick="switchTab('contact')">
              <span class="icon">📞</span>
              <span>Contact Details</span>
            </button>
            <button class="tab" data-tab="customization" onclick="switchTab('customization')">
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
    
    <!-- Help Modal -->
    <div class="modal" id="helpModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Help & Support</h2>
          <button class="close-btn" onclick="closeHelpModal()">&times;</button>
        </div>
        <div class="modal-body">
          <h3>School Website CMS</h3>
          <p>This Content Management System allows you to create and customize your school website without requiring user accounts. All changes are automatically saved to the database.</p>
          
          <h4>Getting Started</h4>
          <ul>
            <li>Use the tabs at the top to navigate between different sections of your website</li>
            <li>The Landing Page editor allows you to add slideshows, text sections, and images</li>
            <li>Announcements can be created, edited, and pinned to the top of the list</li>
            <li>Faculty information can be managed with photos and contact details</li>
            <li>Contact information for your school can be updated in the Contact Details section</li>
            <li>Use Global Customization to change colors, fonts, and other design elements</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" onclick="closeHelpModal()">
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    // Tab switching functionality
    function switchTab(tabId) {
      // Hide all tab panes
      const tabPanes = document.querySelectorAll('.tab-pane');
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Show selected tab pane
      const selectedPane = document.getElementById(tabId);
      if (selectedPane) selectedPane.classList.add('active');
      
      // Update tab buttons
      const tabButtons = document.querySelectorAll('.tab');
      tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabId) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
      
      // Update sidebar navigation
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        if (item.textContent.trim().includes(tabId.charAt(0).toUpperCase() + tabId.slice(1).replace('-', ' '))) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
    
    // Preview website
    function previewWebsite() {
      document.getElementById('previewModal').style.display = 'block';
    }
    
    // Close preview modal
    function closePreviewModal() {
      document.getElementById('previewModal').style.display = 'none';
    }
    
    // Show help modal
    function showHelp() {
      document.getElementById('helpModal').style.display = 'block';
    }
    
    // Close help modal
    function closeHelpModal() {
      document.getElementById('helpModal').style.display = 'none';
    }
    
    // Save changes
    function saveChanges() {
      // This function will be implemented with AJAX to save changes without page reload
      alert('Changes saved successfully!');
    }
    
    // Publish website
    function publishWebsite() {
      // This function will be implemented to publish the website
      alert('Website published successfully!');
    }
    
    // Approve and publish from preview
    function approveAndPublish() {
      closePreviewModal();
      publishWebsite();
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    };
  </script>
</body>
</html>