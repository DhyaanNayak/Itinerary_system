
// Initialize idle time counter
let idleTimeSeconds = 0;
let idleInterval;

// Inactivity popup
function togglepopup(){
  document.getElementById("popup-1").classList.toggle("active");
}

// Function to start idle time tracking
function startIdleTimeTracking() {
    idleInterval = setInterval(function() {
      idleTimeSeconds++;

      if (idleTimeSeconds > 45) {
        togglepopup();

        idleTimeSeconds = 0;
        console.log("Idle timer target hit");
      }
    }, 1000); // Update every second
  }

// Event listener to reset idle time on user activity
window.addEventListener('mousemove', function() {
    idleTimeSeconds = 0;
});
window.addEventListener('keypress', function() {
    idleTimeSeconds = 0;
});
window.addEventListener('mousedown', function() {
    idleTimeSeconds = 0;
});

// Start tracking idle time when page loads
window.onload = function() {
    startIdleTimeTracking();
};
