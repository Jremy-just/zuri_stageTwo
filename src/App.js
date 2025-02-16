import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import ConferenceTicketGenerator from "./components/Generator";
import TicketPage from "./components/ticket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConferenceTicketGenerator />} />
        <Route path="/ticket" element={<TicketPage />} />
      </Routes>
    </Router>
  );
}

export default App;