import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* Otras rutas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
