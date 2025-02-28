const onboardingBtn = document.querySelector(".onboarding-btn");
const onboardingBtnn = document.querySelector(".onboarding-btnn");
const onboardingContainer = document.querySelector(".onboarding-container");
const onboardingOverlay = document.querySelector(".onboarding-overlay");
const skipBtn = document.querySelector(".onboarding-container .skip-btn");
const steps = document.querySelectorAll(".onboarding-container .step");
const stepsContainer = document.querySelector(".onboarding-container .steps");
const nextBtn = document.querySelector(".onboarding-container .next-btn");
const dots = document.querySelectorAll(".onboarding-container .dot");

let stepPosition = 0;
let currentStep = 0;

const showPopup = () => {
  onboardingOverlay.style.display = "block";
  onboardingContainer.style.display = "block";
};

const hidePopup = () => {
  onboardingOverlay.style.display = "none";
  onboardingContainer.style.display = "none";
};

const init = () => {
  stepsContainer.style.transition = "unset";
  onboardingContainer.classList.add("active");
  onboardingOverlay.classList.add("active");
  currentStep = 0;
  stepPosition = 0;
  stepsContainer.style.transform = `translateX(-${stepPosition}px)`;
  console.log("tutorial started");

  dots.forEach((d) => {
    d.classList.remove("active");
  });

  dots[currentStep].classList.add("active");

  nextBtn.innerHTML = "Next";
};

onboardingBtnn.addEventListener("click", () => {
  showPopup();
  init();
});

onboardingBtn.addEventListener("click", () => {
  showPopup();
  init();
});

skipBtn.addEventListener("click", () => {
  hidePopup();
});

nextBtn.addEventListener("click", () => {
  stepsContainer.style.transition = "all 400ms ease";
  currentStep++;

  if (currentStep >= steps.length) {
    stepsContainer.style.transition = "unset";
    hidePopup();
    currentStep = 0;
  }

  stepPosition += steps[0].offsetWidth;

  stepsContainer.style.transform = `translateX(-${stepPosition}px)`;

  dots.forEach((d) => {
    d.classList.remove("active");
  });

  dots[currentStep].classList.add("active");

  if (currentStep == steps.length - 1) {
    nextBtn.innerHTML = "Finish";
  }
});
