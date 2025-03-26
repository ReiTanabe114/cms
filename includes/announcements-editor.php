<?php
  // Get announcements
  $announcements = getAnnouncements();
?>
<div class="editor-container">
  <div class="editor-header">
    <h2>Announcements</h2>
    <button class="btn btn-primary" onclick="openAnnouncementForm()">
      <span class="icon">➕</span>
      <span>Add Announcement</span>
    </button>
  </div>
  
  <div class="search-filter">
    <div class="search-container">
      <span class="search-icon">🔍</span>
      <input type="text" id="announcementSearch" placeholder="Search announcements..." onkeyup="searchAnnouncements()">
    </div>
    
    <div class="filter-tabs">
      <button class="filter-tab active" data-filter="all" onclick="filterAnnouncements('all')">All</button>
      <button class="filter-tab" data-filter="pinned" onclick="filterAnnouncements('pinned')">Pinned</button>
    </div>
  </div>
  
  <div class="announcements-list" id="announcementsList">
    <?php if(count($announcements) > 0): ?>
      <?php foreach($announcements as $announcement): ?>
        <div class="announcement-card" data-announcement-id="<?php echo $announcement['id']; ?>">
          <div class="announcement-header">
            <div class="announcement-title">
              <?php if($announcement['is_pinned']): ?>
                <span class="pin-indicator" title="Pinned announcement"></span>
              <?php endif; ?>
              <h3><?php echo $announcement['title']; ?></h3>
              <div class="announcement-date">
                <span class="icon">📅</span>
                <span><?php echo date('F j, Y', strtotime($announcement['date'])); ?></span>
              </div>
            </div>
            
            <div class="announcement-actions">
              <button class="btn btn-sm btn-outline" onclick="togglePin(<?php echo $announcement['id']; ?>, <?php echo $announcement['is_pinned'] ? 'false' : 'true'; ?>)">
                <?php echo $announcement['is_pinned'] ? 'Unpin' : 'Pin'; ?>
              </button>
              <button class="btn btn-sm btn-outline" onclick="editAnnouncement(<?php echo $announcement['id']; ?>)">
                <span class="icon">✏️</span>
              </button>
              <button class="btn btn-sm btn-outline" onclick="deleteAnnouncement(<?php echo $announcement['id']; ?>)">
                <span class="icon">🗑️</span>
              </button>
            </div>
          </div>
          
          <div class="announcement-content">
            <?php echo $announcement['content']; ?>
          </div>
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <div class="empty-state">
        <div class="empty-icon">🕒</div>
        <p class="empty-title">No announcements found</p>
        <p class="empty-description">Create a new announcement or adjust your search</p>
      </div>
    <?php endif; ?>
  </div>
</div>

<!-- Announcement Form Modal -->
<div class="modal" id="announcementModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="announcementModalTitle">New Announcement</h2>
      <button class="close-btn" onclick="closeAnnouncementModal()">&times;</button>
    </div>
    
    <div class="modal-body">
      <form id="announcementForm">
        <input type="hidden" id="announcementId" name="id" value="">
        
        <div class="form-group">
          <label for="announcementTitle">Title</label>
          <input type="text" id="announcementTitle" name="title" required>
        </div>
        
        <div class="form-group">
          <label for="announcementContent">Content</label>
          <div class="editor-container">
            <textarea id="announcementContent" name="content" class="content-editor" rows="10" required></textarea>
          </div>
        </div>
        
        <div class="form-group">
          <label for="announcementDate">Date</label>
          <input type="date" id="announcementDate" name="date" required>
        </div>
        
        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" id="announcementPinned" name="is_pinned">
            <span>Pin this announcement</span>
          </label>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-outline" onclick="closeAnnouncementModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Announcement</button>
        </div>
      </form>
    </div>
  </div>
</div>