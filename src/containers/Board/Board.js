import React from 'react';
import * as actionCreators from '../../store/actions/actions'; 
import Cell from '../../components/Cell';
import { connect } from 'react-redux';

const board = (props) => {
    let table =  
        <table>
            {new Array(5).fill(0).map((item, index) => <tr key={index}>{new Array(5).fill(0).map((item, index) => <Cell key={index} clickable={false}></Cell>)}</tr>)}
        </table>
    if(props.isPlaying) {
        table = 
        <table>
            {props.board.map((item, index1) => <tr key={index1}>{item.map((item, index2) => <Cell key={index2} boardID={props.boardID} onClick={props.clickGrid} clickable={props.boardState[index1][index2]} whoseTurn={props.whoseTurn}>{item}</Cell>)}</tr>)}
        </table>    
    }
    return (
        <div> 
            {table}
        </div>
    );
}

export default board;

