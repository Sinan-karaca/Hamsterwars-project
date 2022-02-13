import "./App.css";
import Match from "./components/Battle/Match";
import Battle from "./components/Battle/Battle";
import Gallery from "./components/Gallery/Gallery";
import "./components/Battle/Battle.css";
import NewHamster from "./components/Gallery/NewHamster";

function App() {
    return (
        <div className="App">
            <Battle />
            <NewHamster />
        </div>
    );
}

export default App;
