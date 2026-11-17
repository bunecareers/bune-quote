// Bot traps shared by the forms and the lead API.
// - honeypot: a field people never see; bots that fill every input fill it
// - timing: people need more than a few seconds to fill in a form

export const HONEYPOT_FIELD = "website";
export const MIN_FILL_MS = 3000;

export interface SpamSignals {
  _hp?: string; // honeypot value
  _t?: number; // milliseconds between the form appearing and submit
}

export function looksLikeSpam(body: unknown) {
  if (!body || typeof body !== "object") return false;
  const { _hp, _t } = body as SpamSignals;
  if (typeof _hp === "string" && _hp.trim() !== "") return true;
  if (typeof _t !== "number" || !Number.isFinite(_t) || _t < MIN_FILL_MS) return true;
  return false;
}
