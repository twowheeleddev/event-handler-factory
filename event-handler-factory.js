/**
 * Creates a click handler that logs a custom message and
 * tracks how many times it’s been invoked.
 * @param {string} label  A unique label for this handler
 * @returns {function(Event):void}
 */
function createClickTracker(label) {
  let count = 0; // private per-handler state

  return function handleClick(event) {
    count += 1;
    console.log(`[${label}] clicked ${count} time(s)`, event);
    // e.g. sendAnalytics({ label, count, event });
  };
}

// Usage:
// Suppose you have three buttons you want to track differently

const btnSave = document.getElementById("btn-save");
const btnDelete = document.getElementById("btn-delete");
const btnShare = document.getElementById("btn-share");

btnSave.addEventListener("click", createClickTracker("save"));
btnDelete.addEventListener("click", createClickTracker("delete"));
btnShare.addEventListener("click", createClickTracker("share"));
