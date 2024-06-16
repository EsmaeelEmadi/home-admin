import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR, { Fetcher } from "swr";

// TODO: better types
export const useSearch = <Res>(path: string, fetcher: Fetcher<any, any>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, error, mutate, isLoading, isValidating } = useSWR<Res>(
    `${path}?${searchParams.toString()}`,
    fetcher,
  );

  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const handleChange = (name: string, v: string) => {
    const value = v.trim();

    if (!value) {
      current.delete(name);
    } else {
      current.set(name, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    if (searchParams.size) {
      for (const [key, value] of searchParams.entries()) {
        handleChange(key, value);
      }

      if (!searchParams.has("pageNumber")) {
        handleChange("pageNumber", "1");
      }

      if (!searchParams.has("pageSize")) {
        handleChange("pageSize", "10");
      }
    } else {
      handleChange("pageSize", "10");
      handleChange("pageNumber", "1");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, isLoading, mutate, isValidating };
};
