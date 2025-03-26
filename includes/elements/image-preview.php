<?php
  $element_content = unserialize($element['content']);
  $image_url = $element_content['image_url'] ?? 'https://via.placeholder.com/800x400';
  $caption = $element_content['caption'] ?? '';
  $alt_text = $element_content['alt_text'] ?? 'Image';
  $alignment = $element_content['alignment'] ?? 'center';
  $size = $element_content['size'] ?? 80;
?>

<div class="image-section-preview">
  <div class="image-container <?php echo $alignment; ?>" style="width: <?php echo $size; ?>%">
    <img src="<?php echo $image_url; ?>" alt="<?php echo $alt_text; ?>" class="preview-image">
    <?php if(!empty($caption)): ?>
      <p class="image-caption"><?php echo $caption; ?></p>
    <?php endif; ?>
  </div>
</div>