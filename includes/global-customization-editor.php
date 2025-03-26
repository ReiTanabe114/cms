<?php
  // Get global settings
  $settings = getGlobalSettings();
  
  // Font options
  $font_options = array(
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Courier New',
    'Impact',
    'Comic Sans MS'
  );
?>
<div class="editor-container">
  <div class="editor-header">
    <div>
      <h2>Global Customization</h2>
      <p class="editor-description">Customize the appearance of your school website</p>
    </div>
    
    <div class="editor-actions">
      <button class="btn btn-outline" onclick="resetSettings()">
        <span class="icon">↩️</span>
        <span>Reset</span>
      </button>
      <button class="btn btn-primary" onclick="saveGlobalSettings()">
        <span class="icon">✓</span>
        <span>Save Changes</span>
      </button>
    </div>
  </div>
  
  <div class="customization-tabs">
    <div class="tabs">
      <button class="tab active" data-customization-tab="colors">
        <span class="icon">🎨</span>
        <span>Colors</span>
      </button>
      <button class="tab" data-customization-tab="typography">
        <span class="icon">🔤</span>
        <span>Typography</span>
      </button>
      <button class="tab" data-customization-tab="layout">
        <span class="icon">📐</span>
        <span>Layout</span>
      </button>
    </div>
  </div>
  
  <form id="globalSettingsForm">
    <!-- Colors Tab -->
    <div class="customization-tab-pane active" id="colors-tab">
      <div class="form-card">
        <div class="form-card-header">
          <h3>Color Scheme</h3>
          <p class="form-card-description">Customize the colors used throughout your website</p>
        </div>
        
        <div class="form-card-content">
          <div class="color-grid">
            <?php
              $color_fields = array(
                'primary' => 'Primary',
                'secondary' => 'Secondary',
                'accent' => 'Accent',
                'background' => 'Background',
                'text' => 'Text'
              );
              
              foreach($color_fields as $field => $label):
                $value = $settings[$field . '_color'];
            ?>
              <div class="color-field">
                <label for="<?php echo $field; ?>Color"><?php echo $label; ?></label>
                <div class="color-input">
                  <div class="color-preview" style="background-color: <?php echo $value; ?>"></div>
                  <input type="text" id="<?php echo $field; ?>ColorText" name="<?php echo $field; ?>_color" value="<?php echo $value; ?>" onchange="updateColorPicker('<?php echo $field; ?>')">
                  <input type="color" id="<?php echo $field; ?>Color" value="<?php echo $value; ?>" onchange="updateColorText('<?php echo $field; ?>')">
                </div>
              </div>
            <?php endforeach; ?>
          </div>
          
          <div class="preview-section">
            <h4>Preview</h4>
            <div class="color-preview-container" id="colorPreview" style="background-color: <?php echo $settings['background_color']; ?>">
              <h4 style="color: <?php echo $settings['primary_color']; ?>">Sample Heading</h4>
              <p style="color: <?php echo $settings['text_color']; ?>">This is how your text will appear on your website. The primary color is used for headings and links.</p>
              <div class="button-preview">
                <button class="preview-btn primary" style="background-color: <?php echo $settings['primary_color']; ?>">Primary Button</button>
                <button class="preview-btn secondary" style="background-color: <?php echo $settings['secondary_color']; ?>">Secondary Button</button>
                <button class="preview-btn accent" style="background-color: <?php echo $settings['accent_color']; ?>">Accent Button</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Typography Tab -->
    <div class="customization-tab-pane" id="typography-tab">
      <div class="form-card">
        <div class="form-card-header">
          <h3>Typography Settings</h3>
          <p class="form-card-description">Customize the fonts and text sizes used on your website</p>
        </div>
        
        <div class="form-card-content">
          <div class="typography-grid">
            <div class="form-group">
              <label for="headingFont">Heading Font</label>
              <select id="headingFont" name="heading_font">
                <?php foreach($font_options as $font): ?>
                  <option value="<?php echo $font; ?>" <?php echo ($settings['heading_font'] == $font) ? 'selected' : ''; ?>><?php echo $font; ?></option>
                <?php endforeach; ?>
              </select>
            </div>
            
            <div class="form-group">
              <label for="bodyFont">Body Font</label>
              <select id="bodyFont" name="body_font">
                <?php foreach($font_options as $font): ?>
                  <option value="<?php echo $font; ?>" <?php echo ($settings['body_font'] == $font) ? 'selected' : ''; ?>><?php echo $font; ?></option>
                <?php endforeach; ?>
              </select>
            </div>
            
            <div class="form-group">
              <label for="headingSize">Heading Size: <span id="headingSizeValue"><?php echo $settings['heading_size']; ?></span>px</label>
              <input type="range" id="headingSize" name="heading_size" min="16" max="48" step="1" value="<?php echo $settings['heading_size']; ?>" oninput="updateSizeValue('heading')">
            </div>
            
            <div class="form-group">
              <label for="bodySize">Body Text Size: <span id="bodySizeValue"><?php echo $settings['body_size']; ?></span>px</label>
              <input type="range" id="bodySize" name="body_size" min="12" max="24" step="1" value="<?php echo $settings['body_size']; ?>" oninput="updateSizeValue('body')">
            </div>
          </div>
          
          <div class="preview-section">
            <h4>Preview</h4>
            <div class="typography-preview" id="typographyPreview">
              <h4 style="font-family: <?php echo $settings['heading_font']; ?>; font-size: <?php echo $settings['heading_size']; ?>px; color: <?php echo $settings['primary_color']; ?>">
                Sample Heading
              </h4>
              <p style="font-family: <?php echo $settings['body_font']; ?>; font-size: <?php echo $settings['body_size']; ?>px; color: <?php echo $settings['text_color']; ?>">
                This is how your text will appear on your website. You can adjust the font family and size to match your school's branding. The text should be easy to read on all devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Layout Tab -->
    <div class="customization-tab-pane" id="layout-tab">
      <div class="form-card">
        <div class="form-card-header">
          <h3>Layout Settings</h3>
          <p class="form-card-description">Customize the layout and spacing of your website</p>
        </div>
        
        <div class="form-card-content">
          <div class="layout-grid">
            <div class="form-group">
              <label for="containerWidth">Container Width: <span id="containerWidthValue"><?php echo $settings['container_width']; ?></span>px</label>
              <input type="range" id="containerWidth" name="container_width" min="800" max="1600" step="50" value="<?php echo $settings['container_width']; ?>" oninput="updateSizeValue('containerWidth')">
            </div>
            
            <div class="form-group">
              <label for="spacing">Element Spacing: <span id="spacingValue"><?php echo $settings['spacing']; ?></span>px</label>
              <input type="range" id="spacing" name="spacing" min="8" max="32" step="2" value="<?php echo $settings['spacing']; ?>" oninput="updateSizeValue('spacing')">
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" id="roundedCorners" name="rounded_corners" <?php echo ($settings['rounded_corners'] == 1) ? 'checked' : ''; ?> onchange="updateLayoutPreview()">
                <span>Use Rounded Corners</span>
              </label>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" id="useShadows" name="use_shadows" <?php echo ($settings['use_shadows'] == 1) ? 'checked' : ''; ?> onchange="updateLayoutPreview()">
                <span>Use Shadows</span>
              </label>
            </div>
          </div>
          
          <div class="preview-section">
            <h4>Preview</h4>
            <div class="layout-preview-container">
              <div id="layoutPreview" class="layout-preview <?php echo ($settings['rounded_corners'] == 1) ? 'rounded' : ''; ?> <?php echo ($settings['use_shadows'] == 1) ? 'shadowed' : ''; ?>" style="max-width: <?php echo $settings['container_width']; ?>px; background-color: <?php echo $settings['background_color']; ?>">
                <div class="layout-preview-grid" style="gap: <?php echo $settings['spacing']; ?>px">
                  <div class="layout-preview-card <?php echo ($settings['rounded_corners'] == 1) ? 'rounded' : ''; ?> <?php echo ($settings['use_shadows'] == 1) ? 'shadowed' : ''; ?>">
                    <h4 style="color: <?php echo $settings['primary_color']; ?>">Card Title</h4>
                    <p style="color: <?php echo $settings['text_color']; ?>">Card content with sample text</p>
                  </div>
                  <div class="layout-preview-card <?php echo ($settings['rounded_corners'] == 1) ? 'rounded' : ''; ?> <?php echo ($settings['use_shadows'] == 1) ? 'shadowed' : ''; ?>">
                    <h4 style="color: <?php echo $settings['primary_color']; ?>">Card Title</h4>
                    <p style="color: <?php echo $settings['text_color']; ?>">Card content with sample text</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>