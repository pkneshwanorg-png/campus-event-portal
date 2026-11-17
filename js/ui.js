/**
 * ui.js
 * Handles shared UI elements: navbar rendering, footer rendering, toast alerts, modals,
 * countdown timers, empty state cards, and service slot card generation.
 * 
 * BARBERSHOP CONTEXT MAPPING:
 * - 'Navbar' & 'Footer' display Barbershop branding and customer/owner links.
 * - 'renderEventCard' generates Service Slot cards (with Barber/Chair, Date/Time, and Slots Left).
 * - 'renderEmptyState' displays empty messages for missing service slots or client bookings.
 */

// Show in-app toast message (success, danger, warning, info)
function showToast(message, type) {
  var toastType = type || "success";
  var container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  var toast = document.createElement("div");
  toast.className = "toast toast-" + toastType;
  toast.innerHTML = "<span>" + message + "</span>";

  container.appendChild(toast);

  // Auto remove after 3.5 seconds
  setTimeout(function() {
    toast.style.opacity = "0";
    setTimeout(function() {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }, 3500);
}

// Render dynamic navigation bar based on logged-in role (Customer vs Shop Owner)
function renderNavbar(activePage) {
  var navEl = document.getElementById("app-navbar");
  if (!navEl) return;

  var user = getCurrentUser();
  var userSectionHtml = "";

  if (user) {
    if (user.role === "admin") {
      userSectionHtml = 
        '<span class="nav-user-badge">Shop Owner</span>' +
        '<a href="admin.html" class="' + (activePage === "admin" ? "active" : "") + '">Owner Dashboard</a>' +
        '<button class="btn btn-secondary btn-sm" onclick="handleLogout()">Logout</button>';
    } else {
      userSectionHtml = 
        '<span class="nav-user-badge">Customer: ' + (user.name || "Client") + ' (' + user.regNo + ')</span>' +
        '<a href="index.html?view=my-registrations" class="' + (activePage === "my-registrations" ? "active" : "") + '">My Bookings</a>' +
        '<button class="btn btn-secondary btn-sm" onclick="handleLogout()">Logout</button>';
    }
  } else {
    userSectionHtml = 
      '<button class="btn btn-secondary btn-sm" onclick="openStudentLoginModal()">Customer Login</button>' +
      '<button class="btn btn-primary btn-sm" onclick="openAdminLoginModal()">Owner Login</button>';
  }

  navEl.innerHTML = 
    '<div class="container nav-container">' +
      '<a href="index.html" class="logo">' +
        '<span class="logo-badge">BS</span>' +
        '<span>Barbershop Portal</span>' +
      '</a>' +
      '<ul class="nav-links">' +
        '<li><a href="index.html" class="' + (activePage === "events" ? "active" : "") + '">Browse Slots</a></li>' +
        (user && user.role === "student" ? '<li><a href="index.html?view=my-registrations" class="' + (activePage === "my-registrations" ? "active" : "") + '">My Bookings</a></li>' : '') +
        (user && user.role === "admin" ? '<li><a href="admin.html" class="' + (activePage === "admin" ? "active" : "") + '">Owner Dashboard</a></li>' : '') +
        '<li>' + userSectionHtml + '</li>' +
      '</ul>' +
    '</div>';
}

// Render consistent footer across pages
function renderFooter() {
  var footerEl = document.getElementById("app-footer");
  if (!footerEl) {
    footerEl = document.querySelector(".site-footer");
  }
  if (!footerEl) return;

  footerEl.innerHTML = 
    '<div class="container">' +
      '<div class="footer-content">' +
        '<div class="footer-brand">' +
          '<a href="index.html" class="logo">' +
            '<span class="logo-badge">BS</span>' +
            '<span>Barbershop Appointment Portal</span>' +
          '</a>' +
          '<p class="footer-desc">' +
            'Online appointment scheduling system for modern barbershops. Choose your service, select your preferred barber, and book your grooming slot in seconds.' +
          '</p>' +
        '</div>' +

        '<div>' +
          '<div class="footer-title">Quick Links</div>' +
          '<ul class="footer-list">' +
            '<li><a href="index.html">Browse Service Slots</a></li>' +
            '<li><a href="index.html?view=my-registrations">My Bookings</a></li>' +
            '<li><a href="admin.html">Shop Owner Dashboard</a></li>' +
            '<li><a href="https://github.com/pkneshwanorg-png/campus-event-portal" target="_blank" rel="noopener">GitHub Repository</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +

      '<div class="footer-bottom">' +
        '<div>Barbershop Appointment & Management Portal • CSE326 Web Development</div>' +
        '<div>Pure Vanilla HTML5 / CSS3 / JavaScript</div>' +
      '</div>' +
    '</div>';
}

// Helper to render reusable empty-state HTML
function renderEmptyState(options) {
  var icon = options.icon || "";
  var title = options.title || "No appointment slots found";
  var desc = options.desc || "There are no slots to display matching your criteria.";
  var actionBtn = options.actionBtn || "";

  return (
    '<div class="empty-state">' +
      (icon ? '<span class="empty-state-icon">' + icon + '</span>' : '') +
      '<h3 class="empty-state-title">' + title + '</h3>' +
      '<p class="empty-state-desc">' + desc + '</p>' +
      (actionBtn ? '<div class="empty-state-action">' + actionBtn + '</div>' : '') +
    '</div>'
  );
}

// Helper to log out
function handleLogout() {
  clearCurrentUser();
  showToast("Logged out successfully.", "info");
  setTimeout(function() {
    window.location.href = "index.html";
  }, 500);
}

// Render dynamic countdown text (e.g. "Starts in: 3d 4h 12m" or "Slot in progress")
function calculateCountdown(dateString, timeString) {
  var target = new Date(dateString + " " + (timeString || "00:00"));
  if (isNaN(target.getTime())) {
    target = new Date(dateString);
  }
  var now = new Date();
  var diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) {
    return "Slot in progress or concluded";
  }

  var days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return "Starts in: " + days + "d " + hours + "h " + minutes + "m";
  }
  return "Starts in: " + hours + "h " + minutes + "m";
}

// Render a single service slot card for the browsing page
function renderEventCard(event) {
  var seats = getSeatsInfo(event.id);
  var percentFilled = Math.round((seats.registered / seats.capacity) * 100);
  if (isNaN(percentFilled)) percentFilled = 0;

  var fillClass = "";
  if (percentFilled >= 90) fillClass = "fill-danger";
  else if (percentFilled >= 70) fillClass = "fill-warning";

  var catKey = event.category ? event.category.toLowerCase().replace(/[^a-z0-9]/g, "-") : "haircut";
  var categoryBadgeClass = "badge-" + catKey;
  
  var statusBadge = seats.isFull 
    ? '<span class="event-badge badge-full">Fully Booked</span>' 
    : '<span class="event-badge badge-open">' + seats.left + ' ' + (seats.left === 1 ? 'Slot Left' : 'Slots Left') + '</span>';

  var buttonHtml = seats.isFull
    ? '<button class="btn btn-secondary btn-sm" disabled>Slot Full</button>'
    : '<a href="event.html?id=' + encodeURIComponent(event.id) + '" class="btn btn-primary btn-sm">Book Appointment</a>';

  var countdownText = calculateCountdown(event.date, event.time);

  return (
    '<div class="event-card">' +
      '<div class="event-card-header">' +
        '<div>' +
          '<span class="event-badge ' + categoryBadgeClass + '">' + (event.category || "Haircut") + '</span>' +
          '<h3 class="event-title">' + event.title + '</h3>' +
        '</div>' +
        statusBadge +
      '</div>' +
      '<div class="event-card-body">' +
        '<div class="event-meta">' +
          '<div class="event-meta-item"><span class="event-meta-icon">Date:</span> <div><strong>' + event.date + '</strong> at ' + event.time + '</div></div>' +
          '<div class="event-meta-item"><span class="event-meta-icon">Barber:</span> <div>' + event.venue + '</div></div>' +
          '<div class="event-meta-item"><span class="event-meta-icon">Notes:</span> <div>' + event.eligibility + '</div></div>' +
        '</div>' +
        '<p class="event-desc">' + event.description + '</p>' +
        '<div class="countdown-box">' + countdownText + '</div>' +
        '<div class="seats-progress">' +
          '<div class="seats-label">' +
            '<span>Slot Capacity</span>' +
            '<span>' + seats.registered + ' / ' + seats.capacity + ' booked</span>' +
          '</div>' +
          '<div class="progress-bar-bg">' +
            '<div class="progress-bar-fill ' + fillClass + '" style="width: ' + percentFilled + '%;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="event-card-footer">' +
        '<small class="text-muted">' + (seats.isFull ? "No slots available" : "Available now") + '</small>' +
        buttonHtml +
      '</div>' +
    '</div>'
  );
}
