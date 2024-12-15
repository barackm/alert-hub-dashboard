import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      // Use searchParams directly since it's already a URLSearchParams instance
      const current = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      }

      return current.toString();
    },
    [searchParams]
  );

  const setParams = useCallback(
    (updates: Record<string, string>) => {
      const queryString = createQueryString(updates);
      router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`);
    },
    [router, pathname, createQueryString]
  );

  const setParam = useCallback(
    (key: string, value: string | null) => {
      setParams({ [key]: value ?? "" });
    },
    [setParams]
  );

  const getParam = useCallback(
    (key: string) => searchParams?.get(key) ?? null,
    [searchParams]
  );

  return { setParam, setParams, getParam };
}
