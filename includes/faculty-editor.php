<?php
  // Get faculty members
  $faculty = getFacultyMembers();
?>
<div class="editor-container">
  <div class="editor-header">
    <h2>Faculty Management</h2>
    <button class="btn btn-primary" onclick="openFacultyForm()">
      <span class="icon">➕</span>
      <span>Add Faculty Member</span>
    </button>
  </div>
  
  <div class="search-container">
    <span class="search-icon">🔍</span>
    <input type="text" id="facultySearch" placeholder="Search faculty by name, department, or position..." onkeyup="searchFaculty()">
  </div>
  
  <div class="faculty-grid" id="facultyGrid">
    <?php if(count($faculty) > 0): ?>
      <?php foreach($faculty as $member): ?>
        <div class="faculty-card" data-faculty-id="<?php echo $member['id']; ?>">
          <div class="faculty-image">
            <img src="<?php echo $member['image_url']; ?>" alt="<?php echo $member['name']; ?>">
          </div>
          
          <div class="faculty-header">
            <h3><?php echo $member['name']; ?></h3>
            <p class="faculty-position"><?php echo $member['position']; ?> • <?php echo $member['department']; ?></p>
          </div>
          
          <div class="faculty-content">
            <div class="faculty-info">
              <p><strong>Email:</strong> <?php echo $member['email']; ?></p>
              <p><strong>Phone:</strong> <?php echo $member['phone']; ?></p>
              <p class="faculty-bio"><?php echo $member['bio']; ?></p>
            </div>
          </div>
          
          <div class="faculty-actions">
            <button class="btn btn-sm btn-outline" onclick="editFaculty(<?php echo $member['id']; ?>)">
              <span class="icon">✏️</span>
              <span>Edit</span>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteFaculty(<?php echo $member['id']; ?>)">
              <span class="icon">🗑️</span>
              <span>Delete</span>
            </button>
          </div>
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <div class="empty-state col-span-full">
        <p>No faculty members found. Add your first faculty member.</p>
      </div>
    <?php endif; ?>
  </div>
</div>

<!-- Faculty Form Modal -->
<div class="modal" id="facultyModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="facultyModalTitle">Add New Faculty Member</h2>
      <button class="close-btn" onclick="closeFacultyModal()">&times;</button>
    </div>
    
    <div class="modal-body">
      <form id="facultyForm" enctype="multipart/form-data">
        <input type="hidden" id="facultyId" name="id" value="">
        
        <div class="form-grid">
          <div class="form-group col-span-2">
            <label for="facultyName">Full Name</label>
            <input type="text" id="facultyName" name="name" placeholder="Dr. Jane Smith" required>
          </div>
          
          <div class="form-group">
            <label for="facultyPosition">Position</label>
            <input type="text" id="facultyPosition" name="position" placeholder="Principal" required>
          </div>
          
          <div class="form-group">
            <label for="facultyDepartment">Department</label>
            <input type="text" id="facultyDepartment" name="department" placeholder="Administration" required>
          </div>
          
          <div class="form-group">
            <label for="facultyEmail">Email</label>
            <input type="email" id="facultyEmail" name="email" placeholder="jane.smith@school.edu" required>
          </div>
          
          <div class="form-group">
            <label for="facultyPhone">Phone</label>
            <input type="text" id="facultyPhone" name="phone" placeholder="(555) 123-4567">
          </div>
          
          <div class="form-group col-span-2">
            <label for="facultyBio">Biography</label>
            <textarea id="facultyBio" name="bio" rows="4" placeholder="Enter faculty member's biography..."></textarea>
          </div>
          
          <div class="form-group col-span-2">
            <label>Profile Image</label>
            <div class="image-upload">
              <div class="image-preview" id="facultyImagePreview">
                <span class="no-image">No image</span>
              </div>
              
              <div class="upload-actions">
                <input type="hidden" id="facultyImageUrl" name="image_url" value="">
                <input type="file" id="facultyImageFile" name="image_file" accept="image/*" style="display: none;">
                <button type="button" class="btn btn-outline" onclick="document.getElementById('facultyImageFile').click()">
                  <span class="icon">📤</span>
                  <span>Upload Image</span>
                </button>
                <button type="button" class="btn btn-outline" onclick="generateAvatar()">
                  <span class="icon">👤</span>
                  <span>Generate Avatar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-outline" onclick="closeFacultyModal()">Cancel</button>
          <button type="submit" class="btn btn-primary" id="facultySaveBtn">Add Faculty</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Delete Confirmation Modal -->
<div class="modal" id="deleteFacultyModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Confirm Deletion</h2>
      <button class="close-btn" onclick="closeDeleteFacultyModal()">&times;</button>
    </div>
    
    <div class="modal-body">
      <p>Are you sure you want to delete <span id="deleteFacultyName"></span>? This action cannot be undone.</p>
      
      <div class="form-actions">
        <button type="button" class="btn btn-outline" onclick="closeDeleteFacultyModal()">Cancel</button>
        <button type="button" class="btn btn-danger" onclick="confirmDeleteFaculty()">Delete</button>
      </div>
    </div>
  </div>
</div>