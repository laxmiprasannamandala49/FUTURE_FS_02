import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddLead from "./components/AddLead";
import Login from "./components/Login";
import ViewLeads from "./components/ViewLeads";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<AddLead />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<ViewLeads />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;