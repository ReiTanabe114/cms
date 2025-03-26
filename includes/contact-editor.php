<?php
  // Get contact information
  $contact = getContactInfo();
  
  // Get social media links
  $social_media = getSocialMedia();
?>
<div class="editor-container">
  <div class="editor-header">
    <h2>Contact Information</h2>
  </div>
  
  <form id="contactForm" class="contact-form">
    <!-- Address Information -->
    <div class="form-card">
      <div class="form-card-header">
        <div class="form-card-title">
          <span class="icon">📍</span>
          <h3>Address Information</h3>
        </div>
        <p class="form-card-description">Update the school's physical address information.</p>
      </div>
      
      <div class="form-card-content">
        <div class="form-group">
          <label for="address">Street Address</label>
          <input type="text" id="address" name="address" value="<?php echo $contact['address']; ?>" placeholder="123 School Street">
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="city">City</label>
            <input type="text" id="city" name="city" value="<?php echo $contact['city']; ?>" placeholder="Anytown">
          </div>
          
          <div class="form-group">
            <label for="state">State</label>
            <input type="text" id="state" name="state" value="<?php echo $contact['state']; ?>" placeholder="CA">
          </div>
          
          <div class="form-group">
            <label for="zipCode">ZIP Code</label>
            <input type="text" id="zipCode" name="zip_code" value="<?php echo $contact['zip_code']; ?>" placeholder="90210">
          </div>
        </div>
      </div>
    </div>
    
    <!-- Phone Numbers -->
    <div class="form-card">
      <div class="form-card-header">
        <div class="form-card-title">
          <span class="icon">📞</span>
          <h3>Phone Numbers</h3>
        </div>
        <p class="form-card-description">Update the school's contact phone numbers.</p>
      </div>
      
      <div class="form-card-content">
        <div class="form-row">
          <div class="form-group">
            <label for="mainPhone">Main Phone</label>
            <input type="text" id="mainPhone" name="main_phone" value="<?php echo $contact['main_phone']; ?>" placeholder="(555) 123-4567">
          </div>
          
          <div class="form-group">
            <label for="alternatePhone">Alternate Phone</label>
            <input type="text" id="alternatePhone" name="alternate_phone" value="<?php echo $contact['alternate_phone']; ?>" placeholder="(555) 987-6543">
          </div>
          
          <div class="form-group">
            <label for="fax">Fax</label>
            <input type="text" id="fax" name="fax" value="<?php echo $contact['fax']; ?>" placeholder="(555) 765-4321">
          </div>
        </div>
      </div>
    </div>
    
    <!-- Online Presence -->
    <div class="form-card">
      <div class="form-card-header">
        <div class="form-card-title">
          <span class="icon">✉️</span>
          <h3>Online Presence</h3>
        </div>
        <p class="form-card-description">Update the school's email and website information.</p>
      </div>
      
      <div class="form-card-content">
        <div class="form-row">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" value="<?php echo $contact['email']; ?>" placeholder="info@schoolname.edu">
          </div>
          
          <div class="form-group">
            <label for="website">Website</label>
            <input type="text" id="website" name="website" value="<?php echo $contact['website']; ?>" placeholder="www.schoolname.edu">
          </div>
        </div>
      </div>
    </div>
    
    <!-- Social Media -->
    <div class="form-card">
      <div class="form-card-header">
        <div class="form-card-title">
          <span class="icon">🌐</span>
          <h3>Social Media</h3>
        </div>
        <p class="form-card-description">Manage the school's social media profiles.</p>
      </div>
      
      <div class="form-card-content">
        <div id="socialMediaContainer">
          <?php if(count($social_media) > 0): ?>
            <?php foreach($social_media as $index => $social): ?>
              <div class="social-media-item" data-index="<?php echo $index; ?>">
                <div class="social-icon">
                  <?php echo getSocialIcon($social['platform']); ?>
                </div>
                
                <div class="social-inputs">
                  <input type="hidden" name="social_media[<?php echo $index; ?>][id]" value="<?php echo $social['id']; ?>">
                  <input type="text" name="social_media[<?php echo $index; ?>][platform]" placeholder="Platform (e.g., Facebook)" value="<?php echo $social['platform']; ?>">
                  <input type="text" name="social_media[<?php echo $index; ?>][url]" placeholder="URL (e.g., https://facebook.com/schoolname)" value="<?php echo $social['url']; ?>">
                </div>
                
                <button type="button" class="btn btn-icon" onclick="removeSocialMedia(<?php echo $index; ?>)">
                  <span class="icon">🗑️</span>
                </button>
              </div>
            <?php endforeach; ?>
          <?php else: ?>
            <div class="social-media-item" data-index="0">
              <div class="social-icon">🌐</div>
              
              <div class="social-inputs">
                <input type="hidden" name="social_media[0][id]" value="">
                <input type="text" name="social_media[0][platform]" placeholder="Platform (e.g., Facebook)">
                <input type="text" name="social_media[0][url]" placeholder="URL (e.g., https://facebook.com/schoolname)">
              </div>
              
              <button type="button" class="btn btn-icon" onclick="removeSocialMedia(0)">
                <span class="icon">🗑️</span>
              </button>
            </div>
          <?php endif; ?>
        </div>
        
        <button type="button" class="btn btn-sm btn-outline" onclick="addSocialMedia()">
          <span class="icon">➕</span>
          <span>Add Social Media</span>
        </button>
      </div>
    </div>
    
    <div class="form-actions">
      <button type="submit" class="btn btn-primary">
        <span class="icon">💾</span>
        <span>Save Contact Information</span>
      </button>
    </div>
  </form>
</div>

<?php
  // Helper function to get social media icon
  function getSocialIcon($platform) {
    $platform = strtolower($platform);
    
    switch($platform) {
      case 'facebook':
        return '📘';
      case 'twitter':
        return '🐦';
      case 'instagram':
        return '📷';
      case 'youtube':
        return '📹';
      default:
        return '🌐';
    }
  }
?>