// AJAX function to save data without page reload
function ajaxSave(formData, endpoint, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", endpoint, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (callback) callback(xhr.responseText);
      } else {
        alert("Error saving data. Please try again.");
      }
    }
  };
  xhr.send(formData);
}

// Save changes for the current tab
function saveChanges() {
  // Get the active tab
  const activeTab = document
    .querySelector(".tab.active")
    .getAttribute("data-tab");

  // Create a form data object
  const formData = new FormData();

  // Add the active tab to the form data
  formData.append("tab", activeTab);

  // Add form fields based on the active tab
  switch (activeTab) {
    case "landing-page":
      // Get all landing page elements
      const elements = document.querySelectorAll(".landing-page-element");
      elements.forEach((element, index) => {
        const id = element.getAttribute("data-id");
        const type = element.getAttribute("data-type");
        const content = element.querySelector(".element-content").innerHTML;

        formData.append(`elements[${index}][id]`, id);
        formData.append(`elements[${index}][type]`, type);
        formData.append(`elements[${index}][content]`, content);
        formData.append(`elements[${index}][position]`, index);
      });
      break;

    case "announcements":
      // Get all announcement fields
      const announcements = document.querySelectorAll(".announcement-item");
      announcements.forEach((announcement, index) => {
        const id = announcement.getAttribute("data-id");
        const title = announcement.querySelector(".announcement-title").value;
        const content = announcement.querySelector(
          ".announcement-content",
        ).value;
        const date = announcement.querySelector(".announcement-date").value;
        const isPinned = announcement.querySelector(".announcement-pin").checked
          ? 1
          : 0;

        formData.append(`announcements[${index}][id]`, id);
        formData.append(`announcements[${index}][title]`, title);
        formData.append(`announcements[${index}][content]`, content);
        formData.append(`announcements[${index}][date]`, date);
        formData.append(`announcements[${index}][is_pinned]`, isPinned);
      });
      break;

    case "faculty":
      // Get all faculty fields
      const faculty = document.querySelectorAll(".faculty-item");
      faculty.forEach((member, index) => {
        const id = member.getAttribute("data-id");
        const name = member.querySelector(".faculty-name").value;
        const position = member.querySelector(".faculty-position").value;
        const department = member.querySelector(".faculty-department").value;
        const email = member.querySelector(".faculty-email").value;
        const phone = member.querySelector(".faculty-phone").value;
        const bio = member.querySelector(".faculty-bio").value;
        const imageUrl = member.querySelector(".faculty-image").value;

        formData.append(`faculty[${index}][id]`, id);
        formData.append(`faculty[${index}][name]`, name);
        formData.append(`faculty[${index}][position]`, position);
        formData.append(`faculty[${index}][department]`, department);
        formData.append(`faculty[${index}][email]`, email);
        formData.append(`faculty[${index}][phone]`, phone);
        formData.append(`faculty[${index}][bio]`, bio);
        formData.append(`faculty[${index}][image_url]`, imageUrl);
      });
      break;

    case "contact":
      // Get all contact fields
      const address = document.querySelector("#contact-address").value;
      const city = document.querySelector("#contact-city").value;
      const state = document.querySelector("#contact-state").value;
      const zipCode = document.querySelector("#contact-zip").value;
      const mainPhone = document.querySelector("#contact-main-phone").value;
      const altPhone = document.querySelector("#contact-alt-phone").value;
      const fax = document.querySelector("#contact-fax").value;
      const email = document.querySelector("#contact-email").value;
      const website = document.querySelector("#contact-website").value;

      formData.append("contact[address]", address);
      formData.append("contact[city]", city);
      formData.append("contact[state]", state);
      formData.append("contact[zip_code]", zipCode);
      formData.append("contact[main_phone]", mainPhone);
      formData.append("contact[alternate_phone]", altPhone);
      formData.append("contact[fax]", fax);
      formData.append("contact[email]", email);
      formData.append("contact[website]", website);

      // Get social media links
      const socialMedia = document.querySelectorAll(".social-media-item");
      socialMedia.forEach((item, index) => {
        const id = item.getAttribute("data-id");
        const platform = item.querySelector(".social-platform").value;
        const url = item.querySelector(".social-url").value;

        formData.append(`social_media[${index}][id]`, id);
        formData.append(`social_media[${index}][platform]`, platform);
        formData.append(`social_media[${index}][url]`, url);
      });
      break;

    case "customization":
      // Get all customization fields
      const primaryColor = document.querySelector("#primary-color").value;
      const secondaryColor = document.querySelector("#secondary-color").value;
      const accentColor = document.querySelector("#accent-color").value;
      const backgroundColor = document.querySelector("#background-color").value;
      const textColor = document.querySelector("#text-color").value;
      const headingFont = document.querySelector("#heading-font").value;
      const bodyFont = document.querySelector("#body-font").value;
      const headingSize = document.querySelector("#heading-size").value;
      const bodySize = document.querySelector("#body-size").value;
      const containerWidth = document.querySelector("#container-width").value;
      const spacing = document.querySelector("#spacing").value;
      const roundedCorners = document.querySelector("#rounded-corners").checked
        ? 1
        : 0;
      const useShadows = document.querySelector("#use-shadows").checked ? 1 : 0;

      formData.append("customization[primary_color]", primaryColor);
      formData.append("customization[secondary_color]", secondaryColor);
      formData.append("customization[accent_color]", accentColor);
      formData.append("customization[background_color]", backgroundColor);
      formData.append("customization[text_color]", textColor);
      formData.append("customization[heading_font]", headingFont);
      formData.append("customization[body_font]", bodyFont);
      formData.append("customization[heading_size]", headingSize);
      formData.append("customization[body_size]", bodySize);
      formData.append("customization[container_width]", containerWidth);
      formData.append("customization[spacing]", spacing);
      formData.append("customization[rounded_corners]", roundedCorners);
      formData.append("customization[use_shadows]", useShadows);
      break;
  }

  // Send the data to the server
  ajaxSave(formData, "save-data.php", function (response) {
    alert("Changes saved successfully!");
  });
}

// Initialize drag and drop functionality for landing page elements
function initDragAndDrop() {
  const elementsList = document.querySelector(".elements-list");
  if (!elementsList) return;

  // Make elements draggable
  const elements = elementsList.querySelectorAll(".landing-page-element");
  elements.forEach((element) => {
    element.setAttribute("draggable", "true");
    element.addEventListener("dragstart", handleDragStart);
    element.addEventListener("dragover", handleDragOver);
    element.addEventListener("dragenter", handleDragEnter);
    element.addEventListener("dragleave", handleDragLeave);
    element.addEventListener("drop", handleDrop);
    element.addEventListener("dragend", handleDragEnd);
  });
}

// Drag and drop event handlers
let dragSrcElement = null;

function handleDragStart(e) {
  dragSrcElement = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.outerHTML);
  this.classList.add("dragging");
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDragEnter(e) {
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (dragSrcElement !== this) {
    const parent = this.parentNode;
    const srcIndex = Array.from(parent.children).indexOf(dragSrcElement);
    const destIndex = Array.from(parent.children).indexOf(this);

    if (srcIndex < destIndex) {
      parent.insertBefore(dragSrcElement, this.nextSibling);
    } else {
      parent.insertBefore(dragSrcElement, this);
    }

    // Update positions
    updateElementPositions();
  }

  return false;
}

function handleDragEnd(e) {
  const elements = document.querySelectorAll(".landing-page-element");
  elements.forEach((element) => {
    element.classList.remove("over");
    element.classList.remove("dragging");
  });
}

// Update element positions after drag and drop
function updateElementPositions() {
  const elements = document.querySelectorAll(".landing-page-element");
  elements.forEach((element, index) => {
    element.setAttribute("data-position", index);
  });
}

// Initialize the CMS when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Initialize drag and drop
  initDragAndDrop();

  // Add event listeners for tab switching
  const tabButtons = document.querySelectorAll(".tab");
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      switchTab(tabId);
    });
  });
});
