import { useState, useEffect } from "react"
import "./Match.css"


const Match = () => {
    const [hamsterUno, setHamsterUno] = useState(null)
    const [hamsterDos, setHamsterDos] = useState(null)
    const [winner, setWinner] = useState(null)
    const [loser, setLoser] = useState(null)
    const [clickedHamster, setClickedHamster] = useState(null)

    useEffect (() =>{
        const getHamsters = async () => {
                let firstHamster
                let secondHamster

                for (let i = 0; i <=1; i++) {
                    const resp =  await fetch("https://hamsterwars-sinan.herokuapp.com/hamsters/random")
                    const data = await resp.json()

                    if(i === 0) firstHamster = data
                    if(i === 1) secondHamster = data
                }
                setHamsterUno(firstHamster)
                setHamsterDos(secondHamster)
                
            }
        getHamsters()
        }, [])

        const hamsterClick = (winnerHamster, loserHamster) => {
           
               setWinner({
                   id: winnerHamster.id,
                   games: winnerHamster.games + 1,
                   wins: winnerHamster.wins + 1
               })
               setLoser({
                   id: loserHamster.id,
                   games: loserHamster.games + 1,
                   defeats: loserHamster.defeats + 1
               })
            console.log("winner: " + winnerHamster.name, "Loser: " + loserHamster.name)

              
        }
        
        useEffect(() => {
            if(winner != null) {
              const matchPost = async () => {
                const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    winnerId: winner?.id,
                    loserId: loser?.id
                 })
            };

            await fetch("https://hamsterwars-sinan.herokuapp.com/matches/", requestOptions)
            }

            const winnerUpdate = async () => {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        wins: winner?.wins,
                        games: winner?.games
                     })
                };

                await fetch(`https://hamsterwars-sinan.herokuapp.com/hamsters/${winner?.id}`, requestOptions)
            }
            
            const loserUpdate = async () => {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        defeats: loser?.defeats,
                        games: loser?.games
                     })
                };

                await fetch(`https://hamsterwars-sinan.herokuapp.com/hamsters/${loser?.id}`, requestOptions)
            }
            
            matchPost()
            winnerUpdate()
            loserUpdate()  
            }
            
            },[winner, loser]) 

        
    return (
            <>
            <div className="hamster-container">
                <div className="hamster-boxOne">
                    {hamsterUno ? <img src={require(`../../../img/${hamsterUno.imgName}`)}></img> : null}
                    <span>Name: { hamsterUno?.name}</span><br/>
                    <span>Age: { hamsterUno?.age }</span><br/>
                    <span>Loves: { hamsterUno?.loves }</span>
                    <button onClick={()=> hamsterClick(hamsterUno, hamsterDos)}>Vote</button>
                </div>
                <div className="hamster-boxTwo">
                    {hamsterDos ? <img  src={require(`../../../img/${hamsterDos.imgName}`)}></img> : null}
                    <span> Name: { hamsterDos?.name}</span><br/>
                    <span>Age: { hamsterDos?.age }</span><br/>
                    <span>Loves: { hamsterDos?.loves }</span>
                    <button onClick={()=> hamsterClick(hamsterDos, hamsterUno)}>Vote</button>
                </div>
            </div>
            </>
        )

}

    


   
export default Match;
