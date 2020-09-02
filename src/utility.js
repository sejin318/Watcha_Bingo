export const generateRandomBoard = () => {
    const board = []; 
    while(board.length < 25){
        const rand = Math.floor(Math.random() * 25) + 1;
        if(board.indexOf(rand) === -1){
            board.push(rand); 
        }
    }
    return board; 
};

export const generateBoardState = () => {
    return new Array(25).fill(true); 
}

export const convertTo2D = (arr) => {
    const newArr = [];
    let index = 0; 
    while(index < arr.length){
        newArr.push(arr.slice(index, index + 5));
        index += 5;
    }
    return newArr;
}

const uniqueBingo = (bingoList, bingoCoordinate) => {
    for(let j = 0; j < bingoList.length; j++){
        if(bingoCoordinate[0] == bingoList[j][0] && bingoCoordinate[1] == bingoList[j][1] && bingoCoordinate[2] == bingoList[j][2] && bingoCoordinate[3] == bingoList[j][3]){
            return false
        }
    }
    return true
}

export const findBingo = (boardState, bingoList) => {
    const temp = convertTo2D(boardState)
    const newBingoList = [...bingoList]; 
    // check horizontal bingo and add it to the array
    for(let i = 0; i < 5; i++){
        let bingo = true
        for(let j = 0; j < 5; j++){
            if(temp[i][j]){
                bingo = false; 
                break; 
            }
        }
        if(bingo && uniqueBingo(newBingoList, [i, 0, i, 4])){
            newBingoList.push([i, 0, i, 4])
        }
    }
    // check vertical bingo and add it to the array
    for(let i = 0; i < 5; i++){
        let bingo = true
        for(let j = 0; j < 5; j++){
            if(temp[j][i]){
                bingo = false; 
                break; 
            }
        }
        if(bingo && uniqueBingo(newBingoList, [0, i, 4, i])){
            newBingoList.push([0, i, 4, i])
        }
    }
    // check diagonal bingo and add it to the array
    let bingo1 = true
    let bingo2 = true
    for(let i = 0; i < 5; i++){
        if(temp[i][i]){
            bingo1 = false
        }
        if(temp[i][4-i]){
            bingo2 = false
        }
    }
    if(bingo1 && uniqueBingo(newBingoList, [0, 0, 4, 4])){
        newBingoList.push([0, 0, 4, 4])
    }
    if(bingo2 && uniqueBingo(newBingoList, [0, 4, 4, 0])){
        newBingoList.push([0, 4, 4, 0])
    }
    return newBingoList
}

export const convertToBingo = (board, bingoList) => {
    const convertedBingoList = []
    const newBoard = convertTo2D(board)
    for(let i = 0; i < bingoList.length; i++){
        const temp = bingoList[i]
        const bingo = []
        for(let j = 0; j <= 1; j+=1/4){
            bingo.push(newBoard[lerp(temp[0], temp[2], j)][lerp(temp[1], temp[3], j)])
        }
        convertedBingoList.push(bingo)
    }
    return convertedBingoList
}

const lerp = (v1, v2, amt) => {
    return Math.round(v2 * amt + v1 * (1 - amt))
}