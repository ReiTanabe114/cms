<?php
  $element_content = unserialize($element['content']);
  $slides = $element_content['slides'] ?? [];
  $current_slide = 0;
?>

<div class="slideshow-preview">
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
  <?php else: ?>
    <div class="empty-slideshow">
      <p>No slides available</p>
    </div>
  <?php endif; ?>
</div>