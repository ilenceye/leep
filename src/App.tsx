import { ROUTES } from "@/constants";
import { CreateLeepShortcut } from "@/pages/CreateLeepShortcut";
import { Home } from "@/pages/Home";
import { Stats } from "@/pages/Stats";
import { Route } from "wouter";

import { Layout } from "./components/Layout";

export default function App() {
  return (
    <div className="mx-auto h-dvh max-w-md px-4">
      <Layout>
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.STATS} component={Stats} />
      </Layout>
      <Route path={ROUTES.SHORTCUTS} component={CreateLeepShortcut} />
    </div>
  );
}
