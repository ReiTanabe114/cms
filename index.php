<?php
require_once 'includes/config.php';
require_once 'includes/functions.php';

// Require login for this page
require_login();

// Get the active tab from the URL or default to landing-page
$active_tab = $_GET['tab'] ?? 'landing-page';

// Get recent activities (placeholder data)
$recent_activities = [
    ['type' => 'edit', 'section' => 'Landing Page', 'time' => '2 minutes ago'],
    ['type' => 'add', 'section' => 'Faculty', 'time' => '1 hour ago'],
    ['type' => 'delete', 'section' => 'Announcements', 'time' => '3 hours ago'],
    ['type' => 'edit', 'section' => 'Contact', 'time' => 'Yesterday'],
    ['type' => 'edit', 'section' => 'Customization', 'time' => '2 days ago']
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School Website CMS</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="app-container">
        <!-- Header -->
        <header class="header">
            <div class="logo-container">
                <div class="logo">S</div>
                <h1>School CMS</h1>
            </div>
            <div class="header-actions">
                <span>Welcome, <?php echo htmlspecialchars($_SESSION['username'] ?? 'User'); ?></span>
                <a href="logout.php" class="btn btn-outline">Sign Out</a>
            </div>
        </header>
        
        <div class="main-container">
            <!-- Sidebar -->
            <aside class="sidebar">
                <div class="sidebar-section">
                    <div class="sidebar-label">MAIN MENU</div>
                    <nav class="sidebar-nav">
                        <a href="#" class="nav-item active">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                        <a href="#" class="nav-item">
                            <i class="fas fa-history"></i>
                            <span>Recent Activities</span>
                        </a>
                        <a href="#" class="nav-item">
                            <i class="fas fa-plus-circle"></i>
                            <span>Create New Website</span>
                        </a>
                    </nav>
                </div>
                
                <div class="sidebar-section">
                    <div class="sidebar-label">RECENT ACTIVITIES</div>
                    <div class="activity-list">
                        <?php foreach ($recent_activities as $activity): ?>
                            <div class="activity-item">
                                <div class="activity-icon">
                                    <?php if ($activity['type'] === 'edit'): ?>
                                        <i class="fas fa-edit"></i>
                                    <?php elseif ($activity['type'] === 'add'): ?>
                                        <i class="fas fa-plus"></i>
                                    <?php elseif ($activity['type'] === 'delete'): ?>
                                        <i class="fas fa-trash"></i>
                                    <?php endif; ?>
                                </div>
                                <div class="activity-details">
                                    <div class="activity-text">
                                        <?php echo $activity['type']; ?> <?php echo $activity['section']; ?>
                                    </div>
                                    <div class="activity-time"><?php echo $activity['time']; ?></div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                
                <div class="sidebar-footer">
                    <a href="logout.php" class="nav-item nav-danger">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sign Out</span>
                    </a>
                </div>
            </aside>
            
            <!-- Main Content -->
            <main class="main-content">
                <!-- Section Tabs -->
                <div class="section-tabs">
                    <div class="tabs">
                        <button class="tab <?php echo $active_tab === 'landing-page' ? 'active' : ''; ?>" data-tab="landing-page">
                            <i class="fas fa-home"></i>
                            <span>Landing Page</span>
                        </button>
                        <button class="tab <?php echo $active_tab === 'announcements' ? 'active' : ''; ?>" data-tab="announcements">
                            <i class="fas fa-bullhorn"></i>
                            <span>Announcements</span>
                        </button>
                        <button class="tab <?php echo $active_tab === 'faculty' ? 'active' : ''; ?>" data-tab="faculty">
                            <i class="fas fa-users"></i>
                            <span>Faculty</span>
                        </button>
                        <button class="tab <?php echo $active_tab === 'contact' ? 'active' : ''; ?>" data-tab="contact">
                            <i class="fas fa-address-card"></i>
                            <span>Contact</span>
                        </button>
                        <button class="tab <?php echo $active_tab === 'customization' ? 'active' : ''; ?>" data-tab="customization">
                            <i class="fas fa-paint-brush"></i>
                            <span>Customization</span>
                        </button>
                    </div>
                </div>
                
                <!-- Tab Content -->
                <div class="tab-content">
                    <!-- Landing Page Tab -->
                    <div class="tab-pane <?php echo $active_tab === 'landing-page' ? 'active' : ''; ?>" id="landing-page-tab">
                        <?php include 'includes/landing-page-editor.php'; ?>
                    </div>
                    
                    <!-- Announcements Tab -->
                    <div class="tab-pane <?php echo $active_tab === 'announcements' ? 'active' : ''; ?>" id="announcements-tab">
                        <?php include 'includes/announcements-editor.php'; ?>
                    </div>
                    
                    <!-- Faculty Tab -->
                    <div class="tab-pane <?php echo $active_tab === 'faculty' ? 'active' : ''; ?>" id="faculty-tab">
                        <?php include 'includes/faculty-editor.php'; ?>
                    </div>
                    
                    <!-- Contact Tab -->
                    <div class="tab-pane <?php echo $active_tab === 'contact' ? 'active' : ''; ?>" id="contact-tab">
                        <?php include 'includes/contact-editor.php'; ?>
                    </div>
                    
                    <!-- Customization Tab -->
                    <div class="tab-pane <?php echo $active_tab === 'customization' ? 'active' : ''; ?>" id="customization-tab">
                        <?php include 'includes/global-customization-editor.php'; ?>
                    </div>
                </div>
            </main>
        </div>
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
                    <span>Return to Editor</span>
                </button>
                <button class="btn btn-primary" onclick="approveAndPublish()">
                    <span>Approve & Publish</span>
                </button>
            </div>
        </div>
    </div>
    
    <script src="js/script.js"></script>
</body>
</html>