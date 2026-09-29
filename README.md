# John Paul Dellera — IT Technical Support & Telecom Portfolio

A modern, high-performance, and responsive portfolio website designed for **John Paul Perocillo Dellera**, an IT Technical Support Specialist and Telecom Field Coordinator based in Metro Manila, Philippines.

---

## 🌟 Key Features & UX Enhancements

- **Interactive Terminal Emulator (`jp@dellera-terminal: ~`)**:
  - Live CLI widget with quick-command chips (`whoami`, `skills`, `experience`, `projects`, `contact`, `status`, `clear`).
  - Allows interactive keyboard input with instant syntax-colored output.
- **Categorized Skills Matrix with Live Search**:
  - Tab filters: *All Skills*, *IT & Hardware*, *Telecom & TSSR*, *CCTV & Network*, *Operations & Tools*.
  - Real-time instant search input for quick lookup by recruiters and hiring managers.
- **Dedicated Project Highlights**:
  - Showcases key deployments: *Aivee Clinic Systems & POS Support*, *Globe Telecom AC Power Upgrade & TSSR*, *Huawei ISDP & Project Control*.
- **Interactive Career Timeline**:
  - Comprehensive career chronology from Aivee Clinic to Costplus, Jezka Construction, and PEASE Corp.
  - Tagged with key tech stacks and bulleted deliverables.
- **Verified Credentials & Training**:
  - Official badges for Huawei Training Center, Huawei EHS & ISDP, and technical education.
- **High-Conversion Contact Section**:
  - 1-click **Copy Email** and **Copy Phone** buttons with instant visual feedback tooltips.
  - Direct call action (`tel:`) and email links.
  - **Save Contact (vCard)** button: Generates and downloads a `.vcf` file directly to recruiter devices.
  - Quick message inquiry form.
- **Dark & Light Mode**:
  - Seamless toggle with persistent user preference in `localStorage`.
  - Automatic fallback to system color scheme (`prefers-color-scheme`).
- **Reading Progress Bar & Floating Back-to-Top**:
  - Real-time scroll indicator and smooth navigation.
- **Print & PDF Ready (`@media print`)**:
  - Clicking "Print Resume" or pressing `Ctrl + P` strips UI navigation and formats a pristine 2-page curriculum vitae ready for hiring managers.

---

## 🛠️ Built With

- **HTML5**: Semantic markup, Open Graph metadata, ARIA accessibility landmarks.
- **Modern CSS3**: CSS custom properties, fluid typography (`clamp()`), glassmorphism, responsive grid & flexbox layouts, `@media print` styling.
- **Vanilla JavaScript (ES6+)**: `IntersectionObserver` for scroll reveals & active nav spy, zero external framework dependencies for ultra-fast loading speed.
- **Zero Heavy Dependencies**: Pure SVGs and system-native performance.

---

## 🚀 GitHub Pages Deployment Guide

To host this site live on GitHub Pages:

### 1. Create a Repository on GitHub
1. Log into your GitHub account ([github.com/bryandzcmc](https://github.com/bryandzcmc)).
2. Click **New Repository** (`+` icon at the top right).
3. Name your repository (e.g. `portfolio` or `johnpaul-dellera-portfolio`).
4. Set it to **Public**.
5. Do **not** initialize with README or license (we already have them).
6. Click **Create repository**.

### 2. Push Local Files to GitHub
Open your terminal in this directory (`C:\Users\NITRO5\Downloads\portfolio`) and run:

```bash
# Add the remote repository (replace with your repo URL)
git remote add origin https://github.com/bryandzcmc/<your-repo-name>.git

# Push to the main branch
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment > Source**, select **Deploy from a branch**.
5. Select branch **`main`** and folder **`/(root)`**, then click **Save**.
6. Within 1-2 minutes, your site will be live at:
   `https://bryandzcmc.github.io/<your-repo-name>/`
