document.addEventListener("DOMContentLoaded", () => {
  /*  Navbar scroll shrink */
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 60);
    toggleBackToTop();
  });

  /*  Back to Top visibility  */
  const backToTop = document.getElementById("backToTop");
  function toggleBackToTop() {
    backToTop?.classList.toggle("visible", window.scrollY > 400);
  }

  /*  Smooth anchor scroll */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 8 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
    });
  });

  /*  Counter animation */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || (target >= 1000 ? "+" : "+");
    const dur = 1800;
    const step = 16;
    const inc = target / (dur / step);
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current).toLocaleString() + suffix;
    }, step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  document
    .querySelectorAll(".hero-stat-number, .counter-number")
    .forEach((el) => {
      counterObserver.observe(el);
    });

  /*  Expertise bars animation ─ */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".expertise-fill").forEach((bar) => {
            bar.style.width = bar.dataset.width + "%";
          });
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  const barsSection = document.querySelector(".expertise-bars");
  if (barsSection) barObserver.observe(barsSection);

  /*  Doctor filter tabs */
  const filterTabs = document.querySelectorAll(".filter-tab");
  const doctorCards = document.querySelectorAll(
    "#doctorsGrid [data-specialty]",
  );

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      doctorCards.forEach((card) => {
        const show = filter === "all" || card.dataset.specialty === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });

  /*  Pricing toggle (Monthly / Yearly) */
  const billingToggle = document.getElementById("billingToggle");
  billingToggle?.addEventListener("change", () => {
    const isYearly = billingToggle.checked;
    document.querySelectorAll(".price-num").forEach((el) => {
      el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
    });
    document.querySelectorAll(".price-header sub").forEach((el) => {
      el.textContent = isYearly ? "/yr" : "/mo";
    });
  });

  /*  Appointment form feedback  */
  document.getElementById("submitAppt")?.addEventListener("click", () => {
    const btn = document.getElementById("submitAppt");
    btn.innerHTML =
      '<i class="fa fa-check-circle me-2"></i>Appointment Confirmed!';
    btn.style.background = "#10b981";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML =
        '<i class="fa fa-calendar-check me-2"></i>Confirm Appointment';
      btn.style.background = "";
      btn.disabled = false;
    }, 3500);
  });

  /*  Active nav link on scroll ─ */
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  const linkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id,
            );
          });
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" },
  );

  sections.forEach((s) => linkObserver.observe(s));
});
