import { LayoutPrincipal } from "./layouts/LayoutPrincipal";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <LayoutPrincipal>
      <Dashboard />
    </LayoutPrincipal>
  );
}
