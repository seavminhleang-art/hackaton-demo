import Home from "../DashboardApp";

export default function EmergencyPage() {
  return <Home module="emergency" requireAuth={false} standalone />;
}
