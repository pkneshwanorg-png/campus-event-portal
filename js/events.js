/**
 * events.js
 * Handles operations on events: create, edit, delete, find, and seat calculation.
 */

// Return all events
function getAllEvents() {
  return getStoredEvents();
}

// Find a single event by its unique ID
function getEventById(eventId) {
  var events = getAllEvents();
  for (var i = 0; i < events.length; i++) {
    if (events[i].id === eventId) {
      return events[i];
    }
  }
  return null;
}

// Calculate remaining seats for an event: capacity minus existing registrations
function getSeatsInfo(eventId) {
  var event = getEventById(eventId);
  if (!event) return { capacity: 0, registered: 0, left: 0, isFull: true };

  var registrations = getStoredRegistrations();
  var count = 0;
  for (var i = 0; i < registrations.length; i++) {
    if (registrations[i].eventId === eventId) {
      count++;
    }
  }

  var capacity = parseInt(event.capacity, 10) || 0;
  var left = capacity - count;
  if (left < 0) left = 0;

  return {
    capacity: capacity,
    registered: count,
    left: left,
    isFull: left <= 0
  };
}

// Create a new event and save to storage
function createEvent(eventData) {
  var events = getAllEvents();
  // Generate a simple unique ID using timestamp
  var newId = "evt-" + Date.now();
  var newEvent = {
    id: newId,
    title: eventData.title.trim(),
    date: eventData.date,
    time: eventData.time,
    venue: eventData.venue.trim(),
    description: eventData.description.trim(),
    eligibility: eventData.eligibility.trim(),
    category: eventData.category,
    capacity: parseInt(eventData.capacity, 10) || 0
  };

  events.push(newEvent);
  saveStoredEvents(events);
  return newEvent;
}

// Update an existing event by ID
function updateEvent(eventId, updatedData) {
  var events = getAllEvents();
  for (var i = 0; i < events.length; i++) {
    if (events[i].id === eventId) {
      events[i].title = updatedData.title.trim();
      events[i].date = updatedData.date;
      events[i].time = updatedData.time;
      events[i].venue = updatedData.venue.trim();
      events[i].description = updatedData.description.trim();
      events[i].eligibility = updatedData.eligibility.trim();
      events[i].category = updatedData.category;
      events[i].capacity = parseInt(updatedData.capacity, 10) || 0;
      saveStoredEvents(events);
      return events[i];
    }
  }
  return null;
}

// Delete an event and also clear its registrations
function deleteEvent(eventId) {
  var events = getAllEvents();
  var filteredEvents = [];
  for (var i = 0; i < events.length; i++) {
    if (events[i].id !== eventId) {
      filteredEvents.push(events[i]);
    }
  }
  saveStoredEvents(filteredEvents);

  // Remove related registrations to keep storage tidy
  var registrations = getStoredRegistrations();
  var remainingRegs = [];
  for (var j = 0; j < registrations.length; j++) {
    if (registrations[j].eventId !== eventId) {
      remainingRegs.push(registrations[j]);
    }
  }
  saveStoredRegistrations(remainingRegs);
}

