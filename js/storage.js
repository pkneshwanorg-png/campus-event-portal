/**
 * storage.js
 * Helpers to read, write, and seed data in browser localStorage.
 * 
 * BARBERSHOP CONTEXT MAPPING:
 * - 'EVENTS' represents Service Slots (haircut/shave/styling time slots with barbers).
 * - 'REGISTRATIONS' represents Customer Bookings.
 * - 'CURRENT_USER' represents either Customer (phone + name) or Shop Owner (admin).
 */

// Storage keys for barbershop appointments and bookings
var STORAGE_KEYS = {
  EVENTS: "barbershop_slots",
  REGISTRATIONS: "barbershop_bookings",
  CURRENT_USER: "barbershop_current_user"
};

// 5 initial barbershop service slots to seed if localStorage is empty
var SAMPLE_EVENTS = [
  {
    id: "evt-1",
    title: "Classic Haircut & Styling with Rahul",
    date: "2026-11-20",
    time: "10:00 AM",
    venue: "Chair 1 - Master Barber Rahul",
    description: "Precision tailored haircut, neck taper, hot towel finish and styling with premium pomade. Price: Rs. 250.",
    eligibility: "Please arrive 5 minutes before your slot. Walk-ins not accepted.",
    category: "Haircut",
    capacity: 2
  },
  {
    id: "evt-2",
    title: "Beard Sculpt & Razor Shave with Amit",
    date: "2026-11-20",
    time: "11:30 AM",
    venue: "Chair 2 - Stylist Amit",
    description: "Beard shaping, hot lather straight-razor edge line-up, warm towel therapy, and organic beard oil treatment. Price: Rs. 180.",
    eligibility: "Patch test recommended for sensitive skin.",
    category: "Beard Trim",
    capacity: 1
  },
  {
    id: "evt-3",
    title: "Executive Grooming Combo with Vikram",
    date: "2026-11-21",
    time: "02:00 PM",
    venue: "VIP Suite - Vikram",
    description: "Complete signature package: haircut, beard trim, charcoal deep cleanse face wash, and head massage. Price: Rs. 550.",
    eligibility: "Full appointment duration is approximately 45 minutes.",
    category: "Combo",
    capacity: 2
  },
  {
    id: "evt-4",
    title: "De-Tan Facial & Scalp Massage with Rahul",
    date: "2026-11-22",
    time: "04:00 PM",
    venue: "Chair 1 - Master Barber Rahul",
    description: "Herbal de-tan treatment with steam, gentle exfoliating scrub, blackhead extraction, and acupressure scalp massage. Price: Rs. 400.",
    eligibility: "Avoid direct prolonged sun exposure immediately following facial.",
    category: "Facial",
    capacity: 1
  },
  {
    id: "evt-5",
    title: "Global Hair Color & Highlights with Suresh",
    date: "2026-11-25",
    time: "03:00 PM",
    venue: "Color Station - Suresh",
    description: "Ammonia-free organic hair color application or subtle highlights. Includes nourishing hair wash and blow dry. Price: Rs. 600.",
    eligibility: "Bring a reference photo if requesting custom shades or highlights.",
    category: "Hair Color",
    capacity: 3
  }
];

// Helper to seed sample slots on first application launch
function initStorage() {
  var storedEvents = localStorage.getItem(STORAGE_KEYS.EVENTS);
  if (!storedEvents) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(SAMPLE_EVENTS));
  }
  var storedRegs = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  if (!storedRegs) {
    // Add sample bookings so slot counts and owner charts have live demo data
    var initialRegistrations = [
      {
        ticketId: "BK-1001",
        eventId: "evt-1",
        regNo: "9876543210",
        name: "Aman Sharma",
        email: "aman@example.com",
        registeredAt: "2026-11-10T10:00:00.000Z"
      },
      {
        ticketId: "BK-1002",
        eventId: "evt-1",
        regNo: "9876543211",
        name: "Priya Patel",
        email: "priya@example.com",
        registeredAt: "2026-11-10T11:15:00.000Z"
      },
      {
        ticketId: "BK-1003",
        eventId: "evt-2",
        regNo: "9876543210",
        name: "Aman Sharma",
        email: "aman@example.com",
        registeredAt: "2026-11-11T09:30:00.000Z"
      }
    ];
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(initialRegistrations));
  }
}

// Read service slots array from localStorage
function getStoredEvents() {
  initStorage();
  var data = localStorage.getItem(STORAGE_KEYS.EVENTS);
  return data ? JSON.parse(data) : [];
}

// Save service slots array to localStorage
function saveStoredEvents(eventsArray) {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(eventsArray));
}

// Read bookings array from localStorage
function getStoredRegistrations() {
  initStorage();
  var data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  return data ? JSON.parse(data) : [];
}

// Save bookings array to localStorage
function saveStoredRegistrations(registrationsArray) {
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrationsArray));
}

// Get the currently logged-in user profile from localStorage
function getCurrentUser() {
  var data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

// Set or log in the current user (e.g. { role: 'student', regNo: '9876543210', name: 'Rohan' } or { role: 'admin' })
function setCurrentUser(userObject) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userObject));
}

// Log out the current user by removing key
function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}
