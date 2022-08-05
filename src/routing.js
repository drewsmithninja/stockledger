import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import StageProcessing from "./Pages/StageProcessing";
import AdminLayout from "./Pages/Dashboard/AdminLayout";
import ErrorProcessing from "./Components/ErrorProcessing";
import SystemConfig from "./Pages/systemConfig";
import Reconciliation from "./Pages/Reconciliation";
import InquryScreen from "./Pages/inquiry";
import NonInventory from "./Pages/Noninventory";
import Download from "./Pages/StageProcessing/download";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stage-processing" element={<StageProcessing />} />
        <Route path="/download" element={<Download />} />
        <Route path="/error-processing" element={<ErrorProcessing />} />
        <Route path="/system-config" element={<SystemConfig />} />
        <Route path="/reconciliation" element={<Reconciliation />} />
        <Route path="/inquiry" element={<InquryScreen />} />
        <Route path="/noninventory/" element={<NonInventory />} />
      </Route>
    </Routes>
  );
}

export default Routing;
