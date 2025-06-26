/**
 * Creates a configurable click-tracker
 *
 * @param {string} initialLabel A unique label for this handler
 * @returns {{
 * handler: function(Event): void,
 * getCount: function(): number,
 * reset: function(): void
 * setLabel: function(string): void
 * getLabel: function(): string}}
 */
function createClickTracker(initialLabel) {
  let count = 0;
  let label = initialLabel;

  function handler(event) {
    count += 1;
    console.log(
      `[${label}] clicked ${count} time${count === 1 ? "" : "s"}`,
      event
    );
    // e.g. sendAnalytics({ label, count, timestamp: Date.now() });
  }

  return {
    handler,
    getCount() {
      return count;
    },
    reset() {
      count = 0;
    },
    setLabel(newLabel) {
      label = newLabel;
    },
    getLabel() {
      return label;
    },
  };
}

// Usage example
const tracker = createClickTracker("save");
document
  .getElementById("saveButton")
  .addEventListener("click", tracker.handler);

// examples continued
console.log(tracker.getCount()); // 0
tracker.reset();
tracker.setLabel("quick-save");
console.log(tracker.getLabel());
