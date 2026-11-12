/**
 * registration.js
 * Handles student registration, duplicate prevention, seat limit validation,
 * cancellation, and ticket retrieval.
 */

// Check if a student with given regNo is already registered for an event
function isStudentAlreadyRegistered(eventId, regNo) {
  var registrations = getStoredRegistrations();
  var normalizedReg = String(regNo).trim().toLowerCase();
  for (var i = 0; i < registrations.length; i++) {
    var item = registrations[i];
    if (item.eventId === eventId && String(item.regNo).trim().toLowerCase() === normalizedReg) {
      return true;
    }
  }
  return false;
}

// Register student for an event with strict validation
function registerStudent(studentData) {
  var eventId = studentData.eventId;
  var regNo = studentData.regNo;
  var name = studentData.name;
  var email = studentData.email;

  // 1. Check if event exists
  var event = getEventById(eventId);
  if (!event) {
    return { success: false, message: "Event not found." };
  }

  // 2. Check seat availability (Strict: never allow over-registration)
  var seats = getSeatsInfo(eventId);
  if (seats.isFull || seats.left <= 0) {
    return { success: false, message: "Sorry, this event is already full! No seats left." };
  }

  // 3. Prevent duplicate registration
  if (isStudentAlreadyRegistered(eventId, regNo)) {
    return { success: false, message: "You are already registered for this event with Reg. No. " + regNo + "!" };
  }

  // 4. Create new registration entry
  var newTicketId = "TCK-" + Math.floor(100000 + Math.random() * 900000);
  var registrationRecord = {
    ticketId: newTicketId,
    eventId: eventId,
    regNo: String(regNo).trim(),
    name: name.trim(),
    email: email.trim(),
    registeredAt: new Date().toISOString()
  };

  var registrations = getStoredRegistrations();
  registrations.push(registrationRecord);
  saveStoredRegistrations(registrations);

  return {
    success: true,
    message: "Registration successful! Your ticket has been generated.",
    registration: registrationRecord
  };
}

// Cancel a registration by ticketId (frees up the seat immediately)
function cancelRegistration(ticketId) {
  var registrations = getStoredRegistrations();
  var initialLength = registrations.length;
  var updated = [];

  for (var i = 0; i < registrations.length; i++) {
    if (registrations[i].ticketId !== ticketId) {
      updated.push(registrations[i]);
    }
  }

  if (updated.length < initialLength) {
    saveStoredRegistrations(updated);
    return { success: true, message: "Registration cancelled successfully. The seat has been released." };
  }
  return { success: false, message: "Registration ticket not found." };
}

// Retrieve all registrations made by a specific student regNo
function getRegistrationsByStudent(regNo) {
  var registrations = getStoredRegistrations();
  var normalizedReg = String(regNo).trim().toLowerCase();
  var studentRegs = [];

  for (var i = 0; i < registrations.length; i++) {
    if (String(registrations[i].regNo).trim().toLowerCase() === normalizedReg) {
      studentRegs.push(registrations[i]);
    }
  }
  return studentRegs;
}

// Retrieve a specific registration by its ticketId
function getRegistrationByTicketId(ticketId) {
  var registrations = getStoredRegistrations();
  for (var i = 0; i < registrations.length; i++) {
    if (registrations[i].ticketId === ticketId) {
      return registrations[i];
    }
  }
  return null;
}

