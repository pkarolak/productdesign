/**
 * A light tap where the platform allows one: the Vibration API on Android, or the switch toggle haptic of iOS 18
 * Safari. Browsers only allow it after the visitor has tapped the page at least once, and fail silently otherwise.
 */
export function haptic(ms = 10) {
  if (typeof navigator === "undefined" || window.matchMedia("(hover: hover)").matches) return;
  if (navigator.vibrate?.(ms)) return;
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.setAttribute("switch", "");
  label.hidden = true;
  label.append(input);
  document.body.append(label);
  label.click();
  label.remove();
}
