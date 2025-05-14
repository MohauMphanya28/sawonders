document.addEventListener("DOMContentLoaded", () => {
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
  updateSlide(); // run once initially
});
