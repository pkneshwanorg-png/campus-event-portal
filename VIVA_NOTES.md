# 🎓 Viva & Project Defense Notes

This document is prepared specifically for students facing an examiner or professor in a lab examination/viva voce. It explains every file, key functions, architectural decisions, and common questions with textbook-standard answers.

---

## 📑 1. Architectural Overview & Design Pattern

### Why Pure Vanilla JavaScript and localStorage?
- **Zero Dependencies:** Runs on any browser without node modules, compilers, or server runtimes.
- **Client-Side Persistence:** `localStorage` retains data between browser refreshes and tab switches without requiring an SQL or NoSQL backend database.
- **Portability:** Perfect for GitHub Pages, which only serves static files (`.html`, `.css`, `.js`, media).

---

## 📁 2. File-by-File Breakdown

### `index.html`
- **What it does:** The main entry point. Houses the hero banner, search bar, category dropdown, availability filter, dynamic card grid, student login modal, admin login modal, and the student's personal registrations view.
- **Key Functions:**
  - `renderEventsList()`: Filters the events array against search terms and dropdown selections, then injects card HTML into the DOM.
  - `showMyRegistrationsView()`: Switches the UI view to display registrations matching the logged-in student's registration number.
  - `handleFilterChange()`: Event handler triggered on input/select changes to refresh the display in real time.

#### 🎯 Likely Viva Questions for `index.html`:
1. **Q: How does the live search filter work without refreshing the page?**
   - *Answer:* We attach an `oninput` event listener to the search `<input>`. Whenever a key is pressed, `handleFilterChange()` reads the input's current string, converts it to lowercase, checks for substrings inside `title`, `description`, or `venue` using `indexOf()`, and re-renders only matching cards.
2. **Q: How do you show "My Registrations" on the same page?**
   - *Answer:* We toggle CSS `display: block` and `display: none` between the `#events-view` container and `#my-registrations-view` container based on the URL query parameter (`?view=my-registrations`) or user navigation.
3. **Q: What is the purpose of `<meta name="viewport" content="...">`?**
   - *Answer:* It ensures responsive rendering on mobile and tablet devices by setting the viewport width equal to the device width and establishing an initial zoom level of 1.0.

---

### `event.html`
- **What it does:** Displays full details for a chosen event, a booking form for students, and a printable confirmation slip upon successful registration.
- **Key Functions:**
  - `renderEventDetails(ev)`: Reads the event ID from the query string using `URLSearchParams`, computes seats remaining, and updates the DOM.
  - `handleRegistrationSubmit(e)`: Intercepts form submission via `e.preventDefault()`, collects student details, and calls `registerStudent()`.
  - `showConfirmationSlip(registration, event)`: Displays the admission pass and hides the registration form.

#### 🎯 Likely Viva Questions for `event.html`:
1. **Q: How does this page know which event to show?**
   - *Answer:* We use `URLSearchParams(window.location.search)` to extract the `id` parameter from the URL (for example: `event.html?id=evt-1`). Then we call `getEventById(eventId)`.
2. **Q: How does the "Print / Download Ticket" functionality work?**
   - *Answer:* We invoke the native JavaScript method `window.print()`. Through `@media print` rules in `css/style.css`, we hide navigation bars, buttons, and backgrounds so only the `.ticket-wrapper` appears on the printed paper or saved PDF.
3. **Q: What prevents a user from submitting the form when seats are full?**
   - *Answer:* Two levels: in the UI, if `seats.left <= 0`, the form is hidden and a "Sold Out" banner is shown; in `registration.js`, `registerStudent()` re-verifies seat availability before saving.

---

### `admin.html`
- **What it does:** The organizer control center. Provides aggregated statistics (Total Events, Registrations, Capacity, Occupancy %), a stacked bar chart of seats filled using Chart.js, full event CRUD (Create, Read, Update, Delete) modals, a searchable participant table, and CSV file export.
- **Key Functions:**
  - `renderStats()`: Iterates through all events and registrations to compute cumulative capacity and occupancy rate.
  - `renderSeatsChart()`: Generates a responsive stacked bar chart comparing booked vs. available seats per event.
  - `exportParticipantsToCSV()`: Converts participant JSON records into comma-separated text and triggers a browser download using a `Blob` and dynamic `<a>` anchor click.

#### 🎯 Likely Viva Questions for `admin.html`:
1. **Q: How does CSV export work in pure client-side JavaScript without a backend server?**
   - *Answer:* We construct a string of comma-separated values with line breaks (`\n`), wrap it into a `Blob` with MIME type `text/csv`, create an object URL using `URL.createObjectURL(blob)`, attach it to a temporary hidden `<a>` tag with a `download` attribute, and programmatically invoke `.click()`.
2. **Q: What is a stacked bar chart and why is it used here?**
   - *Answer:* A stacked bar chart places booked seats and available seats on top of each other in a single vertical bar for each event, making total capacity and relative occupancy visible at a single glance.
3. **Q: What happens to registrations when an admin deletes an event?**
   - *Answer:* In `deleteEvent()`, we delete the event and also filter out any registrations associated with that `eventId` from the registrations array, preserving referential integrity in `localStorage`.

---

### `css/style.css`
- **What it does:** Provides the global styling, typography, CSS Custom Properties (variables), flexbox navbars, CSS Grid cards, toast animations, and `@media print` rules.
- **Key Concepts:**
  - CSS Variables (`:root`): Centralized color palette (`--primary-color`, `--border-color`, etc.) for easy theming.
  - CSS Grid: `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))` ensures automatic responsive card wrapping without media query clutter.
  - `@media print`: Rules that override screen layouts specifically for printing.

#### 🎯 Likely Viva Questions for `css/style.css`:
1. **Q: What are CSS custom properties (variables) and why are they advantageous?**
   - *Answer:* Defined using the `--variable-name` syntax inside `:root`, they allow developers to store reusable values (colors, border radiuses). If the brand color changes, modifying it in one place updates the entire stylesheet.
2. **Q: How does the `@media print` block work?**
   - *Answer:* It applies CSS rules only when the document is being printed or exported as PDF. By setting `display: none !important` on `.navbar`, `.btn`, and `#toast-container`, only the clean ticket prints.
3. **Q: What is the difference between CSS Flexbox and CSS Grid?**
   - *Answer:* Flexbox is one-dimensional (deals with items along a row or column, such as navigation links), while CSS Grid is two-dimensional (deals with rows and columns simultaneously, ideal for cards and dashboards).

---

### `js/storage.js`
- **What it does:** Provides standard helper functions to interact with `window.localStorage`. Also seeds 5 sample campus events and initial registrations on first run so the portal is never empty.
- **Key Functions:**
  - `initStorage()`: Checks if `localStorage` has existing records; if not, seeds sample events.
  - `getStoredEvents()` & `saveStoredEvents()`: Wrappers around `JSON.parse(localStorage.getItem(...))` and `localStorage.setItem(..., JSON.stringify(...))`.
  - `getCurrentUser()` & `setCurrentUser()`: Maintains the active logged-in session (student or admin).

#### 🎯 Likely Viva Questions for `js/storage.js`:
1. **Q: Why must we use `JSON.stringify()` and `JSON.parse()` with `localStorage`?**
   - *Answer:* `localStorage` only stores primitive UTF-16 string data. To store complex objects or arrays, we serialize them into strings with `JSON.stringify()`, and to read them back as workable JavaScript arrays, we deserialize them with `JSON.parse()`.
2. **Q: What is the storage limit of `localStorage` in modern browsers?**
   - *Answer:* Approximately 5 MB per origin (domain/protocol/port), which is more than enough for thousands of text-based event and registration records.
3. **Q: What is the difference between `localStorage` and `sessionStorage`?**
   - *Answer:* Data in `localStorage` persists even after the browser or tab is closed until explicitly cleared. Data in `sessionStorage` is lost when the browser tab is closed.

---

### `js/events.js`
- **What it does:** Handles core event logic: finding events, calculating seat availability, creating new events, updating existing events, and deleting events.
- **Key Functions:**
  - `getSeatsInfo(eventId)`: Compares total event capacity with the count of registrations referencing that event ID. Returns `{ capacity, registered, left, isFull }`.
  - `createEvent(eventData)`: Appends a newly created event with an auto-generated unique ID (`evt-Date.now()`).
  - `deleteEvent(eventId)`: Removes the event and purges orphaned registrations.

#### 🎯 Likely Viva Questions for `js/events.js`:
1. **Q: Explain the logic of how remaining seats are calculated.**
   - *Answer:* In `getSeatsInfo(eventId)`, we first fetch the event to obtain its maximum capacity. Then we iterate through the `registrations` array and count how many records have `registration.eventId === eventId`. `Seats Left = Capacity - Count`. If `left <= 0`, `isFull` evaluates to `true`.
2. **Q: How is a unique ID created for each event?**
   - *Answer:* We use `"evt-" + Date.now()`. `Date.now()` returns the number of milliseconds elapsed since January 1, 1970, which is always unique for sequentially created items.
3. **Q: What is the time complexity of finding an event by ID?**
   - *Answer:* In our array implementation, finding an event with a linear scan (`for` loop) is $O(N)$ where $N$ is the number of events.

---

### `js/registration.js`
- **What it does:** Enforces registration integrity: checks remaining seats, prevents duplicate registrations, creates unique tickets, cancels registrations, and filters by student.
- **Key Functions:**
  - `isStudentAlreadyRegistered(eventId, regNo)`: Returns `true` if a student with the same registration number already has an entry for this specific event.
  - `registerStudent(studentData)`: Validates existence, checks seat capacity, checks duplicate status, creates a ticket ID (`TCK-XXXXXX`), and commits to `localStorage`.
  - `cancelRegistration(ticketId)`: Removes the registration record, which automatically increments the available seat count when `getSeatsInfo()` is next called.

#### 🎯 Likely Viva Questions for `js/registration.js`:
1. **Q: How do you prevent over-registration (race conditions / capacity exceeding)?**
   - *Answer:* In `registerStudent()`, before any registration record is added, we call `getSeatsInfo(eventId)`. If `seats.left <= 0` or `seats.isFull` is true, the function immediately terminates and returns an error response without modifying storage.
2. **Q: How is duplicate registration prevented?**
   - *Answer:* We inspect `isStudentAlreadyRegistered(eventId, regNo)`. It compares case-insensitive and trimmed registration numbers against all existing records for the same event ID. If a match is found, registration is rejected with a clear message.
3. **Q: How does cancelling a registration free up a seat?**
   - *Answer:* Seats are not stored as a static counter; they are dynamically derived by counting matching registrations. Removing a registration from the array immediately decrements the count and increases `seats.left` by 1.

---

### `js/ui.js`
- **What it does:** Renders shared UI widgets across all pages: dynamic navbar with role indicators, in-app toast alerts, countdown strings, and uniform event card templates.
- **Key Functions:**
  - `showToast(message, type)`: Dynamically creates and injects a notification element that animates into view and automatically self-removes after 3.5 seconds using `setTimeout()`.
  - `renderNavbar(activePage)`: Checks `getCurrentUser()` and renders appropriate navigation options for guests, students, or admins.
  - `calculateCountdown(dateString, timeString)`: Uses JavaScript `Date` math to calculate remaining days, hours, and minutes until the event commences.

#### 🎯 Likely Viva Questions for `js/ui.js`:
1. **Q: How does the countdown calculation work?**
   - *Answer:* We convert the event's date and time into a target `Date` object, subtract the current timestamp `new Date().getTime()` to get the difference in milliseconds, and use division and modulo arithmetic (`Math.floor(diffMs / (1000 * 60 * 60 * 24))`) to extract days, hours, and minutes.
2. **Q: How are toast notifications created and disposed without external libraries?**
   - *Answer:* `document.createElement("div")` creates a toast container. We apply CSS classes for styling and animations (`slideInRight`), and then invoke `setTimeout()` to fade it out and call `container.removeChild(toast)` to prevent DOM bloat.
3. **Q: What is event delegation and why is it useful in rendering cards?**
   - *Answer:* Cards can be dynamically added or removed at any time. Generating them through pure functions like `renderEventCard()` ensures consistent DOM markup and inline event binding without risking stale listeners.

