import './App.css';
import Match from "./components/Battle/Match"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Hamster wars</h1>
      </header>
      <main className='main-body'>
        <p>Klicka på Knappen för att Starta.</p> <p className='p-margin'>Sedan väljer du den hamster du tycker är sötast för att den ska vinna</p> 
        <button>Battle</button>
        <Match />
      </main>
    </div>
  );
}

export default App;
