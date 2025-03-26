<?php
  // Get landing page elements
  $elements = getLandingPageElements();
?>
<div class="editor-container">
  <div class="editor-header">
    <h2>Landing Page Editor</h2>
    <div class="editor-actions">
      <button class="btn btn-outline" onclick="previewLandingPage()">
        <span class="icon">👁️</span>
        <span>Preview</span>
      </button>
      <button class="btn btn-primary" onclick="saveLandingPage()">
        <span>Save Changes</span>
      </button>
    </div>
  </div>
  
  <div class="editor-tabs">
    <div class="tabs">
      <button class="tab active" data-editor-tab="content">Content</button>
      <button class="tab" data-editor-tab="edit" id="editElementTab" disabled>Edit Element</button>
      <button class="tab" data-editor-tab="settings">Page Settings</button>
    </div>
  </div>
  
  <div class="editor-content">
    <!-- Content Tab -->
    <div class="editor-tab-pane active" id="content-tab">
      <div class="content-editor">
        <div class="elements-container">
          <div class="elements-header">
            <h3>Page Elements</h3>
            <div class="element-actions">
              <button class="btn btn-sm btn-outline" onclick="addElement('slideshow')">
                <span class="icon">➕</span>
                <span>Add Slideshow</span>
              </button>
              <button class="btn btn-sm btn-outline" onclick="addElement('text')">
                <span class="icon">➕</span>
                <span>Add Text</span>
              </button>
              <button class="btn btn-sm btn-outline" onclick="addElement('image')">
                <span class="icon">➕</span>
                <span>Add Image</span>
              </button>
            </div>
          </div>
          
          <div class="elements-list" id="elementsContainer">
            <?php if(count($elements) > 0): ?>
              <?php foreach($elements as $element): ?>
                <div class="element-card" data-element-id="<?php echo $element['id']; ?>" data-element-type="<?php echo $element['type']; ?>">
                  <div class="element-header">
                    <div class="element-drag-handle">
                      <span class="icon">↕️</span>
                      <span class="element-type"><?php echo ucfirst($element['type']); ?> Section</span>
                    </div>
                    <div class="element-actions">
                      <button class="btn btn-icon" onclick="editElement(<?php echo $element['id']; ?>)">
                        <span class="icon">⚙️</span>
                      </button>
                      <button class="btn btn-icon" onclick="deleteElement(<?php echo $element['id']; ?>)">
                        <span class="icon">🗑️</span>
                      </button>
                    </div>
                  </div>
                  
                  <div class="element-preview">
                    <?php if($element['type'] == 'slideshow'): ?>
                      <?php include 'elements/slideshow-preview.php'; ?>
                    <?php elseif($element['type'] == 'text'): ?>
                      <?php include 'elements/text-preview.php'; ?>
                    <?php elseif($element['type'] == 'image'): ?>
                      <?php include 'elements/image-preview.php'; ?>
                    <?php endif; ?>
                  </div>
                </div>
              <?php endforeach; ?>
            <?php else: ?>
              <div class="empty-state">
                <p>No elements added yet. Use the buttons above to add content to your landing page.</p>
              </div>
            <?php endif; ?>
          </div>
        </div>
        
        <div class="element-toolbox">
          <h3>Element Toolbox</h3>
          <div class="toolbox-items">
            <div class="toolbox-item" draggable="true" data-element-type="slideshow">
              <div class="toolbox-icon">🖼️</div>
              <div class="toolbox-info">
                <h4>Slideshow</h4>
                <p>Add a slideshow with multiple images and captions</p>
              </div>
              <button class="btn btn-sm btn-ghost" onclick="addElement('slideshow')">Add</button>
            </div>
            
            <div class="toolbox-item" draggable="true" data-element-type="text">
              <div class="toolbox-icon">📝</div>
              <div class="toolbox-info">
                <h4>Text Section</h4>
                <p>Add a formatted text section with headings and paragraphs</p>
              </div>
              <button class="btn btn-sm btn-ghost" onclick="addElement('text')">Add</button>
            </div>
            
            <div class="toolbox-item" draggable="true" data-element-type="image">
              <div class="toolbox-icon">🖼️</div>
              <div class="toolbox-info">
                <h4>Image Section</h4>
                <p>Add an image with optional caption and alignment options</p>
              </div>
              <button class="btn btn-sm btn-ghost" onclick="addElement('image')">Add</button>
            </div>
            
            <div class="toolbox-item" draggable="true" data-element-type="two-column">
              <div class="toolbox-icon">⚏</div>
              <div class="toolbox-info">
                <h4>Two Column Layout</h4>
                <p>Create a two-column layout for content</p>
              </div>
              <button class="btn btn-sm btn-ghost" onclick="addElement('two-column')">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Edit Element Tab -->
    <div class="editor-tab-pane" id="edit-tab">
      <div id="elementEditor">
        <div class="element-edit-header">
          <h3>Edit <span id="editingElementType">Element</span></h3>
          <button class="btn btn-ghost" onclick="closeElementEditor()">Done</button>
        </div>
        
        <div class="element-edit-content" id="elementEditContent">
          <!-- Element editor will be loaded here -->
          <div class="empty-state">
            <p>Select an element to edit</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Settings Tab -->
    <div class="editor-tab-pane" id="settings-tab">
      <div class="page-settings">
        <h3>Landing Page Settings</h3>
        
        <form id="pageSettingsForm" class="settings-form">
          <div class="form-row">
            <div class="form-group">
              <label for="pageTitle">Page Title</label>
              <input type="text" id="pageTitle" name="pageTitle" value="Welcome to Our School">
            </div>
            
            <div class="form-group">
              <label for="metaDescription">Meta Description</label>
              <input type="text" id="metaDescription" name="metaDescription" value="Official website of Our School - Providing quality education since 1985">
            </div>
          </div>
          
          <div class="form-group">
            <label for="backgroundColor">Background Color</label>
            <div class="color-input">
              <input type="color" id="backgroundColor" name="backgroundColor" value="#ffffff">
              <input type="text" id="backgroundColorText" name="backgroundColorText" value="#ffffff">
            </div>
          </div>
          
          <div class="form-group">
            <label for="headerStyle">Header Style</label>
            <select id="headerStyle" name="headerStyle">
              <option value="standard">Standard</option>
              <option value="centered">Centered</option>
              <option value="minimal">Minimal</option>
              <option value="full-width">Full Width</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="showFooter" name="showFooter" checked>
              <span>Show footer on landing page</span>
            </label>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>