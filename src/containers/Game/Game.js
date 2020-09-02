import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../Board/Board'; 
import Cockpit from '../../components/Cockpit'; 
import * as actionCreators from '../../store/actions/actions'; 
import { convertTo2D, convertToBingo } from '../../utility'; 

class Game extends Component {
    constructor(props){
        super(props); 
    }

    render () {
        if(this.props.whoWon != -1){
            if(this.props.whoWon == 0){
                alert('무승부입니다!')
            } else {
                alert(this.props.whoWon+'P가 빙고를 완성했습니다!')
            }
            this.props.resetGame()
        } else if(this.props.p1Bingo.length >= 5 || this.props.p2Bingo.length >= 5){
            this.props.finishGame()
        }
        return (
            <div className="col">
                <Cockpit whoseTurn={this.props.whoseTurn} bingoList={[convertToBingo(this.props.p1Board, this.props.p1Bingo), convertToBingo(this.props.p2Board, this.props.p2Bingo)]}isPlaying={this.props.isPlaying} startGame={this.props.onStartGame} />
                <div className="row">
                    <Board boardID={1} isPlaying={this.props.isPlaying} board={convertTo2D(this.props.p1Board)} boardState={convertTo2D(this.props.p1BoardState)} clickGrid={this.props.clickGrid} whoseTurn={this.props.whoseTurn}/>
                    <Board boardID={2} isPlaying={this.props.isPlaying} board={convertTo2D(this.props.p2Board)} boardState={convertTo2D(this.props.p2BoardState)} clickGrid={this.props.clickGrid} whoseTurn={this.props.whoseTurn} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isPlaying: state.isPlaying, 
        whoWon: state.whoWon, 
        p1Board: state.p1Board, 
        p2Board: state.p2Board,
        p1BoardState: state.p1BoardState, 
        p2BoardState: state.p2BoardState, 
        p1Bingo: state.p1Bingo, 
        p2Bingo: state.p2Bingo, 
        whoseTurn: state.whoseTurn, 
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onStartGame: () => dispatch(actionCreators.start()), 
        clickGrid: (boardID, number) => dispatch(actionCreators.clickGrid(boardID, number)), 
        finishGame: () => dispatch(actionCreators.finishGame()), 
        resetGame: () => dispatch(actionCreators.resetGame()), 
    }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);