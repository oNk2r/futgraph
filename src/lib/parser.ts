/**
 * Parses a string to an integer, or returns a default value.
 */
export function parseIntSafe(value: string | null | undefined, defaultValue = 0): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Parses a string to an integer, or returns null if empty or invalid.
 */
export function parseIntOrNull(value: string | null | undefined): number | null {
  if (!value || value.trim() === "") return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Parses a string to a float, or returns a default value.
 */
export function parseFloatSafe(value: string | null | undefined, defaultValue = 0.0): number {
  if (!value) return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Parses a string to a float, or returns null if empty or invalid.
 */
export function parseFloatOrNull(value: string | null | undefined): number | null {
  if (!value || value.trim() === "") return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Parses a string to a boolean. Supports 'true', 'false', '1', '0', 'yes', 'no'.
 */
export function parseBoolSafe(value: string | null | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

/**
 * Parses a string date to a Date object, or returns a default date (epoch) if invalid.
 */
export function parseDateSafe(value: string | null | undefined): Date {
  if (!value) return new Date(0);
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

/**
 * Parses a string date to a Date object, or returns null if empty or invalid.
 */
export function parseDateOrNull(value: string | null | undefined): Date | null {
  if (!value || value.trim() === "") return null;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Normalizes empty strings to null.
 */
export function parseStringOrNull(value: string | null | undefined): string | null {
  if (!value || value.trim() === "") return null;
  return value.trim();
}
