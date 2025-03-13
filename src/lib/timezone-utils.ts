// Mapping of common abbreviations to their corresponding timezones
export const TIMEZONE_ABBREVIATIONS: Record<string, string[]> = {
  // North America
  "et": ["America/New_York"],
  "est": ["America/New_York"],
  "edt": ["America/New_York"],
  "ct": ["America/Chicago"],
  "cst": ["America/Chicago"],
  "cdt": ["America/Chicago"],
  "mt": ["America/Denver"],
  "mst": ["America/Denver"],
  "mdt": ["America/Denver"],
  "pt": ["America/Los_Angeles"],
  "pst": ["America/Los_Angeles"],
  "pdt": ["America/Los_Angeles"],
  "at": ["America/Halifax"],
  "ast": ["America/Halifax"],
  "adt": ["America/Halifax"],
  // Europe
  "gmt": ["Europe/London"],
  "bst": ["Europe/London"],
  "cet": ["Europe/Paris", "Europe/Berlin", "Europe/Rome"],
  "cest": ["Europe/Paris", "Europe/Berlin", "Europe/Rome"],
  "eet": ["Europe/Athens"],
  "eest": ["Europe/Athens"],
  // Asia
  "ist": ["Asia/Kolkata"],
  "jst": ["Asia/Tokyo"],
  "chn": ["Asia/Shanghai"], // Changed from "cst" to "chn" to avoid duplicate key
  // Australia
  "aest": ["Australia/Sydney"],
  "aedt": ["Australia/Sydney"],
  "awst": ["Australia/Perth"],
  // Common names
  "london": ["Europe/London"],
  "paris": ["Europe/Paris"],
  "new york": ["America/New_York"],
  "los angeles": ["America/Los_Angeles"],
  "tokyo": ["Asia/Tokyo"],
  "sydney": ["Australia/Sydney"],
  "india": ["Asia/Kolkata"],
  "mumbai": ["Asia/Kolkata"],
  "delhi": ["Asia/Kolkata"],
};

// Full list of available timezones
export const TIMEZONES = [
  "UTC",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Africa/Lagos",
  "America/Anchorage",
  "America/Bogota",
  "America/Chicago",
  "America/Denver",
  "America/Halifax",
  "America/Los_Angeles",
  "America/Mexico_City",
  "America/New_York",
  "America/Phoenix",
  "America/Santiago",
  "America/Sao_Paulo",
  "America/Toronto",
  "America/Vancouver",
  "Asia/Bangkok",
  "Asia/Dubai",
  "Asia/Hong_Kong",
  "Asia/Jakarta",
  "Asia/Jerusalem",
  "Asia/Kolkata",
  "Asia/Manila",
  "Asia/Seoul",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Adelaide",
  "Australia/Brisbane",
  "Australia/Melbourne",
  "Australia/Perth",
  "Australia/Sydney",
  "Europe/Amsterdam",
  "Europe/Athens",
  "Europe/Berlin",
  "Europe/Dublin",
  "Europe/Istanbul",
  "Europe/London",
  "Europe/Madrid",
  "Europe/Moscow",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Rome",
  "Europe/Stockholm",
  "Europe/Vienna",
  "Europe/Zurich",
  "Pacific/Auckland",
  "Pacific/Fiji",
  "Pacific/Honolulu"
];

/**
 * Filters timezones based on a search string
 */
export function filterTimezones(searchTerm: string, timezones: string[]): string[] {
  console.log("filterTimezones called with:", searchTerm);
  
  // If empty search, show all timezones
  if (!searchTerm.trim()) return timezones;
  
  const searchLower = searchTerm.toLowerCase().trim();
  console.log("Normalized search term:", searchLower);
  
  return timezones.filter((timezone) => {
    // Direct match with timezone name (America/New_York -> new york)
    const timezoneNormalized = timezone.toLowerCase().replace(/_/g, " ");
    const directMatch = timezoneNormalized.includes(searchLower);
    if (directMatch) {
      console.log(`Direct match found: ${timezone} contains ${searchLower}`);
      return true;
    }
    
    // Check for exact matches with abbreviations (est -> America/New_York)
    for (const [abbr, matchingZones] of Object.entries(TIMEZONE_ABBREVIATIONS)) {
      if (abbr.toLowerCase() === searchLower) {
        if (matchingZones.includes(timezone)) {
          console.log(`Abbreviation exact match: ${searchLower} -> ${timezone}`);
          return true;
        }
      }
    }
    
    // Check for partial matches with abbreviations (e -> et, est)
    if (searchLower.length >= 1) {
      for (const [abbr, matchingZones] of Object.entries(TIMEZONE_ABBREVIATIONS)) {
        if (abbr.toLowerCase().startsWith(searchLower) && matchingZones.includes(timezone)) {
          console.log(`Abbreviation partial match: ${searchLower} matches start of ${abbr} -> ${timezone}`);
          return true;
        }
      }
    }
    
    // Check common names like "new york" -> America/New_York
    for (const [name, matchingZones] of Object.entries(TIMEZONE_ABBREVIATIONS)) {
      if (name.toLowerCase().includes(searchLower) && matchingZones.includes(timezone)) {
        console.log(`Common name match: ${searchLower} found in ${name} -> ${timezone}`);
        return true;
      }
    }
    
    return false;
  });
}
