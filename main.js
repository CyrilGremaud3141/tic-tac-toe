
const difficultySlider = document.getElementById("difficulty_slider")
const bot = document.getElementById("bot")
const reset = document.getElementById("reset")
const resetWins = document.getElementById("resetWins")

const winsX = document.getElementById("winsX")
const winsO = document.getElementById("winsO")


const tl = document.getElementById("tl")
const tm = document.getElementById("tm")
const tr = document.getElementById("tr") 
const ml = document.getElementById("ml") 
const mm = document.getElementById("mm") 
const mr = document.getElementById("mr") 
const bl = document.getElementById("bl") 
const bm = document.getElementById("bm") 
const br = document.getElementById("br")

tilesList =[tl, tm, tr, ml, mm, mr, bl, bm, br]


board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
finished = false
activePlayer = 1    //1 = X; 2 = O
sign = ""


function reset_board()
{
    for (let tileIdx = 0; tileIdx < tilesList.length; tileIdx++)
    {
        tilesList[tileIdx].style.background = "grey"
    }
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    tilesList.forEach(element => element.textContent = "")
}

function resetScores()
{
    winsO.textContent = 0
    winsX.textContent = 0
}

function play_move(move) 
{
    if (finished || !board.some(li => li.includes(0)))
    {
        reset_board()
        finished = false
        if (bot.checked && player == 2)
        {
            play_bot()
        }
    }
    else
    {
        if (bot.checked)
        {
            if (board[(move - (move % 3)) / 3][move % 3] == 0)
            {
                tilesList[move].textContent = "X"
                board[(move - (move % 3)) / 3][move % 3] = 1
                player = 2
                windata = isWin(board)
                winner = windata[0]
                winnerLine = windata[1]
                if (winner != null)
                {
                    win(winner, winnerLine)
                    return 
                }
                if (!board.some(li => li.includes(0)))
                {
                    return
                }


                play_bot()
                player = 1
            }
        }
        else
        {
            if (board[(move - (move % 3)) / 3][move % 3] == 0)
            {
                if (activePlayer == 1)
                {
                    sign = "O"
                    activePlayer = 2
                }
                else
                {
                    sign = "X"
                    activePlayer = 1
                }

                tilesList[move].textContent = sign
                board[(move - (move % 3)) / 3][move % 3] = activePlayer
                windata = isWin(board)
                winner = windata[0]
                winnerLine = windata[1]
                if (winner != null)
                {
                    win(winner, winnerLine)
                }
            }
        }
    }
}

function isWin(state)
{
    for (let player = 1; player <= 2; player++)
    {
        for (let i = 0; i < state.length; i++)
        {
            if (state[i][0] == state[i][1] && state[i][1] == state[i][2] && state[i][2] == player)
            {
                return [player, [i,0,i,1,i,2]]
            }
            if (state[0][i] == state[1][i] && state[1][i] == state[2][i] && state[2][i] == player)
            {
                return [player, [0,i,1,i,2,i]]
            }
        }
        if (state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[2][2] == player)
        {
            return [player, [0,0,1,1,2,2]]
        }
        if (state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[2][0] == player)
        {
            return [player, [0,2,1,1,2,0]]
        }
    }
    return [null, null]
}

function win(winner, winnerLine)
{
    if (winner == 1)
    {
        winsX.textContent = parseInt(winsX.textContent, 10) + 1
        tilesList[winnerLine[0] * 3 + winnerLine[1]].style.background = "red"
        tilesList[winnerLine[2] * 3 + winnerLine[3]].style.background = "red"
        tilesList[winnerLine[4] * 3 + winnerLine[5]].style.background = "red"
    }
    else
    {
        winsO.textContent = parseInt(winsO.textContent, 10) + 1
        tilesList[winnerLine[0] * 3 + winnerLine[1]].style.background = "red"
        tilesList[winnerLine[2] * 3 + winnerLine[3]].style.background = "red"
        tilesList[winnerLine[4] * 3 + winnerLine[5]].style.background = "red"
    }
    finished = true
}

function play_bot()
{
    movedata = minimax(2, board, difficulty_slider.value)[1]
    tilesList[movedata[0] * 3 + movedata[1]].textContent = "O"
    board[movedata[0]][movedata[1]] = 2
    
    windata = isWin(board)
    winner = windata[0]
    winnerLine = windata[1]
    if (winner != null)
    {
        win(winner, winnerLine)
    }
}

function randomMove(state)
{
    moves = []
    for (let i = 0; i < state.length; i++)
    {
        for (let j = 0; j < state[i].length; j++)
        {
            if (state[i][j] == 0)
            {
                moves.push([i,j])
            }
        }
    }
    return moves[Math.floor(Math.random()*moves.length)]
}

function minimax(player, state, depth)
{
    winner = isWin(state)[0]
    if (winner != null || depth == 0 || !state.some(li => li.includes(0)))
    {
        if (winner == 1)
        {
            return [-1]
        }
        else if (winner == 2)
        {
            return [1]
        }
        else
        {
            return [0]
        }
    }
    else
    {
        let value = 0
        if (player == 1)
        {
            value = 10000
        }
        else
        {
            value = -10000
        }


        let value_move = []
        for (let i = 0; i < state.length; i++)
        {
            for (let j = 0; j < state[i].length; j++)
            {
                if (state[i][j] == 0)
                {
                    let newState = JSON.parse(JSON.stringify(state));   // deepcopy array
                    newState[i][j] = player
                    if (player == 1)
                    {
                        score = minimax(2, newState, depth-1)[0]
                        if (score < value)
                        {
                            value = score
                            value_move = [i,j]
                        }
                    }
                    else
                    {
                        score = minimax(1, newState, depth-1)[0]
                        if (score > value)
                        {
                            value = score
                            value_move = [i,j]
                        }
                    }
                }
            }
        }
        return [value, value_move]
    }
}

window.onload = function()
{  
    
    reset.addEventListener("click", reset_board)
    resetWins.addEventListener("click", resetScores)
    tl.addEventListener("click", () => play_move(0))
    tm.addEventListener("click", () => play_move(1))
    tr.addEventListener("click", () => play_move(2))
    ml.addEventListener("click", () => play_move(3))
    mm.addEventListener("click", () => play_move(4))
    mr.addEventListener("click", () => play_move(5))
    bl.addEventListener("click", () => play_move(6))
    bm.addEventListener("click", () => play_move(7))
    br.addEventListener("click", () => play_move(8))

}

