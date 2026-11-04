// Lightweight Standalone MRZ Parser for Passport Scanning
function parseMRZString(text) {
  // Strip out invalid characters
  const clean = text.replace(/[^A-Z0-9<]/g, '');
  
  // Look for the standard 6-digit DOB pattern (YYMMDD) present in passport MRZ lines
  const match = clean.match(/(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/);
  if (!match) return null;

  const yy = parseInt(match[1], 10);
  const mm = parseInt(match[2], 10);
  const dd = parseInt(match[3], 10);

  const currentYearTwoDigits = parseInt(new Date().getFullYear().toString().slice(-2), 10);
  const fullYear = (yy <= currentYearTwoDigits) ? 2000 + yy : 1900 + yy;

  return new Date(fullYear, mm - 1, dd);
}

