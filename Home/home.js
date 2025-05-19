document.addEventListener("DOMContentLoaded", () => {
  // Slider Logic
  const cards = document.querySelectorAll(".inspo-cards .attraction");
  const cardsContainer = document.querySelector(".inspo-cards");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  const visibleCount = 4;
  let currentIndex = 0;

  function updateSlide() {
    const containerWidth = document.querySelector(".inspo-cards-wrapper").offsetWidth;
    const offset = (containerWidth / visibleCount) * currentIndex;
    cardsContainer.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < cards.length - visibleCount) {
      currentIndex++;
      updateSlide();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlide();
    }
  });

  window.addEventListener("resize", updateSlide);
  updateSlide();

  // User Greeting Logic
  const userGreeting = document.getElementById("userGreeting");
  const accountIcon = document.getElementById("accountIcon");
  const username = localStorage.getItem("loggedInUser");

  if (username) {
    userGreeting.textContent = `Hi, ${username}`;
    accountIcon.title = "Account settings";
  } else {
    userGreeting.textContent = "Hi, user";
    accountIcon.title = "Click to log in";
    accountIcon.addEventListener("click", () => {
      window.location.href = "register.html"; // Update if your login page has a different name
    });
  }
});

// Dropdown Logic
const dropdownIcons = document.querySelectorAll(".dropdown-wrapper i");

dropdownIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const dropdown = icon.nextElementSibling;
    dropdown.classList.toggle("hidden");

    // Close other dropdowns
    document.querySelectorAll(".dropdown").forEach((d) => {
      if (d !== dropdown) d.classList.add("hidden");
    });
  });
});

// Click outside to close dropdowns
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown-wrapper")) {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.add("hidden");
    });
  }
});

// Set input value from dropdown
document.querySelectorAll(".dropdown li").forEach((item) => {
  item.addEventListener("click", () => {
    const input = item.closest(".optn").querySelector("input");
    input.value = item.textContent;
    item.parentElement.classList.add("hidden");
  });
});

