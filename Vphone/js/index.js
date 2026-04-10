document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.getElementById("sliderWrapper");
  const cards = wrapper.children;
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.getElementById("sliderDots");

  const total = cards.length;
  const visible = 4;
  let current = 0;

  // Clone nodes for infinite loop
  for (let i = 0; i < visible; i++) {
    const clone = cards[i].cloneNode(true);
    wrapper.appendChild(clone);
  }

  function updateSlider() {
    wrapper.style.transform = `translateX(-${(100 / visible) * current}%)`;
    updateDots();
  }

  function nextSlide() {
    current++;
    if (current > total) {
      wrapper.style.transition = "none";
      current = 1;
      wrapper.style.transform = `translateX(0%)`;
      setTimeout(() => {
        wrapper.style.transition = "transform 0.4s ease";
        updateSlider();
      }, 10);
    } else {
      updateSlider();
    }
  }

  function prevSlide() {
    if (current === 0) {
      wrapper.style.transition = "none";
      current = total;
      wrapper.style.transform = `translateX(-${(100 / visible) * current}%)`;
      setTimeout(() => {
        wrapper.style.transition = "transform 0.4s ease";
        updateSlider();
      }, 10);
    } else {
      current--;
      updateSlider();
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll(".slider-dots span");
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[current % total]?.classList.add("active");
  }

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      current = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  setInterval(nextSlide, 4000);
});
