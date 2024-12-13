export function updateSearchParams(key: string, value: string[] | undefined) {
  const searchParams = new URLSearchParams(window.location.search);

  if (!value || value.length === 0) {
    searchParams.delete(key);
  } else {
    searchParams.set(key, JSON.stringify(value));
  }

  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, "", newUrl);

  return searchParams.toString();
}
