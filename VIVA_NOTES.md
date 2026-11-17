# 💈 Viva & Project Defense Notes: Barbershop Appointment & Management Portal

This document is prepared specifically for students facing an examiner or professor in a lab examination/viva voce. It explains every file, key functions, architectural decisions, and common questions with textbook-standard answers.

---

## 📑 1. Architectural Overview & Design Pattern

### Why Pure Vanilla JavaScript and localStorage?
- **Zero Dependencies:** Runs on any browser without node modules, compilers, or server runtimes.
- **Client-Side Persistence:** `localStorage` retains data between browser refreshes and tab switches without requiring an SQL or NoSQL backend database.
- **Portability:** Perfect for GitHub Pages, which only serves static files (`.html`, `.css`, `.js`, media).

### Barbershop Domain Mapping (Under-the-Hood vs. Presentation)
| Code Entity / Parameter | Barbershop Domain Concept | Example / Purpose |
| :--- | :--- | :--- |
| `Event` | **Service Slot** | "Classic Haircut & Styling with Rahul" |
| `Capacity` | **Available Chairs / Slots** | 1 to 3 simultaneous customer slots |
| `Venue` | **Barber / Chair** | "Chair 1 - Master Barber Rahul" |
| `Category` | **Service Type** | Haircut, Beard Trim, Shave, Facial, Combo |
| `Eligibility` | **Booking Policy / Notes** | "Please arrive 5 mins early. Walk-ins not accepted." |
| `Student` / `regNo` | **Customer Phone Number** | 10-digit mobile number (e.g. `9876543210`) |
| `Ticket ID` | **Booking Pass Number** | Prefix `BK-` (e.g. `BK-839188`) |
| `Admin` | **Shop Owner** | Accesses the Shop Owner Dashboard (`admin` / `admin123`) |

---

## 📁 2. File-by-File Breakdown

### `index.html`
- **What it does:** The main entry point. Houses the hero banner, search bar, service category dropdown, slot availability filter, dynamic slot grid, customer login modal, shop owner login modal, and customer's personal bookings view.
- **Key Functions:**
  - `renderEventsList()`: Filters service slots against search terms and dropdown selections, then injects card HTML into the DOM.
  - `showMyRegistrationsView()`: Switches the UI view to display bookings matching the logged-in customer's phone number.
  - `handleFilterChange()`: Event handler triggered on input/select changes to refresh the display in real time.

#### 🎯 Likely Viva Questions for `index.html`:
1. **Q: How does the live search filter work without refreshing the page?**
   - *Answer:* We attach an `oninput` event listener to the search `<input>`. Whenever a key is pressed, `handleFilterChange()` reads the input's current string, converts it to lowercase, checks for substrings inside `title`, `description`, or `venue` using `indexOf()`, and re-renders only matching service slot cards.
2. **Q: How do you show "My Bookings" on the same page?**
   - *Answer:* We toggle CSS `display: block` and `display: none` between the `#events-view` container and `#my-registrations-view` container based on the URL query parameter (`?view=my-registrations`) or customer navigation.
3. **Q: What is the purpose of `<meta name="viewport" content="...">`?**
   - *Answer:* It ensures responsive rendering on mobile and tablet devices by setting the viewport width equal to the device width and establishing an initial zoom level of 1.0.

---

### `event.html`
- **What it does:** Displays full details for a chosen barbershop service slot, a booking form for customers, and a printable confirmation pass upon successful booking.
- **Key Functions:**
  - `renderEventDetails(ev)`: Reads the slot ID from the query string using `URLSearchParams`, computes slots remaining, and updates the DOM.
  - `handleRegistrationSubmit(e)`: Intercepts form submission via `e.preventDefault()`, validates 10-digit mobile number, collects customer details, and calls `registerStudent()`.
  - `showConfirmationSlip(registration, event)`: Displays the appointment confirmation pass and hides the booking form.

#### 🎯 Likely Viva Questions for `event.html`:
1. **Q: How does this page know which service slot to show?**
   - *Answer:* We use `URLSearchParams(window.location.search)` to extract the `id` parameter from the URL (for example: `event.html?id=evt-1`). Then we call `getEventById(eventId)`.
2. **Q: How does the "Print / Download Confirmation" functionality work?**
   - *Answer:* We invoke the native JavaScript method `window.print()`. Through `@media print` rules in `css/style.css`, we hide navigation bars, buttons, and backgrounds so only the `.ticket-wrapper` appears on the printed paper or saved PDF.
3. **Q: What prevents a user from submitting the booking form when a slot is full?**
   - *Answer:* Two levels: in the UI, if `seats.left <= 0`, the form is hidden and a "Booking Closed / Fully Booked" banner is shown; in `registration.js`, `registerStudent()` re-verifies slot availability before saving.

---

### `admin.html`
- **What it does:** The shop owner control center. Provides aggregated statistics (Total Service Slots, Bookings, Capacity, Occupancy %), a stacked bar chart of bookings per slot using Chart.js, full slot CRUD (Create, Read, Update, Delete) modals, a searchable customer booking table, and CSV file export.
- **Key Functions:**
  - `renderStats()`: Iterates through all service slots and bookings to compute cumulative capacity and slot occupancy rate.
  - `renderSeatsChart()`: Generates a responsive stacked bar chart comparing booked vs. available slots per service using a clean institutional palette (`#1F3A5F` and `#D9DEE7`).
  - `exportParticipantsToCSV()`: Converts customer booking JSON records into comma-separated text and triggers a browser download using a `Blob` and dynamic `<a>` anchor click.

#### 🎯 Likely Viva Questions for `admin.html`:
1. **Q: How does CSV export work in pure client-side JavaScript without a backend server?**
   - *Answer:* We construct a string of comma-separated values with line breaks (`\n`), wrap it into a `Blob` with MIME type `text/csv`, create an object URL using `URL.createObjectURL(blob)`, attach it to a temporary hidden `<a>` tag with a `download` attribute, and programmatically invoke `.click()`.
2. **Q: What is a stacked bar chart and why is it used here?**
   - *Answer:* A stacked bar chart places booked slots and available slots on top of each other in a single vertical bar for each service slot, making total chair capacity and relative occupancy visible at a single glance.
3. **Q: What happens to bookings when an owner deletes a service slot?**
   - *Answer:* In `deleteEvent()`, we delete the service slot and also filter out any customer bookings associated with that `eventId` from the bookings array, preserving referential integrity in `localStorage`.

---

### `css/style.css`
- **What it does:** Provides the institutional styling, typography, CSS Custom Properties (variables), flexbox navbars, CSS Grid cards, flat toast alerts, and `@media print` rules.
- **Key Concepts:**
  - CSS Variables (`:root`): Centralized color palette (`--primary: #1F3A5F`, `--accent: #C8553D`, etc.) for clean maintainability.
  - CSS Grid: `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))` ensures automatic responsive card wrapping without media query clutter.
  - `@media print`: Rules that override screen layouts specifically for printing appointment confirmation passes.

#### 🎯 Likely Viva Questions for `css/style.css`:
1. **Q: What are CSS custom properties (variables) and why are they advantageous?**
   - *Answer:* Defined using the `--variable-name` syntax inside `:root`, they allow developers to store reusable values (colors, border radiuses). If the brand color changes, modifying it in one place updates the entire stylesheet.
2. **Q: How does the `@media print` block work?**
   - *Answer:* It applies CSS rules only when the document is being printed or exported as PDF. By setting `display: none !important` on `.navbar`, `.btn`, and `#toast-container`, only the clean booking pass prints.
3. **Q: What is the difference between CSS Flexbox and CSS Grid?**
   - *Answer:* Flexbox is one-dimensional (deals with items along a row or column, such as navigation links), while CSS Grid is two-dimensional (deals with rows and columns simultaneously, ideal for slot grids and dashboards).

---

### `js/storage.js`
- **What it does:** Provides standard helper functions to interact with `window.localStorage`. Also seeds 5 sample barbershop service slots and initial customer bookings on first run.
- **Key Functions:**
  - `initStorage()`: Checks if `localStorage` has existing records under `barbershop_slots`; if not, seeds sample slots with prices.
  - `getStoredEvents()` & `saveStoredEvents()`: Wrappers around `JSON.parse(localStorage.getItem(...))` and `localStorage.setItem(..., JSON.stringify(...))`.
  - `getCurrentUser()` & `setCurrentUser()`: Maintains the active logged-in session (customer or shop owner).

#### 🎯 Likely Viva Questions for `js/storage.js`:
1. **Q: Why must we use `JSON.stringify()` and `JSON.parse()` with `localStorage`?**
   - *Answer:* `localStorage` only stores primitive UTF-16 string data. To store complex objects or arrays, we serialize them into strings with `JSON.stringify()`, and to read them back as workable JavaScript arrays, we deserialize them with `JSON.parse()`.
2. **Q: What is the storage limit of `localStorage` in modern browsers?**
   - *Answer:* Approximately 5 MB per origin (domain/protocol/port), which is more than enough for thousands of text-based service slots and customer booking records.
3. **Q: What is the difference between `localStorage` and `sessionStorage`?**
   - *Answer:* Data in `localStorage` persists even after the browser or tab is closed until explicitly cleared. Data in `sessionStorage` is lost when the browser tab is closed.

---

### `js/events.js`
- **What it does:** Handles service slot logic: finding slots, calculating chair availability, creating new slots, updating existing slots, and deleting slots.
- **Key Functions:**
  - `getSeatsInfo(eventId)`: Compares total slot capacity with the count of bookings referencing that slot ID. Returns `{ capacity, registered, left, isFull }`.
  - `createEvent(eventData)`: Appends a newly created service slot with an auto-generated unique ID (`evt-Date.now()`).
  - `deleteEvent(eventId)`: Removes the slot and purges attached bookings.

#### 🎯 Likely Viva Questions for `js/events.js`:
1. **Q: Explain the logic of how remaining slots are calculated.**
   - *Answer:* In `getSeatsInfo(eventId)`, we first fetch the service slot to obtain its maximum chair capacity. Then we iterate through the `registrations` array and count how many records have `registration.eventId === eventId`. `Slots Left = Capacity - Count`. If `left <= 0`, `isFull` evaluates to `true`.
2. **Q: How is a unique ID created for each slot?**
   - *Answer:* We use `"evt-" + Date.now()`. `Date.now()` returns the number of milliseconds elapsed since January 1, 1970, which is always unique for sequentially created items.
3. **Q: What is the time complexity of finding a service slot by ID?**
   - *Answer:* In our array implementation, finding a slot with a linear scan (`for` loop) is $O(N)$ where $N$ is the number of slots.

---

### `js/registration.js`
- **What it does:** Enforces appointment booking integrity: checks remaining slots, validates 10-digit phone number, prevents duplicate bookings, creates unique booking IDs (`BK-XXXXXX`), and handles cancellation.
- **Key Functions:**
  - `isStudentAlreadyRegistered(eventId, regNo)`: Returns `true` if a customer with the same phone number already has a booking for this specific service slot.
  - `registerStudent(studentData)`: Validates 10-digit phone, checks slot capacity, checks duplicate status, creates a booking pass ID (`BK-XXXXXX`), and commits to `localStorage`.
  - `cancelRegistration(ticketId)`: Removes the booking record, which automatically increments the available slot count when `getSeatsInfo()` is next called.

#### 🎯 Likely Viva Questions for `js/registration.js`:
1. **Q: How do you prevent over-booking (capacity exceeding)?**
   - *Answer:* In `registerStudent()`, before any booking record is added, we call `getSeatsInfo(eventId)`. If `seats.left <= 0` or `seats.isFull` is true, the function immediately terminates and returns an error response without modifying storage.
2. **Q: How is duplicate booking prevented?**
   - *Answer:* We inspect `isStudentAlreadyRegistered(eventId, regNo)`. It cleans non-digit characters and compares 10-digit mobile numbers against all existing records for the same slot ID. If a match is found, booking is rejected.
3. **Q: How does cancelling a booking free up a slot?**
   - *Answer:* Available slots are not stored as a static counter; they are dynamically derived by counting matching bookings. Removing a booking from the array immediately decrements the count and increases `seats.left` by 1.

---

### `js/ui.js`
- **What it does:** Renders shared UI widgets across all pages: dynamic navbar with role indicators, in-app toast alerts, appointment countdown strings, and uniform service slot card templates.
- **Key Functions:**
  - `showToast(message, type)`: Dynamically creates and injects a flat notification element that fades out and automatically self-removes after 3.5 seconds using `setTimeout()`.
  - `renderNavbar(activePage)`: Checks `getCurrentUser()` and renders appropriate navigation options for guests, customers, or the shop owner.
  - `calculateCountdown(dateString, timeString)`: Uses JavaScript `Date` math to calculate remaining days, hours, and minutes until the appointment commences.

#### 🎯 Likely Viva Questions for `js/ui.js`:
1. **Q: How does the appointment countdown calculation work?**
   - *Answer:* We convert the slot's date and time into a target `Date` object, subtract the current timestamp `new Date().getTime()` to get the difference in milliseconds, and use division and modulo arithmetic (`Math.floor(diffMs / (1000 * 60 * 60 * 24))`) to extract days, hours, and minutes (`Starts in ...`).
2. **Q: How are toast notifications created and disposed without external libraries?**
   - *Answer:* `document.createElement("div")` creates a toast container. We apply CSS classes for styling and left-border color-coding, and then invoke `setTimeout()` to fade it out and call `container.removeChild(toast)` to prevent DOM bloat.
3. **Q: What is event delegation and why is it useful in rendering slot cards?**
   - *Answer:* Cards can be dynamically added or removed at any time. Generating them through pure functions like `renderEventCard()` ensures consistent DOM markup and inline event binding without risking stale listeners.
