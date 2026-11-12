/**
 * storage.js
 * Helpers to read, write, and seed data in browser localStorage.
 * Everything is kept simple and beginner-friendly for college viva.
 */

// Storage keys used across the entire application
var STORAGE_KEYS = {
  EVENTS: "campus_events",
  REGISTRATIONS: "campus_registrations",
  CURRENT_USER: "campus_current_user"
};

// 5 initial sample events to seed if localStorage is empty
var SAMPLE_EVENTS = [
  {
    id: "evt-1",
    title: "Hackathon 2026: Code for Future",
    date: "2026-11-20",
    time: "09:00 AM",
    venue: "Main Auditorium, Block 34",
    description: "An intensive 24-hour coding sprint building AI and Web apps to solve real campus problems. Food and certificates provided.",
    eligibility: "Open to B.Tech CSE, IT & MCA students (All Years)",
    category: "Technical",
    capacity: 50
  },
  {
    id: "evt-2",
    title: "AI & Machine Learning Hands-on Workshop",
    date: "2026-11-25",
    time: "02:00 PM",
    venue: "Lab 402, Computer Block",
    description: "Step-by-step masterclass covering Python data libraries, neural networks, and deploying models with Google Colab.",
    eligibility: "Open to all engineering students with basic Python knowledge",
    category: "Workshop",
    capacity: 35
  },
  {
    id: "evt-3",
    title: "Battle of the Bands & Acoustic Night",
    date: "2026-12-05",
    time: "05:30 PM",
    venue: "Open Air Theatre (OAT)",
    description: "Annual cultural inter-college musical showdown featuring college bands, solo vocals, and beatboxers.",
    eligibility: "Open to all university students & faculty",
    category: "Cultural",
    capacity: 80
  },
  {
    id: "evt-4",
    title: "Inter-Department Cricket Tournament",
    date: "2026-12-10",
    time: "08:00 AM",
    venue: "University Sports Ground",
    description: "T20 Knockout championship. Trophy, medals, and exciting cash prizes for winners and runners-up.",
    eligibility: "Open to department registered teams",
    category: "Sports",
    capacity: 40
  },
  {
    id: "evt-5",
    title: "Web Development Masterclass (HTML/CSS/JS)",
    date: "2026-12-15",
    time: "10:30 AM",
    venue: "Seminar Hall 2, Innovation Centre",
    description: "Learn modern responsive frontend design, vanilla JavaScript DOM manipulation, and GitHub Pages deployment.",
    eligibility: "All undergraduate students welcome",
    category: "Workshop",
    capacity: 30
  }
];

// Helper to seed sample events on first application launch
function initStorage() {
  var storedEvents = localStorage.getItem(STORAGE_KEYS.EVENTS);
  if (!storedEvents) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(SAMPLE_EVENTS));
  }
  var storedRegs = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  if (!storedRegs) {
    // Add 2-3 sample registrations so the seat counts and admin charts have data right away
    var initialRegistrations = [
      {
        ticketId: "TCK-1001",
        eventId: "evt-1",
        regNo: "123001",
        name: "Aman Sharma",
        email: "aman@example.com",
        registeredAt: "2026-11-10T10:00:00.000Z"
      },
      {
        ticketId: "TCK-1002",
        eventId: "evt-1",
        regNo: "123002",
        name: "Priya Patel",
        email: "priya@example.com",
        registeredAt: "2026-11-10T11:15:00.000Z"
      },
      {
        ticketId: "TCK-1003",
        eventId: "evt-2",
        regNo: "123001",
        name: "Aman Sharma",
        email: "aman@example.com",
        registeredAt: "2026-11-11T09:30:00.000Z"
      }
    ];
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(initialRegistrations));
  }
}

// Read events array from localStorage
function getStoredEvents() {
  initStorage();
  var data = localStorage.getItem(STORAGE_KEYS.EVENTS);
  return data ? JSON.parse(data) : [];
}

// Save events array to localStorage
function saveStoredEvents(eventsArray) {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(eventsArray));
}

// Read registrations array from localStorage
function getStoredRegistrations() {
  initStorage();
  var data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  return data ? JSON.parse(data) : [];
}

// Save registrations array to localStorage
function saveStoredRegistrations(registrationsArray) {
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrationsArray));
}

// Get the currently logged-in user profile from localStorage
function getCurrentUser() {
  var data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

// Set or log in the current user (e.g. { role: 'student', regNo: '12345', name: 'Rohan' } or { role: 'admin' })
function setCurrentUser(userObject) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userObject));
}

// Log out the current user by removing key
function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

