import * as actionTypes from './actionTypes';

export const start = () => {
    return {
        type: actionTypes.START_GAME
    };
};

export const clickGrid = (boardID, number) => {
    return {
        type: actionTypes.CLICK_GRID, 
        payload: {
            boardID: boardID, 
            number: number, 
        }, 
    };
};


export const finishGame = (winnerID) => {
    return {
        type: actionTypes.FINISH_GAME, 
    };
};

export const resetGame = () => {
    return {
        type: actionTypes.RESET_GAME, 
    }
}

