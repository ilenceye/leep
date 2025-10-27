import { Navigation } from "./Navigation";
import { Settings } from "./Settings";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Navigation />
        <Settings />
      </div>
      {children}
    </>
  );
}
