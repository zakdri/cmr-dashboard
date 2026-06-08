export function runLegacyHandler(event, handler) {
  const element = event.currentTarget;
  const fn = new Function("event", `with (window) { ${handler} }`);
  const result = fn.call(element, event);

  if (result === false) {
    event.preventDefault();
    event.stopPropagation();
  }
}
