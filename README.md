# 🏛️ Campus Event Management & Registration Portal

A clean, responsive, and beginner-friendly web application designed for college campus event management. Built strictly with standard **HTML5, CSS3, and Vanilla JavaScript**, requiring no backend, build tools, or npm installations. Deployed seamlessly as a static website on **GitHub Pages**.

---

## 🌟 Key Features

1. **Dual Role Architecture:**
   - **Student Mode:** Browse events, search & filter by category or availability, check live seat availability, register with registration number, prevent duplicate registration, and view personal registrations.
   - **Organizer / Admin Mode:** Password-protected dashboard (`admin` / `admin123`), create, edit, and delete events, view analytics (seats filled per event chart), inspect attendees, and export participants to CSV.
2. **Strict Seat & Capacity Control:**
   - Real-time seat calculation: `Seats Left = Capacity - Existing Registrations`.
   - Automatic visual progress bar with color-coded warnings.
   - Disables registration and marks the event as **"Sold Out (Full)"** once capacity is reached. Never allows over-registration.
3. **Duplicate Prevention:**
   - Students cannot register twice for the same event using the same registration number.
4. **Printable Confirmation Slip:**
   - Auto-generates a unique ticket ID (`TCK-XXXXXX`).
   - Includes full event details, student credentials, and a print stylesheet (`@media print`) that cleanly isolates the ticket for PDF download or physical printing.
5. **Cancellation & Seat Recycling:**
   - Students can cancel registrations from their dashboard or ticket view.
   - Cancelling instantly frees up the seat for other students.
6. **Live Countdown Timers:**
   - Displays real-time countdown to event start time on every card.
7. **Pre-seeded Demo Data:**
   - Automatically initializes with 5 diverse events (Hackathon, AI Workshop, Cultural Fest, Cricket Tournament, Web Dev Masterclass) on first load.

---

## 📂 Project Structure

```text
├── index.html           # Landing page with search, filters, cards, and student registration view
├── event.html           # Event detail page, booking form, and printable admission slip
├── admin.html           # Organizer dashboard with Chart.js analytics, CRUD modals, CSV export
├── css/
│   └── style.css        # Responsive styling (Flexbox & Grid), themes, toasts, and @media print rules
├── js/
│   ├── storage.js       # LocalStorage read/write abstractions and sample event seeding
│   ├── events.js        # Event CRUD operations and seat calculation logic
│   ├── registration.js  # Registration flow, duplicate prevention, cancellation, ticket lookup
│   └── ui.js            # Shared UI components (navbar, toast notifications, countdown, event cards)
├── README.md            # Project overview, setup, and deployment guide
└── VIVA_NOTES.md        # Comprehensive viva preparation guide with code explanations and Q&A
```

---

## 💻 How to Run Locally

Because this project is built with vanilla web technologies, you don't need any complex environment:

### Method 1: Direct Browser Launch
Simply double-click `index.html` (or right-click `index.html` → **Open With** → Google Chrome / Microsoft Edge / Firefox).

### Method 2: Using VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and choose **"Open with Live Server"**.
4. The project will open at `http://127.0.0.1:5500/index.html`.

### Method 3: Using Python Built-in HTTP Server
Run this in PowerShell or Terminal inside the project folder:
```powershell
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🚀 How to Deploy on GitHub Pages (Step-by-Step)

1. **Initialize Git Repository (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Campus Event Management Portal"
   ```

2. **Create a GitHub Repository:**
   - Go to [GitHub.com](https://github.com) and click **New Repository**.
   - Name it `campus-event-portal` (or any name you prefer).
   - Keep it **Public** and do not add a README (since we already have one).

3. **Push Files to GitHub:**
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/campus-event-portal.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Click **Settings** (top right tab).
   - On the left sidebar, click **Pages** (under "Code and automation").
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and root folder `/(root)`, then click **Save**.

5. **Access Your Live Website:**
   - Wait 1-2 minutes for GitHub Actions to complete the deployment.
   - Refresh the Pages tab to see the green banner:
     `Your site is live at https://<YOUR-USERNAME>.github.io/campus-event-portal/`

---

## 🔑 Demo Credentials

- **Admin Login:**
  - Username: `admin`
  - Password: `admin123`
- **Student Login:**
  - Registration No: Any number (e.g. `123001`, `123045`)
  - Full Name: Any student name (e.g. `Aman Sharma`)

