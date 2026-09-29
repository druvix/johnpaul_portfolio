/**
 * ==========================================================================
 * PORTFOLIO SCRIPT - John Paul Perocillo Dellera
 * IT Technical Support & Telecom Site Operations Specialist
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. THEME MANAGEMENT (DARK / LIGHT MODE)
  // ------------------------------------------------------------------------
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("jp-portfolio-theme");
    if (savedTheme) return savedTheme;
    return prefersDark.matches ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      document.body.classList.remove("dark");
      if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  };

  // Set initial theme
  const currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      const nextTheme = isDark ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem("jp-portfolio-theme", nextTheme);
      showToast(`Switched to ${nextTheme} theme`);
    });
  }

  // Listen to OS theme changes if no explicit user override
  prefersDark.addEventListener("change", (e) => {
    if (!localStorage.getItem("jp-portfolio-theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  // ------------------------------------------------------------------------
  // 2. SCROLL PROGRESS BAR & BACK TO TOP
  // ------------------------------------------------------------------------
  const progressBar = document.getElementById("scroll-progress");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }

    if (backToTopBtn) {
      if (winScroll > 320) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ------------------------------------------------------------------------
  // 3. MOBILE NAVIGATION MENU
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking navigation link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. ACTIVE NAVIGATION LINK SPY (IntersectionObserver)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, {
    rootMargin: "-20% 0px -70% 0px"
  });

  sections.forEach((sec) => navObserver.observe(sec));

  // ------------------------------------------------------------------------
  // 5. SCROLL REVEAL ANIMATIONS
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // ------------------------------------------------------------------------
  // 6. INTERACTIVE TERMINAL
  // ------------------------------------------------------------------------
  const terminalForm = document.getElementById("terminal-form");
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");
  const commandChips = document.querySelectorAll(".chip");

  const terminalCommands = {
    help: () => [
      `<span class="term-dim">Available commands:</span>`,
      `  <span class="term-highlight">whoami</span>      - Overview of John Paul Dellera`,
      `  <span class="term-highlight">skills</span>      - Core competencies & tools`,
      `  <span class="term-highlight">experience</span>  - Career timeline & past companies`,
      `  <span class="term-highlight">projects</span>    - Featured project deployments`,
      `  <span class="term-highlight">contact</span>     - Direct phone & email info`,
      `  <span class="term-highlight">status</span>      - Current availability status`,
      `  <span class="term-highlight">clear</span>       - Clear terminal window`
    ],
    whoami: () => [
      `<span class="term-highlight">John Paul Perocillo Dellera</span>`,
      `Role: IT Technical Support Specialist & Telecom Field Coordinator`,
      `Location: Metro Manila, Philippines`,
      `Experience: Aivee Clinic, Costplus Inc., Jezka Construction, PEASE Corp.`
    ],
    skills: () => [
      `<span class="term-highlight">Core Technical Proficiencies:</span>`,
      `• <span class="term-prompt">IT Support:</span> POS / MMS systems, PC assembly, Windows OS, peripherals`,
      `• <span class="term-prompt">Telecom:</span> TSSR Creation, Huawei ISDP, Globe AC Power Upgrades`,
      `• <span class="term-prompt">Infrastructure:</span> CCTV / NVR, Server Upkeep, LAN wiring, Router config`,
      `• <span class="term-prompt">Operations:</span> DPR, PAT acceptance checklists, BOQ / PO reconciliation`
    ],
    experience: () => [
      `<span class="term-highlight">Career Chronology:</span>`,
      `[2023 - 2026] <span class="term-prompt">IT Support Rep</span> @ Aivee Clinic (BGC Taguig)`,
      `[2022 - 2023] <span class="term-prompt">Team Leader / TSSR Creator</span> @ Costplus Inc. (Globe Project)`,
      `[2019 - 2022] <span class="term-prompt">Documentation / PCMO</span> @ Jezka Construction Corp.`,
      `[2016 - 2019] <span class="term-prompt">Data Encoder</span> @ PEASE Corporation`
    ],
    projects: () => [
      `<span class="term-highlight">Featured Deployments:</span>`,
      `1. <span class="term-prompt">Aivee Clinic:</span> Multi-branch POS & MMS setup + CCTV surveillance`,
      `2. <span class="term-prompt">Globe AC Power:</span> Base station TSSR surveys & electrical upgrades`,
      `3. <span class="term-prompt">Huawei ISDP:</span> Site compliance, live milestone audit & PAT clearance`
    ],
    contact: () => [
      `<span class="term-highlight">Get in Touch:</span>`,
      `✉ Email:  <a href="mailto:cezto30@gmail.com" class="term-highlight">cezto30@gmail.com</a>`,
      `☎ Phone:  <a href="tel:+639978462502" class="term-highlight">+63 997 846 2502</a>`,
      `📍 Based: Metro Manila, PH (Open to onsite & field visits)`
    ],
    status: () => [
      `<span class="text-success">✔ Status: Active and available for hire</span>`,
      `Preference: IT Technical Support / Telecom Project Coordinator roles`
    ],
    sudo: () => [
      `<span class="term-dim">Permission denied: John Paul is already running with administrative efficiency.</span>`
    ]
  };

  const executeCommand = (cmdText) => {
    const rawCmd = cmdText.trim();
    const cleanCmd = rawCmd.toLowerCase();

    // Print command line
    const cmdLine = document.createElement("p");
    cmdLine.className = "term-line";
    cmdLine.innerHTML = `<span class="term-prompt">jp@dellera:~$</span> ${escapeHTML(rawCmd)}`;
    terminalOutput.appendChild(cmdLine);

    if (cleanCmd === "clear") {
      terminalOutput.innerHTML = `
        <p class="term-line"><span class="term-dim"># Terminal cleared. Type 'help' for command list.</span></p>
      `;
      return;
    }

    if (terminalCommands[cleanCmd]) {
      const outputLines = terminalCommands[cleanCmd]();
      outputLines.forEach((line) => {
        const resLine = document.createElement("p");
        resLine.className = "term-response";
        resLine.innerHTML = line;
        terminalOutput.appendChild(resLine);
      });
    } else if (cleanCmd !== "") {
      const errorLine = document.createElement("p");
      errorLine.className = "term-response text-muted";
      errorLine.innerHTML = `Command not found: "${escapeHTML(rawCmd)}". Type <span class="term-highlight">help</span> for a list of valid commands.`;
      terminalOutput.appendChild(errorLine);
    }

    // Auto scroll to bottom of terminal
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      if (val.trim()) {
        executeCommand(val);
        terminalInput.value = "";
      }
    });
  }

  // Clickable command chips
  commandChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const cmd = chip.getAttribute("data-cmd");
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. SKILLS FILTER & SEARCH
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");
  const skillsSearch = document.getElementById("skills-search");
  const noSkillsMsg = document.getElementById("no-skills-msg");

  let activeCategory = "all";
  let searchQuery = "";

  const applySkillFilters = () => {
    let visibleCount = 0;

    skillCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = activeCategory === "all" || cardCategory === activeCategory;
      const matchesSearch = searchQuery === "" || cardText.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noSkillsMsg) {
      if (visibleCount === 0) {
        noSkillsMsg.classList.remove("hidden");
      } else {
        noSkillsMsg.classList.add("hidden");
      }
    }
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      activeCategory = btn.getAttribute("data-filter") || "all";
      applySkillFilters();
    });
  });

  if (skillsSearch) {
    skillsSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applySkillFilters();
    });
  }

  // ------------------------------------------------------------------------
  // 8. CLIPBOARD COPY BUTTONS
  // ------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-clipboard");
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          triggerCopySuccess(btn, textToCopy);
        }).catch(() => {
          fallbackCopyText(textToCopy, btn);
        });
      } else {
        fallbackCopyText(textToCopy, btn);
      }
    });
  });

  function fallbackCopyText(text, btn) {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    tempInput.style.position = "fixed";
    tempInput.style.left = "-9999px";
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      triggerCopySuccess(btn, text);
    } catch (err) {
      showToast("Unable to copy to clipboard");
    }
    document.body.removeChild(tempInput);
  }

  function triggerCopySuccess(btn, text) {
    const tooltip = btn.querySelector(".copy-tooltip");
    if (tooltip) {
      const originalText = tooltip.textContent;
      tooltip.textContent = "Copied!";
      setTimeout(() => {
        tooltip.textContent = originalText;
      }, 2000);
    }
    showToast(`Copied "${text}" to clipboard!`);
  }

  // ------------------------------------------------------------------------
  // 9. VCARD GENERATOR & DOWNLOADER
  // ------------------------------------------------------------------------
  const downloadVcardBtn = document.getElementById("download-vcard-btn");

  if (downloadVcardBtn) {
    downloadVcardBtn.addEventListener("click", () => {
      const vCardData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Dellera;John Paul;Perocillo;;",
        "FN:John Paul Perocillo Dellera",
        "TITLE:IT Technical Support Specialist & Telecom Coordinator",
        "EMAIL;TYPE=INTERNET,HOME:cezto30@gmail.com",
        "TEL;TYPE=CELL:+639978462502",
        "ADR;TYPE=HOME:;;Metro Manila;Taguig;;Philippines",
        "NOTE:IT Support, MMS/POS, CCTV, TSSR Creator, Huawei & Globe AC Power Upgrade",
        "END:VCARD"
      ].join("\r\n");

      const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "John_Paul_Dellera_Contact.vcf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast("Contact card (vCard) downloaded!");
    });
  }

  // ------------------------------------------------------------------------
  // 10. CONTACT FORM HANDLER
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const subject = document.getElementById("form-subject").value.trim();
      const message = document.getElementById("form-message").value.trim();

      const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name}`);
      const emailBody = encodeURIComponent(
        `Hi John Paul,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`
      );

      const mailtoUrl = `mailto:cezto30@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      
      showToast("Opening your email client...");
      window.location.href = mailtoUrl;
    });
  }

  // ------------------------------------------------------------------------
  // 11. FOOTER CURRENT YEAR
  // ------------------------------------------------------------------------
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 12. HELPER UTILITIES
  // ------------------------------------------------------------------------
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }[tag] || tag));
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    if (window.toastTimer) {
      clearTimeout(window.toastTimer);
    }

    window.toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }
});