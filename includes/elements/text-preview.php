<?php
  $element_content = unserialize($element['content']);
  $title = $element_content['title'] ?? 'Text Section';
  $content = $element_content['content'] ?? 'No content available';
  $background_color = $element_content['background_color'] ?? '#ffffff';
  $text_color = $element_content['text_color'] ?? '#000000';
  $font_size = $element_content['font_size'] ?? 'medium';
  $alignment = $element_content['alignment'] ?? 'left';
  
  // Font size class
  $font_size_class = '';
  switch($font_size) {
    case 'small':
      $font_size_class = 'text-sm';
      break;
    case 'medium':
      $font_size_class = 'text-base';
      break;
    case 'large':
      $font_size_class = 'text-lg';
      break;
    case 'xlarge':
      $font_size_class = 'text-xl';
      break;
  }
  
  // Alignment class
  $alignment_class = '';
  switch($alignment) {
    case 'left':
      $alignment_class = 'text-left';
      break;
    case 'center':
      $alignment_class = 'text-center';
      break;
    case 'right':
      $alignment_class = 'text-right';
      break;
  }
?>

<div class="text-section-preview" style="background-color: <?php echo $background_color; ?>">
  <h3 style="color: <?php echo $text_color; ?>"><?php echo $title; ?></h3>
  <div class="text-content <?php echo $font_size_class; ?> <?php echo $alignment_class; ?>" style="color: <?php echo $text_color; ?>">
    <?php echo $content; ?>
  </div>
</div>