import { generateRandomBoard, generateBoardState, findBingo } from '../../utility';
import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    whoseTurn: 1, 
    whoWon: -1, // -1 is undetermined, 0 is tie
    p1Board: [], 
    p2Board: [], 
    p1BoardState: [],
    p2BoardState: [], 
    isPlaying: false, 
    p1Bingo: [],
    p2Bingo: [],
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.START_GAME:
            return {
                ...state, 
                whoseTurn: 1, 
                whoWon: -1, 
                isPlaying: true, 
                p1Board: generateRandomBoard(), 
                p2Board: generateRandomBoard(),
                p1BoardState: generateBoardState(), 
                p2BoardState: generateBoardState(), 
                isPlaying: true, 
            };
        case actionTypes.CLICK_GRID:
            if(state.whoseTurn != action.payload.boardID){
                console.log("it's not your turn!")
                return state;
            }
            if(action.payload.boardID == 1 && !state.p1BoardState[state.p1Board.indexOf(action.payload.number)] || 
            action.payload.boardID == 2 && !state.p2BoardState[state.p2Board.indexOf(action.payload.number)]){
                console.log("it is already marked!")
                return state; 
            }
            const p1BoardStateUpdated = [...state.p1BoardState]
            p1BoardStateUpdated[state.p1Board.indexOf(action.payload.number)] = false
            const p2BoardStateUpdated = [...state.p2BoardState]
            p2BoardStateUpdated[state.p2Board.indexOf(action.payload.number)] = false
            const p1Bingo = findBingo(p1BoardStateUpdated, state.p1Bingo)
            const p2Bingo = findBingo(p2BoardStateUpdated, state.p2Bingo)  
            return {
                ...state, 
                whoseTurn: state.whoseTurn == 1 ? 2 : 1, 
                p1BoardState: p1BoardStateUpdated, 
                p2BoardState: p2BoardStateUpdated, 
                p1Bingo: findBingo(p1BoardStateUpdated, state.p1Bingo), 
                p2Bingo: findBingo(p2BoardStateUpdated, state.p2Bingo), 
            }
        case actionTypes.FINISH_GAME: 
            if(state.p1Bingo.length < 5){
                return {
                    ...state, 
                    whoWon: 2,
                }
            } else if(state.p2Bingo.length < 5){
                return {
                    ...state, 
                    whoWon: 1,
                }
            } else {
                return {
                    ...state, 
                    whoWon: 0, 
                }
            }
        case actionTypes.RESET_GAME:
            return {
                ...initialState
            }
    }
    return state;
};

export default reducer;