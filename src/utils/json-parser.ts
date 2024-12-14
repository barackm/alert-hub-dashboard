type JsonParserOptions = {
  defaultValue?: any;
  throwError?: boolean;
};

export function safeJsonParse<T>(
  value: string | null | undefined,
  options: JsonParserOptions = {}
): T | null {
  const { defaultValue = null, throwError = false } = options;

  try {
    if (!value) return defaultValue;

    if (typeof value === "object") {
      return value as T;
    }

    const parsed = JSON.parse(value);
    return parsed as T;
  } catch (error) {
    if (throwError) {
      throw new Error(`Failed to parse JSON: ${error}`);
    }
    console.error("JSON Parse Error:", error);
    return defaultValue;
  }
}
