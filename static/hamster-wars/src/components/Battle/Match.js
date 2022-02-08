import { useState, useEffect } from "react";
import "./Match.css";

const Match = (trigger) => {
  const [hamsterUno, setHamsterUno] = useState(null);
  const [hamsterDos, setHamsterDos] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [clickedHamster, setClickedHamster] = useState(false);
  

  const fetchHamster = async () => {
    const resp = await fetch(
      "https://hamsterwars-sinan.herokuapp.com/hamsters/random"
    );
    const data = await resp.json();
    return data;

  };

  useEffect(() => {
    const getHamsters = async () => {
      let firstHamster = await fetchHamster();
      let secondHamster;
      let secondHamsterFound = false;
      while (!secondHamsterFound) {
        secondHamster = await fetchHamster();
        if (secondHamster.id !== firstHamster.id) {
          secondHamsterFound = true;
        }
      }

      setHamsterUno(firstHamster);
      setHamsterDos(secondHamster);
    };
    getHamsters();
  }, [trigger]);

  const hamsterClick = (winnerHamster, loserHamster,) => {
    setWinner({
      age: winnerHamster.age,
      loves: winnerHamster.loves,  
      title: "Winner",
      name: winnerHamster.name,
      imgName: winnerHamster.imgName,
      id: winnerHamster.id,
      games: winnerHamster.games + 1,
      wins: winnerHamster.wins + 1,
      defeats: winnerHamster.defeats,
    });

    setLoser({
      age: loserHamster.age,
      loves: loserHamster.loves,  
      title: "Loser",  
      name: loserHamster.name,
      imgName: loserHamster.imgName,
      id: loserHamster.id,
      games: loserHamster.games + 1,
      wins: loserHamster.wins,
      defeats: loserHamster.defeats + 1,
    });
    if (winnerHamster.id === hamsterUno.id) {
      setHamsterUno(
      {
        age: winnerHamster.age,
        loves: winnerHamster.loves,  
        title: "Winner",
        name: winnerHamster.name,
        imgName: winnerHamster.imgName,
        id: winnerHamster.id,
        games: winnerHamster.games + 1,
        wins: winnerHamster.wins + 1,
        defeats: winnerHamster.defeats,
      });
      setHamsterDos({
        age: loserHamster.age,
        loves: loserHamster.loves,  
        title: "Loser",  
        name: loserHamster.name,
        imgName: loserHamster.imgName,
        id: loserHamster.id,
        games: loserHamster.games + 1,
        wins: loserHamster.wins,
        defeats: loserHamster.defeats + 1,
      });
    } else {
      setHamsterUno({
        age: loserHamster.age,
        loves: loserHamster.loves,  
        title: "Loser",  
        name: loserHamster.name,
        imgName: loserHamster.imgName,
        id: loserHamster.id,
        games: loserHamster.games + 1,
        wins: loserHamster.wins,
        defeats: loserHamster.defeats + 1,
      });
      setHamsterDos({
        age: winnerHamster.age,
        loves: winnerHamster.loves,  
        title: "Winner",
        name: winnerHamster.name,
        imgName: winnerHamster.imgName,
        id: winnerHamster.id,
        games: winnerHamster.games + 1,
        wins: winnerHamster.wins + 1,
        defeats: winnerHamster.defeats,
      });
    }
    setClickedHamster(true);
    console.log("winner: " + winnerHamster.name, "Loser: " + loserHamster.name);


    
  };

  useEffect(() => {
    if (winner != null) {
      const matchPost = async () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            winnerId: winner?.id,
            loserId: loser?.id,
          }),
        };

        await fetch(
          "https://hamsterwars-sinan.herokuapp.com/matches/",
          requestOptions
        );
      };

      const winnerUpdate = async () => {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wins: winner?.wins,
            games: winner?.games,
          }),
        };

        await fetch(
          `https://hamsterwars-sinan.herokuapp.com/hamsters/${winner?.id}`,
          requestOptions
        );
      };

      const loserUpdate = async () => {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            defeats: loser?.defeats,
            games: loser?.games,
          }),
        };

        await fetch(
          `https://hamsterwars-sinan.herokuapp.com/hamsters/${loser?.id}`,
          requestOptions
        );
      };

      matchPost();
      winnerUpdate();
      loserUpdate();
    }
  }, [winner, loser]);

  return (
    <>
      <div className="hamster-container">
            <div className="hamster-box">
                {hamsterUno ? (
                    <img src={require(`../../../img/${hamsterUno.imgName}`)}></img>
                ) : null}
                <p>Name: {hamsterUno?.name}</p>
                <p>Age: {hamsterUno?.age}</p>
                <p>Loves: {hamsterUno?.loves}</p>
                {clickedHamster ? (
                    <div>
                    <h2>{hamsterUno.title }</h2>
                    <h3>Wins: {hamsterUno.wins}</h3>
                    <h3>Defeats: {hamsterUno.defeats}</h3>
                    <h3>Games: {hamsterUno.games}</h3>
                    </div>
                ) : null}
                <span>
                    <a onClick={() => hamsterClick(hamsterUno, hamsterDos)}></a>
                </span>
            </div>

            <div className="hamster-box">
                {hamsterDos ? (
                    <img src={require(`../../../img/${hamsterDos.imgName}`)}></img>
                ) : null}
                <p> Name: {hamsterDos?.name}</p>
                <p>Age: {hamsterDos?.age}</p>
                <p>Loves: {hamsterDos?.loves}</p>
                {clickedHamster ? (
                    <div>
                    <h2>{hamsterDos.title}</h2>
                    <h3>Wins: {hamsterDos.wins}</h3>
                    <h3>Defeats: {hamsterDos.defeats}</h3>
                    <h3>Games: {hamsterDos.games}</h3>
                    </div>
                ) : null}
                <span>
                    <a onClick={() => hamsterClick(hamsterDos, hamsterUno)}></a>
                </span>
            </div>
      </div>
    </>
  );
};

export default Match

