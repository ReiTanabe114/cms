<?php
  include 'includes/config.php';
  include 'includes/functions.php';
  
  // Check if the request is a POST request
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tab = $_POST['tab'];
    $response = array('success' => false, 'message' => 'No data saved');
    
    switch ($tab) {
      case 'landing-page':
        if (isset($_POST['elements'])) {
          // Delete all existing elements first (optional, depends on your approach)
          // $conn->query("DELETE FROM landing_page_elements");
          
          // Save each element
          foreach ($_POST['elements'] as $element) {
            saveLandingPageElement($element);
          }
          
          $response = array('success' => true, 'message' => 'Landing page elements saved successfully');
        }
        break;
        
      case 'announcements':
        if (isset($_POST['announcements'])) {
          foreach ($_POST['announcements'] as $announcement) {
            saveAnnouncement($announcement);
          }
          
          $response = array('success' => true, 'message' => 'Announcements saved successfully');
        }
        break;
        
      case 'faculty':
        if (isset($_POST['faculty'])) {
          foreach ($_POST['faculty'] as $faculty) {
            saveFacultyMember($faculty);
          }
          
          $response = array('success' => true, 'message' => 'Faculty information saved successfully');
        }
        break;
        
      case 'contact':
        if (isset($_POST['contact'])) {
          saveContactInfo($_POST['contact']);
          
          if (isset($_POST['social_media'])) {
            foreach ($_POST['social_media'] as $social) {
              saveSocialMedia($social);
            }
          }
          
          $response = array('success' => true, 'message' => 'Contact information saved successfully');
        }
        break;
        
      case 'customization':
        if (isset($_POST['customization'])) {
          saveGlobalSettings($_POST['customization']);
          
          $response = array('success' => true, 'message' => 'Global settings saved successfully');
        }
        break;
    }
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  }
?>