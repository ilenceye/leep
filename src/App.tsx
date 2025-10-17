import { ROUTES } from "@/constants";
import { CreateLeepShortcut } from "@/pages/CreateLeepShortcut";
import { Home } from "@/pages/Home";
import { Route } from "wouter";

export default function App() {
  return (
    <div className="mx-auto h-dvh max-w-md px-4">
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.SHORTCUTS} component={CreateLeepShortcut} />
    </div>
  );
}
