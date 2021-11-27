
const slider = document.getElementById("difficulty_slider")
const bot = document.getElementById("bot")
const reset = document.getElementById("reset")



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
activePlayer = 1
sign = ""
function reset_board()
{
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    tilesList.forEach(element => element.textContent = "")
}

function play_move(move) 
{
    if (bot.checked)
    {
        console.log("test")
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
        }
    }
}

function is_win(state)
{
    for (var player = 1; i <= 2; i++)
    {
        for (var i = 0; i < state.length; i++)
        {
            if (state[i][0] == state[i][1] && state[i][1] == state[i][2] && state[i][2] == player)
            {
                return player
            }
            if (state[0][i] == state[1][i] && state[1][i] == state[2][i] && state[2][i] == player)
            {
                return player
            }
        }
        if (state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[2][2] == player)
        {
            return player
        }
        if (state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[2][0] == player)
        {
            return player
        }
    }
    return none
}


window.onload = function()
{  
    
    reset.addEventListener("click", reset_board)
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

