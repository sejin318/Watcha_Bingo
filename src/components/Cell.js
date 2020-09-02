import React from 'react';

const cell = (props) => {
    const onClick = props.clickable ? () => {
        if(props.whoseTurn == props.boardID) {
            props.onClick(props.boardID, props.children)
        } else {
            alert('잘못된 차례입니다!')
        }
    } : null; 
    const color = props.clickable ? 'light' : 'dark'; 
    return (
        <td className={color} onClick={onClick} >
            {props.children}
        </td>
    );
}

export default cell;