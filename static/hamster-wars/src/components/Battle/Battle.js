import { useState } from "react";
import "./Battle.css";
import Match from "./Match";

const Battle = () => {
    const [displayHamster, setDisplayHamster] = useState(false);
    const [changeText, setChangeText] = useState(false);
    const [trigger, setTrigger] = useState(0);

    const newMatch = () => {
        setTrigger(trigger + 1);
    };

    const swag = () => {
        newMatch();
        preBattle();
        setDisplayHamster(true);
    };

    const preBattle = () => {
        setDisplayHamster(true);
        setChangeText(true);
    };

    return (
        <>
            <div className="container">
                <header className="header">
                    <h1>Welcome to Hamster wars</h1>
                </header>
                <main className="main-body">
                    <p>Klicka på Knappen för att Starta.</p>
                    <p className="p-margin">
                        Sedan väljer du den hamster du tycker är sötast för att
                        den ska vinna
                    </p>
                    <button onClick={swag}>
                        {changeText ? "New Match" : "Battle"}
                    </button>
                    {displayHamster ? <Match newGame={trigger} /> : null}
                </main>
            </div>
        </>
    );
};

export default Battle;
