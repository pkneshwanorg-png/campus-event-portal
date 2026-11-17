/**
 * registration.js
 * Handles customer appointment booking, duplicate booking prevention, slot limit validation,
 * cancellation, and booking confirmation retrieval.
 * 
 * BARBERSHOP CONTEXT MAPPING:
 * - 'registerStudent' -> Book appointment for a customer.
 * - 'regNo' -> 10-digit Customer Phone Number.
 * - 'studentData' -> Customer Booking Data.
 * - 'ticketId' -> Booking Confirmation Number (starts with 'BK-').
 */

// Check if a customer with given phone number is already booked for a service slot
function isStudentAlreadyRegistered(eventId, regNo) {
  var registrations = getStoredRegistrations();
  var normalizedReg = String(regNo).replace(/\D/g, "");
  for (var i = 0; i < registrations.length; i++) {
    var item = registrations[i];
    if (item.eventId === eventId && String(item.regNo).replace(/\D/g, "") === normalizedReg) {
      return true;
    }
  }
  return false;
}

// Book appointment for a customer with strict slot and phone number validation
function registerStudent(studentData) {
  var eventId = studentData.eventId;
  var regNo = studentData.regNo;
  var name = studentData.name;
  var email = studentData.email;

  // 1. Check if service slot exists
  var event = getEventById(eventId);
  if (!event) {
    return { success: false, message: "Service slot not found." };
  }

  // 2. Validate 10-digit phone number
  var cleanPhone = String(regNo).replace(/\D/g, "");
  if (cleanPhone.length !== 10) {
    return { success: false, message: "Please provide a valid 10-digit mobile number." };
  }

  // 3. Check slot availability (Strict: never allow over-booking)
  var seats = getSeatsInfo(eventId);
  if (seats.isFull || seats.left <= 0) {
    return { success: false, message: "Sorry, this slot is fully booked! No slots left." };
  }

  // 4. Prevent duplicate booking for the same slot with same phone
  if (isStudentAlreadyRegistered(eventId, cleanPhone)) {
    return { success: false, message: "You already have a booking for this slot with Phone No. " + cleanPhone + "!" };
  }

  // 5. Create new booking record with BK- prefix
  var newTicketId = "BK-" + Math.floor(100000 + Math.random() * 900000);
  var registrationRecord = {
    ticketId: newTicketId,
    eventId: eventId,
    regNo: cleanPhone,
    name: name.trim(),
    email: email.trim(),
    registeredAt: new Date().toISOString()
  };

  var registrations = getStoredRegistrations();
  registrations.push(registrationRecord);
  saveStoredRegistrations(registrations);

  return {
    success: true,
    message: "Booking confirmed! Your appointment has been scheduled.",
    registration: registrationRecord
  };
}

// Cancel a booking by ticketId (frees up the slot immediately)
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
    return { success: true, message: "Booking cancelled successfully. The slot has been released." };
  }
  return { success: false, message: "Booking confirmation not found." };
}

// Retrieve all bookings made by a specific customer phone number
function getRegistrationsByStudent(regNo) {
  var registrations = getStoredRegistrations();
  var normalizedReg = String(regNo).replace(/\D/g, "");
  var studentRegs = [];

  for (var i = 0; i < registrations.length; i++) {
    if (String(registrations[i].regNo).replace(/\D/g, "") === normalizedReg) {
      studentRegs.push(registrations[i]);
    }
  }
  return studentRegs;
}

// Retrieve a specific booking by its ticketId
function getRegistrationByTicketId(ticketId) {
  var registrations = getStoredRegistrations();
  for (var i = 0; i < registrations.length; i++) {
    if (registrations[i].ticketId === ticketId) {
      return registrations[i];
    }
  }
  return null;
}
