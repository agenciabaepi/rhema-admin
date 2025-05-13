import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Notificacoes from "./pages/Notificacoes";
import Devocionais from "./pages/Devocionais";
import Configuracoes from "./pages/Configuracoes";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Notificacoes />} />
            <Route path="/devocionais" element={<Devocionais />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;