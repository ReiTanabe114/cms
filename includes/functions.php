<?php
  // Sanitize input
  function sanitize($data) {
    global $conn;
    return htmlspecialchars(strip_tags(trim($conn->real_escape_string($data))));
  }
  
  // Get landing page elements
  function getLandingPageElements() {
    global $conn;
    
    $elements = array();
    
    $sql = "SELECT * FROM landing_page_elements ORDER BY position ASC";
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $elements[] = $row;
      }
    }
    
    return $elements;
  }
  
  // Get announcements
  function getAnnouncements($filter = 'all') {
    global $conn;
    
    $announcements = array();
    
    $sql = "SELECT * FROM announcements";
    
    if($filter == 'pinned') {
      $sql .= " WHERE is_pinned = 1";
    }
    
    $sql .= " ORDER BY is_pinned DESC, date DESC";
    
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $announcements[] = $row;
      }
    }
    
    return $announcements;
  }
  
  // Get faculty members
  function getFacultyMembers() {
    global $conn;
    
    $faculty = array();
    
    $sql = "SELECT * FROM faculty ORDER BY name ASC";
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $faculty[] = $row;
      }
    }
    
    return $faculty;
  }
  
  // Get contact information
  function getContactInfo() {
    global $conn;
    
    $sql = "SELECT * FROM contact_info LIMIT 1";
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
      return $result->fetch_assoc();
    }
    
    return array(
      'address' => '',
      'city' => '',
      'state' => '',
      'zip_code' => '',
      'main_phone' => '',
      'alternate_phone' => '',
      'fax' => '',
      'email' => '',
      'website' => ''
    );
  }
  
  // Get social media links
  function getSocialMedia() {
    global $conn;
    
    $social_media = array();
    
    $sql = "SELECT * FROM social_media ORDER BY id ASC";
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $social_media[] = $row;
      }
    }
    
    return $social_media;
  }
  
  // Get global settings
  function getGlobalSettings() {
    global $conn;
    
    $sql = "SELECT * FROM global_settings LIMIT 1";
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
      return $result->fetch_assoc();
    }
    
    return array(
      'primary_color' => '#3b82f6',
      'secondary_color' => '#10b981',
      'accent_color' => '#f59e0b',
      'background_color' => '#ffffff',
      'text_color' => '#1f2937',
      'heading_font' => 'Arial',
      'body_font' => 'Arial',
      'heading_size' => '24',
      'body_size' => '16',
      'container_width' => '1200',
      'spacing' => '16',
      'rounded_corners' => '1',
      'use_shadows' => '1'
    );
  }
  
  // Save landing page element
  function saveLandingPageElement($data) {
    global $conn;
    
    $id = isset($data['id']) ? (int)$data['id'] : 0;
    $type = sanitize($data['type']);
    $content = $data['content']; // Will be sanitized in the specific element type handler
    $position = (int)$data['position'];
    
    if($id > 0) {
      // Update existing element
      $sql = "UPDATE landing_page_elements SET type = ?, content = ?, position = ? WHERE id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("ssii", $type, $content, $position, $id);
    } else {
      // Insert new element
      $sql = "INSERT INTO landing_page_elements (type, content, position) VALUES (?, ?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("ssi", $type, $content, $position);
    }
    
    return $stmt->execute();
  }
  
  // Save announcement
  function saveAnnouncement($data) {
    global $conn;
    
    $id = isset($data['id']) ? (int)$data['id'] : 0;
    $title = sanitize($data['title']);
    $content = $data['content']; // HTML content will be sanitized differently
    $date = sanitize($data['date']);
    $is_pinned = isset($data['is_pinned']) ? 1 : 0;
    
    if($id > 0) {
      // Update existing announcement
      $sql = "UPDATE announcements SET title = ?, content = ?, date = ?, is_pinned = ? WHERE id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sssii", $title, $content, $date, $is_pinned, $id);
    } else {
      // Insert new announcement
      $sql = "INSERT INTO announcements (title, content, date, is_pinned) VALUES (?, ?, ?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sssi", $title, $content, $date, $is_pinned);
    }
    
    return $stmt->execute();
  }
  
  // Save faculty member
  function saveFacultyMember($data) {
    global $conn;
    
    $id = isset($data['id']) ? (int)$data['id'] : 0;
    $name = sanitize($data['name']);
    $position = sanitize($data['position']);
    $department = sanitize($data['department']);
    $email = sanitize($data['email']);
    $phone = sanitize($data['phone']);
    $bio = sanitize($data['bio']);
    $image_url = sanitize($data['image_url']);
    
    if($id > 0) {
      // Update existing faculty member
      $sql = "UPDATE faculty SET name = ?, position = ?, department = ?, email = ?, phone = ?, bio = ?, image_url = ? WHERE id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sssssssi", $name, $position, $department, $email, $phone, $bio, $image_url, $id);
    } else {
      // Insert new faculty member
      $sql = "INSERT INTO faculty (name, position, department, email, phone, bio, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sssssss", $name, $position, $department, $email, $phone, $bio, $image_url);
    }
    
    return $stmt->execute();
  }
  
  // Save contact information
  function saveContactInfo($data) {
    global $conn;
    
    $address = sanitize($data['address']);
    $city = sanitize($data['city']);
    $state = sanitize($data['state']);
    $zip_code = sanitize($data['zip_code']);
    $main_phone = sanitize($data['main_phone']);
    $alternate_phone = sanitize($data['alternate_phone']);
    $fax = sanitize($data['fax']);
    $email = sanitize($data['email']);
    $website = sanitize($data['website']);
    
    // Check if contact info exists
    $sql = "SELECT id FROM contact_info LIMIT 1";
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
      // Update existing contact info
      $sql = "UPDATE contact_info SET address = ?, city = ?, state = ?, zip_code = ?, main_phone = ?, alternate_phone = ?, fax = ?, email = ?, website = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sssssssss", $address, $city, $state, $zip_code, $main_phone, $alternate_phone, $fax, $email, $website);
    } else {
      // Insert new contact info
      $sql = "INSERT INTO contact_info (address, city, state, zip_code, main_phone, alternate_phone, fax, email, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sssssssss", $address, $city, $state, $zip_code, $main_phone, $alternate_phone, $fax, $email, $website);
    }
    
    return $stmt->execute();
  }
  
  // Save social media link
  function saveSocialMedia($data) {
    global $conn;
    
    $id = isset($data['id']) ? (int)$data['id'] : 0;
    $platform = sanitize($data['platform']);
    $url = sanitize($data['url']);
    
    if($id > 0) {
      // Update existing social media link
      $sql = "UPDATE social_media SET platform = ?, url = ? WHERE id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("ssi", $platform, $url, $id);
    } else {
      // Insert new social media link
      $sql = "INSERT INTO social_media (platform, url) VALUES (?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("ss", $platform, $url);
    }
    
    return $stmt->execute();
  }
  
  // Save global settings
  function saveGlobalSettings($data) {
    global $conn;
    
    $primary_color = sanitize($data['primary_color']);
    $secondary_color = sanitize($data['secondary_color']);
    $accent_color = sanitize($data['accent_color']);
    $background_color = sanitize($data['background_color']);
    $text_color = sanitize($data['text_color']);
    $heading_font = sanitize($data['heading_font']);
    $body_font = sanitize($data['body_font']);
    $heading_size = (int)$data['heading_size'];
    $body_size = (int)$data['body_size'];
    $container_width = (int)$data['container_width'];
    $spacing = (int)$data['spacing'];
    $rounded_corners = isset($data['rounded_corners']) ? 1 : 0;
    $use_shadows = isset($data['use_shadows']) ? 1 : 0;
    
    // Check if settings exist
    $sql = "SELECT id FROM global_settings LIMIT 1";
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
      // Update existing settings
      $sql = "UPDATE global_settings SET primary_color = ?, secondary_color = ?, accent_color = ?, background_color = ?, text_color = ?, heading_font = ?, body_font = ?, heading_size = ?, body_size = ?, container_width = ?, spacing = ?, rounded_corners = ?, use_shadows = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sssssssiiiiiii", $primary_color, $secondary_color, $accent_color, $background_color, $text_color, $heading_font, $body_font, $heading_size, $body_size, $container_width, $spacing, $rounded_corners, $use_shadows);
    } else {
      // Insert new settings
      $sql = "INSERT INTO global_settings (primary_color, secondary_color, accent_color, background_color, text_color, heading_font, body_font, heading_size, body_size, container_width, spacing, rounded_corners, use_shadows) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sssssssiiiiiii", $primary_color, $secondary_color, $accent_color, $background_color, $text_color, $heading_font, $body_font, $heading_size, $body_size, $container_width, $spacing, $rounded_corners, $use_shadows);
    }
    
    return $stmt->execute();
  }
  
  // Delete landing page element
  function deleteLandingPageElement($id) {
    global $conn;
    
    $id = (int)$id;
    
    $sql = "DELETE FROM landing_page_elements WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    return $stmt->execute();
  }
  
  // Delete announcement
  function deleteAnnouncement($id) {
    global $conn;
    
    $id = (int)$id;
    
    $sql = "DELETE FROM announcements WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    return $stmt->execute();
  }
  
  // Delete faculty member
  function deleteFacultyMember($id) {
    global $conn;
    
    $id = (int)$id;
    
    $sql = "DELETE FROM faculty WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    return $stmt->execute();
  }
  
  // Delete social media link
  function deleteSocialMedia($id) {
    global $conn;
    
    $id = (int)$id;
    
    $sql = "DELETE FROM social_media WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    return $stmt->execute();
  }
?>