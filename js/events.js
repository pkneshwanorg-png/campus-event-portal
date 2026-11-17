/**
 * events.js
 * Handles operations on service slots: create, edit, delete, find, and available slot calculations.
 * 
 * BARBERSHOP CONTEXT MAPPING:
 * - 'Event' represents a Service Slot (e.g. Haircut or Styling with a specific barber).
 * - 'Venue' represents the Barber / Chair.
 * - 'Category' represents the Service Type (Haircut, Beard Trim, Shave, Hair Color, Facial, Combo).
 * - 'Capacity' represents Available Chairs / Slots per time interval (typically 1-3).
 * - 'Eligibility' represents Booking Notes / Requirements (e.g. arrival time, reference photo).
 */

// Return all service slots
function getAllEvents() {
  return getStoredEvents();
}

// Find a single service slot by its unique ID
function getEventById(eventId) {
  var events = getAllEvents();
  for (var i = 0; i < events.length; i++) {
    if (events[i].id === eventId) {
      return events[i];
    }
  }
  return null;
}

// Calculate remaining slots: capacity minus existing customer bookings
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

// Create a new service slot and save to storage
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

// Update an existing service slot by ID
function updateEvent(eventId, updatedData) {
  var events = getAllEvents();
  for (var i = 0; i < events.length; i++) {
    if (events[i].id === eventId) {
      if (updatedData.title !== undefined) events[i].title = updatedData.title.trim();
      if (updatedData.date !== undefined) events[i].date = updatedData.date;
      if (updatedData.time !== undefined) events[i].time = updatedData.time;
      if (updatedData.venue !== undefined) events[i].venue = updatedData.venue.trim();
      if (updatedData.description !== undefined) events[i].description = updatedData.description.trim();
      if (updatedData.eligibility !== undefined) events[i].eligibility = updatedData.eligibility.trim();
      if (updatedData.category !== undefined) events[i].category = updatedData.category;
      if (updatedData.capacity !== undefined) events[i].capacity = parseInt(updatedData.capacity, 10) || 0;
      saveStoredEvents(events);
      return events[i];
    }
  }
  return null;
}

// Delete a service slot and also clear its bookings
function deleteEvent(eventId) {
  var events = getAllEvents();
  var filteredEvents = [];
  for (var i = 0; i < events.length; i++) {
    if (events[i].id !== eventId) {
      filteredEvents.push(events[i]);
    }
  }
  saveStoredEvents(filteredEvents);

  // Remove related bookings to keep storage tidy
  var registrations = getStoredRegistrations();
  var remainingRegs = [];
  for (var j = 0; j < registrations.length; j++) {
    if (registrations[j].eventId !== eventId) {
      remainingRegs.push(registrations[j]);
    }
  }
  saveStoredRegistrations(remainingRegs);
}
