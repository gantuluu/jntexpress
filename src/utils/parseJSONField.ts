export const parseJSONField = (field: any) => {
  if (typeof field !== "string") return field;
  
  // If it doesn't look like JSON (doesn't start with { or [), don't even try to parse it
  const trimmed = field.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return field;
  }

  try {
    return JSON.parse(field);
  } catch (e) {
    // Only log if it really looked like it should be JSON
    console.warn("Failed to parse JSON field, returning original string:", field);
    return field;
  }
};
