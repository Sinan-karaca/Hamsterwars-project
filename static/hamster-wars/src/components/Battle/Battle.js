import { useState } from "react"
import "./Battle.css"

const Battle = () => {

    const [displayResults, setDisplayResults] = useState(false)
    const [winner, setWinner] = useState()
    const [loser, setLoser] = useState()

};

const postBattle = (win , loss) =>{
  setWinner(win)
  setLoser(loss)
  setDisplayResults(true)
}

const newBattle = () => {
  setDisplayResults(false)
}


return (
  <>
    <div className="container">
  
    </div>
  </>
)
export default Battle;

