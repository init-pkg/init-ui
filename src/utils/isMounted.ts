import { useEffect, useState } from "react";

/**
 * Hook to check if the component is mounted on the client side.
 * - `isClient` is true if the code is running in a browser environment.
 * - `isMounted` is true if the component has been mounted on the client side.
 */

export function useMounted() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isClient: typeof window !== "undefined",
    isMounted: isClient,
  };
}
