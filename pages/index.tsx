import { useState } from 'react'
import { Box, BoxState, checkWin } from '../objects/box'
import { GetStaticProps} from 'next'

type Props = { boxProps: Box[] }
let currentTurn = BoxState.TAKEN_O

const IndexPage = ({boxProps}: Props) => {
  const [boxes, setBoxes] = useState<Box[] | []>(boxProps)
  const [winner, setWinner] = useState(BoxState.ANSWER)

  const clickBox = function(box: Box) {
    if(box.state === BoxState.ANSWER && winner === BoxState.ANSWER) {
      const boxResults = boxes.map((boxMap) => boxMap.index === box.index ? {...boxMap, state: currentTurn, mouseOver: false} : boxMap)

      // Update react state
      setBoxes(boxResults)

      // Check if there is a winner
      if(checkWin(boxResults, currentTurn)) {
        setWinner(currentTurn)
        return
      }

      // Make it the next person's turn
      if(currentTurn === BoxState.TAKEN_O) currentTurn = BoxState.TAKEN_X
      else currentTurn = BoxState.TAKEN_O

      // Check to see if any open boxes
      let open = false
      boxResults.forEach((box) => {
        if(box.state === BoxState.ANSWER) open = true
      })

      // No more boxes so game unwinnable
      if(!open) {
        setWinner(BoxState.UNBEATABLE)
      }
    }
  }

  // Called when mouse goes over
  const mouseOver = (box: Box) => {
    if(box.state !== BoxState.ANSWER) return
    setBoxes(boxes.map((boxMap) => boxMap.index === box.index ? {...boxMap, mouseOver: true} : boxMap))
  } 

  // Called when mouse leaves
  const mouseLeave = (box: Box) => {
    if(box.state !== BoxState.ANSWER) return
    setBoxes(boxes.map((boxMap) => boxMap.index === box.index ? {...boxMap, mouseOver: false} : boxMap))
  }

  // Resets the arena
  const reset = () => {
    setBoxes(boxProps)
    setWinner(BoxState.ANSWER)
  }

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="grid grid-rows-1">
          <div className="flex justify-center items-center mb-5">
            <div className={"grid grid-rows-" + (winner === BoxState.ANSWER ? 2 : 3)}>
              <h1 className="text-4xl font-bold">Tic Tac Toe!</h1>{"\n"}
              <p className="text-2xl">
                {winner === BoxState.ANSWER ? (
                  `It is currently ${currentTurn === BoxState.TAKEN_O ? "O's" : "X's"} turn to move.`
                ) : winner === BoxState.UNBEATABLE ? (
                  `The game was a draw!`
                ) : "The player who has won is.. " + (winner === BoxState.TAKEN_O ? "O's!" : "X's!")}
              </p>
              {winner !== BoxState.ANSWER ? (
                <button onClick={reset} className="text-left text-2xl text-indigo-500 underline">
                  Restart
                </button>  
              ) : ""}
            </div>
          </div>
          <div className="flex justify-center items-center grid grid-rows-3 grid-cols-3 gap-1">
            {boxes.map((box) => (<>
              <button onMouseOver={() => mouseOver(box)} onMouseLeave={() => mouseLeave(box)} key={box.index} onClick={() => clickBox(box)} className={"flex justify-center items-center bg-gray-400 " + (winner === BoxState.ANSWER && box.state === BoxState.ANSWER ? "hover:bg-indigo-300" : "")} style={{width: "125px", height: "125px"}}>
                {box.mouseOver && winner === BoxState.ANSWER ? (
                  <>
                    {currentTurn === BoxState.TAKEN_O ? (
                      <svg height="100" width="100"> <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="15" fill="transparent" /> </svg> 
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="white" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    )}
                  </>
                ) : ""}
                
                {box.state === BoxState.TAKEN_O ? (
                  <svg height="100" width="100"> <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="15" fill="transparent" /> </svg> 
                ) : box.state === BoxState.TAKEN_X ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                ) : ""}
              </button> 
            </>))}
          </div>
        </div>
      </div>
    </>
  ) 
}

export const getStaticProps: GetStaticProps = async (context) => {
  let boxes: Box[] = [];
  for(let i = 0; i < 9; i++) {
    boxes = [...boxes, {
      index: i,
      state: BoxState.ANSWER,
      mouseOver: false
    }]
  }

  return {
    props: {
      boxProps: boxes
    }
  }
}

export default IndexPage
