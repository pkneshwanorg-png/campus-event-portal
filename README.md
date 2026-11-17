# 💈 Barbershop Appointment & Management Portal

> **Live Demo:** [https://pkneshwanorg-png.github.io/campus-event-portal/](https://pkneshwanorg-png.github.io/campus-event-portal/)

---

## 📌 Project Overview

The **Barbershop Appointment & Management Portal** is a lightweight, responsive, and intuitive web application engineered for barbershop appointment scheduling, slot coordination, and customer booking management. Built entirely using vanilla web standards (**HTML5, CSS3, JavaScript**), client-side **localStorage**, and **Chart.js**, this portal operates without server-side dependencies, database configurations, or build tools. It delivers a fast, plug-and-play experience deployed directly on **GitHub Pages**.

---

## 🎯 Problem Statement

Barbershop appointment scheduling is frequently plagued by unorganized phone calls, double-booked chairs, crowded waiting areas, and manual paper notebooks. This leads to accidental over-booking, long wait times for clients, and tedious manual bookkeeping for barbershop owners.

The **Barbershop Appointment & Management Portal** solves this by providing:
- A unified online booking hub where customers discover service slots (haircuts, beard trims, facials, hair color) and schedule visits with instant booking confirmation passes.
- Automated chair capacity and slot quota enforcement to prevent over-booking.
- A shop owner dashboard for live appointment tracking, seat utilization analytics, and service slot lifecycle management.

---

## 💻 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure for all pages (`index.html`, `event.html`, `admin.html`) |
| **CSS3** | Modern responsive layout (Flexbox & CSS Grid), CSS variables/theming, and `@media print` styling |
| **JavaScript (ES6+)** | Dynamic DOM rendering, event handling, search & filter algorithms, phone validation, and CRUD operations |
| **localStorage** | Client-side persistent data store for service slots, client bookings, and active sessions |
| **Chart.js** | Interactive data visualization and slot occupancy charts on the shop owner dashboard |

---

## 🌟 Key Features

1. **Dual Role Experience:**
   - **Customer Mode:** Browse available service slots, search by service or barber, filter by category or slot availability, view live slot counts and countdown timers, book with 10-digit phone number, and review booked passes.
   - **Shop Owner Mode:** Secure dashboard to manage service slots (Create, Read, Update, Delete), monitor customer bookings, view visual slot occupancy charts, and export client appointment rolls.
2. **Strict Slot & Chair Control:**
   - Real-time calculation: `Slots Left = Capacity - Existing Bookings`.
   - Visual progress bars with color-coded warning states.
   - Automatically disables booking and marks slots as **"Fully Booked"** once capacity is reached.
3. **Duplicate Booking Prevention:**
   - Enforces unique booking per service slot using the customer's 10-digit mobile number.
4. **Printable Booking Confirmation Pass:**
   - Generates a unique booking identifier (`BK-XXXXXX`).
   - Includes full service details, barber/chair assignment, customer credentials, and a tailored print stylesheet (`@media print`) for clean PDF download or physical printing.
5. **Self-Service Cancellation & Slot Recycling:**
   - Customers can cancel bookings directly from their dashboard or booking confirmation view.
   - Instantly recalculates capacity and frees up the slot for other clients.
6. **Live Countdown Timers:**
   - Real-time countdown clock displayed on every slot card showing time left until the appointment starts (`Starts in ...`).
7. **CSV Client Booking Export:**
   - Shop owners can download filtered customer booking lists per slot in CSV format for shop records.
8. **Pre-seeded Demo Data:**
   - Automatically seeds realistic barbershop slots (Haircuts, Beard Trims, Shaves, Facials, Combos) with prices on first launch.

---

## 📂 Folder Structure

```text
campus-event-portal/
├── index.html           # Landing page: service slot directory, search, category filters, customer booking lookup
├── event.html           # Slot details, appointment booking form, confirmation ticket & printable pass
├── admin.html           # Shop owner dashboard: slot CRUD, customer booking tables, Chart.js analytics
├── favicon.svg          # Barbershop portal favicon
├── css/
│   └── style.css        # Global institutional design system, Flexbox/Grid layouts, print styles, toast UI
├── js/
│   ├── storage.js       # LocalStorage abstraction layer & default barbershop slot demo data seeding
│   ├── events.js        # Service slot CRUD management and seat availability calculations
│   ├── registration.js  # Customer booking verification, ticket generation (BK- prefix), and cancellation
│   └── ui.js            # Reusable UI components (navbar, toasts, cards, countdown timers)
├── README.md            # Project documentation and setup guide
├── VIVA_NOTES.md        # Viva preparation notes, architecture overview, and oral Q&A
├── VIVA_NEUSHWAN.md     # Line-by-line code explanation for ui.js, style.css, index.html
└── VIVA_AHSAN.md        # Line-by-line code explanation for events.js, storage.js, admin.html
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
| **Shop Owner** | `admin` | `admin123` |
| **Customer** | Any 10-digit mobile number (e.g. `9876543210`) | Full Name (e.g. `Aman Sharma`) |

---

## ⚠️ Limitations

1. **Client-Side `localStorage` Storage:** Data is stored locally within the user's browser. Service slots created or bookings made in one browser/device do not automatically synchronize to another user's machine.
2. **Client-Side Authentication:** The owner credentials (`admin` / `admin123`) are evaluated client-side in JavaScript code, making them suitable for academic demonstration rather than production-grade security.
3. **No Multi-User Concurrency:** Without a shared backend server, race conditions cannot be globally coordinated if two remote devices book the last slot at the exact same millisecond.

---

## 🔮 Future Work

- **Firebase Backend Integration:**
  - Transition from `localStorage` to **Firebase Firestore** for real-time cloud data synchronization across multiple concurrent devices.
  - Integrate **Firebase Authentication** for secure customer and barber/owner role-based access control (RBAC).
  - Implement **SMS / WhatsApp / Email API** integration to send appointment reminders directly to customers.
- **Barber Staff Schedule Picker:** Allow individual barbers to set custom work hours and break times.
- **Online Payment Integration:** Razorpay / Stripe gateway for advance slot booking token payments.

---

## 👥 Contributions

| Contributor | Assigned Components & Responsibilities |
| :--- | :--- |
| **Neshwan PK** | `ui.js`, `style.css`, `index.html` (UI/UX design system, responsive layouts, card rendering, toast notifications) |
| **Ahsan** | `events.js`, `storage.js`, `admin.html` (Data persistence layer, slot CRUD operations, analytics dashboard & Chart.js) |
| **Ramanjit Kaur** | `registration.js`, `event.html` (Booking workflow, duplicate phone validation, pass generation & printable slips) |
