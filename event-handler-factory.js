/**
 * Creates a configurable click-tracker
 *
 * @param {string} initialLabel A unique label for this handler
 * @returns {{
 * handler: function(Event): void,
 * subscribe: (element: Element, eventType?: string) => void,
 * unsubscribe: () => void,
 * getCount: function(): number,
 * reset: function(): void
 * setLabel: function(string): void
 * getLabel: function(): string}}
 */
function createClickTracker(initialLabel) {
  let count = 0;
  let label = initialLabel;
  let targetElement = null;
  let eventType = null;

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

    /**
     *
     * Attach the handler to a DOM element.
     * if already subscribed, it will first unsubscribe.
     *
     * @param {Element} element The DOM element to attach the handler to
     * @param {string} [eventType='click'] The type of event to listen
     */
    subscribe(element, type = "click") {
      if (targetElement && eventType) {
        this.unsubscribe();
      }
      targetElement = element;
      eventType = type;
      targetElement.addEventListener(eventType, handler);
    },

    /**
     *
     * Remove the handler from whatever it was subscribed to.
     *
     */
    unsubscribe() {
      if (targetElement && eventType) {
        targetElement.removeEventListener(eventType, handler);
        targetELement = null;
        eventType = null;
      }
    },
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

// Subscribe
saveTracker.subscribe(btnSave);

// examples continued
console.log(saveTracker.getCount());
console.log(tracker.getCount()); // 0
tracker.reset();
tracker.setLabel("quick-save");
console.log(tracker.getLabel());

// Unsubscribe
tracker.unsubscribe();
