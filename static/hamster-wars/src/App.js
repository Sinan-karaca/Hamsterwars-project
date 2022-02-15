import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Match from "./components/Battle/Match";
import Battle from "./components/Battle/Battle";
import Gallery from "./components/Gallery/Gallery";
import Navbar from "./components/Navbar";
import "./components/Battle/Battle.css";
import NewHamster from "./components/Gallery/NewHamster";

function App() {
    return (
        <div className="App">
            <Router>
                <header className="header">
                    <h1>Welcome to Hamster wars</h1>
                    <Navbar />
                    <h2>Vote for the cutest hamster</h2>
                    <h2>Click battle to begin</h2>
                </header>
                <main>
                    <Routes>
                        <Route path="/battle" element={<Battle />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/newHamster" element={<NewHamster />} />
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;
