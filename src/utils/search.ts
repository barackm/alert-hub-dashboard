export function updateQueryString(
  currentSearch: string,
  updates: Record<string, string | null>
): string {
  const params = new URLSearchParams(currentSearch);

  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  }

  const newQueryString = params.toString();
  return newQueryString ? `?${newQueryString}` : "";
}
