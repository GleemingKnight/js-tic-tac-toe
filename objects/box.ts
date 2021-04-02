export enum BoxState {
    TAKEN_O, TAKEN_X, ANSWER, UNBEATABLE
}

export type Box = {
    index: number,
    state: BoxState,
    mouseOver: boolean
}

/**
 * Checks whether or not a side has won the game
 * 
 * @param boxes Box props
 * @param turn Who's turn it is
 * @returns Whether or not they won
 */
export const checkWin = function(boxes: Box[], turn: BoxState): boolean {
    let won = false
    conditions.forEach((condition) => {
        if(condition.checkConditon(boxes, turn)) won = true
    })

    return won
}

class WinCondition {
    public spots: number[]
    constructor(spots: number[]) { this.spots = spots }

    /**
     * Checks whether or not a side has won the game
     * (based off a single condition)
     * 
     * @param boxes Box props
     * @param turn Who's turn it is
     * @returns Whether or not they won
     */
    public checkConditon(boxes: Box[], turn: BoxState): boolean {
        let x = 0;

        boxes.forEach((box) => {
            if(box.state === turn && this.spots.includes(box.index)) x++
        })

        if(x === 3) console.log("WONN!!!")

        return x === 3
    }
}

/**
 * Tic Tac Toe win conditions
 */
const conditions = [
    new WinCondition([
        0, 1, 2
    ]),
    new WinCondition([
        0, 3, 6
    ]),
    new WinCondition([
        0, 4, 8
    ]),
    new WinCondition([
        6, 7, 8
    ]),
    new WinCondition([
        1, 4, 7
    ]),
    new WinCondition([
        2, 5, 8
    ]),
    new WinCondition([
        3, 4, 5
    ]),
    new WinCondition([
        2, 4, 6
    ])
]