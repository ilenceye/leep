import { ROUTES } from "@/constants";
import { CreateLeepShortcut } from "@/pages/CreateLeepShortcut";
import { Home } from "@/pages/Home";
import { Stats } from "@/pages/Stats";
import { Route, useLocation } from "wouter";

import { Layout } from "./components/Layout";

export default function App() {
  const [location] = useLocation();
  const showLayout = location !== ROUTES.SHORTCUTS;

  return (
    <div className="mx-auto my-4 max-w-md px-4">
      {showLayout && (
        <Layout>
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.STATS} component={Stats} />
        </Layout>
      )}
      <Route path={ROUTES.SHORTCUTS} component={CreateLeepShortcut} />
    </div>
  );
}
