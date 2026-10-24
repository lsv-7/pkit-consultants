/**
 * Enterprise Date Utilities for PK IT Consultants
 * Guarantees cross-timezone invariance and eliminates off-by-one errors
 * between client browsers, server runtimes, database timestamps, and PDF generation.
 */

/**
 * Format a Date or date string into a consistent, enterprise-grade display string:
 * e.g., "24 October 2026"
 * Uses UTC timezone explicitly so calendar dates never shift across timezones.
 */
export function formatDisplayDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "—";
  try {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return "—";

    return d.toLocaleDateString("en-GB", {
      timeZone: "UTC",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

/**
 * Format a Date or date string into a short display string:
 * e.g., "24 Oct 2026"
 */
export function formatShortDisplayDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "—";
  try {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return "—";

    return d.toLocaleDateString("en-GB", {
      timeZone: "UTC",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

/**
 * Extracts "YYYY-MM-DD" from any Date object or ISO string for <input type="date">
 * Ensures UTC interpretation so local offsets don't change the calendar day.
 */
export function formatDateInput(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";
  try {
    if (typeof dateInput === "string") {
      const match = dateInput.match(/^(\d{4}-\d{2}-\d{2})/);
      if (match) return match[1];
      const d = new Date(dateInput);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().split("T")[0];
    }
    if (isNaN(dateInput.getTime())) return "";
    return dateInput.toISOString().split("T")[0];
  } catch {
    return "";
  }
}

/**
 * Parse an incoming "YYYY-MM-DD" or ISO string into a safe Date stored at 12:00:00 UTC.
 * Storing at 12:00 UTC ensures that across timezones ranging from UTC-11 to UTC+13,
 * the calendar date remains invariant.
 */
export function parseDateMiddayUtc(dateStr: string): Date {
  if (!dateStr || typeof dateStr !== "string") {
    throw new Error("Date string is required");
  }

  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    // Verify date did not roll over (e.g. Feb 31 -> Mar 3)
    if (
      isNaN(date.getTime()) ||
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      throw new Error(`Invalid calendar date: ${dateStr}`);
    }
    return date;
  }

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  return d;
}

/**
 * Validate whether an input string is a legitimate calendar date
 * Verifies format, month bounds (1-12), day bounds, and strict calendar existence (e.g. leap years).
 */
export function isValidDateString(dateStr: string | null | undefined): boolean {
  if (!dateStr || typeof dateStr !== "string") return false;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (year < 1970 || year > 2150) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Strict calendar validity: confirms month length and leap year validity
  const testDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  if (
    isNaN(testDate.getTime()) ||
    testDate.getUTCFullYear() !== year ||
    testDate.getUTCMonth() !== month - 1 ||
    testDate.getUTCDate() !== day
  ) {
    return false;
  }

  return true;
}

/**
 * Validates that due date is on or after invoice issue date
 */
export function isDueDateValid(invoiceDateStr: string, dueDateStr: string): boolean {
  if (!isValidDateString(invoiceDateStr) || !isValidDateString(dueDateStr)) return false;
  try {
    const inv = parseDateMiddayUtc(invoiceDateStr);
    const due = parseDateMiddayUtc(dueDateStr);
    return due.getTime() >= inv.getTime();
  } catch {
    return false;
  }
}
