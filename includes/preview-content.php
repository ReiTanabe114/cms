<?php
  // Get global settings
  $settings = getGlobalSettings();
  
  // Get landing page elements
  $elements = getLandingPageElements();
?>
<div class="preview-website">
  <div class="preview-header">
    <h2 class="preview-title">School Website Preview</h2>
  </div>
  
  <div class="preview-content">
    <?php if(count($elements) > 0): ?>
      <?php foreach($elements as $element): ?>
        <div class="preview-element">
          <?php if($element['type'] == 'slideshow'): ?>
            <div class="preview-slideshow">
              <?php
                $slideshow_data = unserialize($element['content']);
                $slides = $slideshow_data['slides'] ?? [];
                $current_slide = 0;
              ?>
              
              <?php if(count($slides) > 0): ?>
                <div class="slideshow-container">
                  <img src="<?php echo $slides[$current_slide]['image_url']; ?>" alt="<?php echo $slides[$current_slide]['alt_text']; ?>" class="slideshow-image">
                  
                  <div class="slideshow-caption">
                    <p><?php echo $slides[$current_slide]['caption']; ?></p>
                  </div>
                  
                  <div class="slideshow-navigation">
                    <button class="slideshow-nav prev">❮</button>
                    <button class="slideshow-nav next">❯</button>
                  </div>
                  
                  <div class="slideshow-indicators">
                    <?php for($i = 0; $i < count($slides); $i++): ?>
                      <button class="slideshow-indicator <?php echo ($i == $current_slide) ? 'active' : ''; ?>"></button>
                    <?php endfor; ?>
                  </div>
                </div>
              <?php endif; ?>
            </div>
          <?php elseif($element['type'] == 'text'): ?>
            <div class="preview-text">
              <?php
                $text_data = unserialize($element['content']);
                $title = $text_data['title'] ?? '';
                $content = $text_data['content'] ?? '';
              ?>
              
              <h3><?php echo $title; ?></h3>
              <div class="text-content">
                <?php echo $content; ?>
              </div>
            </div>
          <?php elseif($element['type'] == 'image'): ?>
            <div class="preview-image">
              <?php
                $image_data = unserialize($element['content']);
                $image_url = $image_data['image_url'] ?? '';
                $caption = $image_data['caption'] ?? '';
                $alt_text = $image_data['alt_text'] ?? '';
                $alignment = $image_data['alignment'] ?? 'center';
                $size = $image_data['size'] ?? 80;
              ?>
              
              <div class="image-container <?php echo $alignment; ?>" style="width: <?php echo $size; ?>%">
                <img src="<?php echo $image_url; ?>" alt="<?php echo $alt_text; ?>">
                <?php if(!empty($caption)): ?>
                  <p class="image-caption"><?php echo $caption; ?></p>
                <?php endif; ?>
              </div>
            </div>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <div class="empty-preview">
        <p>No content has been added to the landing page yet.</p>
      </div>
    <?php endif; ?>
  </div>
</div>