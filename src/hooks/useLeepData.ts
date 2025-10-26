import { useEffect, useState } from "react";

import { useLeepStore } from "./useLeepStore";

export function useLeepData() {
  const [loading, setLoading] = useState(true);
  const leeps = useLeepStore((s) => s.leeps);
  const loadLeeps = useLeepStore((s) => s.loadLeeps);

  useEffect(() => {
    loadLeeps().then(() => setLoading(false));
  }, [loadLeeps]);

  return { loading, leeps };
}
