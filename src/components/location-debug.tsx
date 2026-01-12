
import { env } from "@/env";

export function LocationDebug({ locationInfo }: { locationInfo: any }) {
  if (env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-black/80 p-4 text-xs text-white">
      <pre>{JSON.stringify(locationInfo, null, 2)}</pre>
    </div>
  );
}
