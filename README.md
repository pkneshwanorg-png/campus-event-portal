# 🏛️ Campus Event Management & Registration Portal

> **Live Demo:** [https://pkneshwanorg-png.github.io/campus-event-portal/](https://pkneshwanorg-png.github.io/campus-event-portal/)

---

## 📌 Project Overview

The **Campus Event Management & Registration Portal** is a lightweight, responsive, and intuitive web application engineered for college campus event coordination and attendee registration. Built entirely using vanilla web standards (**HTML5, CSS3, JavaScript**), client-side **localStorage**, and **Chart.js**, this portal operates without server-side dependencies, database configurations, or build tools. It delivers a fast, plug-and-play experience deployed directly on **GitHub Pages**.

---

## 🎯 Problem Statement

Campus event organization is often plagued by disorganized Google Forms, fragmented WhatsApp announcements, manual attendance tracking, and lack of real-time seat availability updates. This leads to accidental over-booking, duplicate student registrations, and tedious manual paperwork for organizers.

The **Campus Event Management & Registration Portal** solves this by providing:
- A unified campus hub where students discover events and register with instant confirmation slips.
- Automated capacity and seat quota enforcement to prevent over-registration.
- An organizer dashboard for live attendee tracking, analytics, and event lifecycle management.

---

## 💻 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure for all pages (`index.html`, `event.html`, `admin.html`) |
| **CSS3** | Modern responsive layout (Flexbox & CSS Grid), CSS variables/theming, animations, and `@media print` styling |
| **JavaScript (ES6+)** | Dynamic DOM rendering, event handling, search & filter algorithms, validation, and CRUD operations |
| **localStorage** | Client-side persistent data store for events, bookings, and active sessions |
| **Chart.js** | Interactive data visualization and seat occupancy charts on the organizer dashboard |

---

## 🌟 Key Features

1. **Dual Role Experience:**
   - **Student Mode:** Browse active events, search by title/description, filter by category or seat availability, view live seat counts and countdown timers, register with university ID, and review booked tickets.
   - **Organizer / Admin Mode:** Secure dashboard to manage events (Create, Read, Update, Delete), monitor registrations, view visual seat charts, and export attendee rosters.
2. **Strict Capacity & Seat Control:**
   - Real-time calculation: `Seats Left = Capacity - Existing Registrations`.
   - Visual progress bars with color-coded warning states.
   - Automatically disables booking and marks events as **"Sold Out"** once capacity is reached.
3. **Duplicate Registration Prevention:**
   - Enforces unique registration per event using the student's registration number.
4. **Printable Confirmation Slip:**
   - Generates a unique ticket identifier (`TCK-XXXXXX`).
   - Includes full event details, student credentials, and a tailored print stylesheet (`@media print`) for clean PDF download or physical printing.
5. **Self-Service Cancellation & Seat Recycling:**
   - Students can cancel registrations directly from their dashboard or ticket view.
   - Instantly recalculates capacity and frees up seats for other attendees.
6. **Live Countdown Timers:**
   - Real-time countdown clock displayed on every event card up to the start time.
7. **CSV Attendee Export:**
   - Organizers can download filtered attendee lists per event in CSV format for offline reporting.
8. **Pre-seeded Demo Data:**
   - Automatically seeds realistic campus events (Hackathons, Cultural Fests, Workshops) on first launch.

---

## 📂 Folder Structure

```text
campus-event-portal/
├── index.html           # Landing page: event directory, search, category filters, student lookup
├── event.html           # Event details, booking form, confirmation ticket & printable pass
├── admin.html           # Organizer dashboard: event CRUD, attendee tables, Chart.js analytics
├── favicon.svg          # Campus portal favicon
├── css/
│   └── style.css        # Global design system, Flexbox/Grid layouts, print styles, toast UI
├── js/
│   ├── storage.js       # LocalStorage abstraction layer & default demo data seeding
│   ├── events.js        # Event CRUD management and seat availability calculations
│   ├── registration.js  # Registration verification, ticket generation, and cancellation
│   └── ui.js            # Reusable UI components (navbar, toasts, cards, countdown timers)
├── README.md            # Project documentation and setup guide
└── VIVA_NOTES.md        # Viva preparation notes, architecture overview, and oral Q&A
```

---

## 🚀 How to Run Locally

Because the project relies on vanilla web standards, no `npm install` or compilation step is required.

### Option 1: Direct Browser Launch
Double-click `index.html` or right-click `index.html` → **Open With** → Chrome / Edge / Firefox / Safari.

### Option 2: VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The site will launch at `http://127.0.0.1:5500/index.html`.

### Option 3: Python Built-in HTTP Server
Run this in PowerShell or Terminal inside the repository folder:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🔑 Demo Logins

| Role | Identifier / Username | Password / Details |
| :--- | :--- | :--- |
| **Admin / Organizer** | `admin` | `admin123` |
| **Student** | Any registration number (e.g. `123001`, `123045`) | Full Name (e.g. `Aman Sharma`) |

---

## ⚠️ Limitations

1. **Client-Side `localStorage` Storage:** Data is stored locally within the user's browser. Events created or registrations made in one browser/device do not automatically synchronize to another user's machine.
2. **Client-Side Authentication:** The admin credentials (`admin` / `admin123`) are evaluated client-side in JavaScript code, making them suitable for academic demonstration rather than production-grade security.
3. **No Multi-User Concurrency:** Without a shared backend server, race conditions cannot be globally coordinated if two remote devices access the app at the exact same instant.

---

## 🔮 Future Work

- **Firebase Backend Integration:**
  - Transition from `localStorage` to **Firebase Firestore** for real-time cloud data synchronization across multiple concurrent devices.
  - Integrate **Firebase Authentication** for secure student and faculty/organizer role-based access control (RBAC).
  - Implement **Firebase Cloud Messaging / Email Alerts** to send ticket confirmations directly to students' inboxes.
- **QR Code Verification:** Scan tickets at event entrance using camera-based QR readers.
- **Certificate Generation:** Auto-issue participation e-certificates after event completion.

---

## 👥 Contributions

| Contributor | Assigned Components & Responsibilities |
| :--- | :--- |
| **Neshwan PK** | `ui.js`, `style.css`, `index.html` (UI/UX design system, responsive layouts, card rendering, toast notifications) |
| **Ahsan** | `events.js`, `storage.js`, `admin.html` (Data persistence layer, event CRUD operations, analytics dashboard & Chart.js) |
| **Ramanjit Kaur** | `registration.js`, `event.html` (Registration workflow, duplicate validation, ticket generation & printable passes) |
