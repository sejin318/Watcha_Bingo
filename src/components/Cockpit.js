import React from 'react';

const cockpit = (props) => {
    console.log('bingo is', props.bingoList)
    return (
        <div>
            <h1>5X5 빙고 게임</h1>
                <h3>현재 {props.whoseTurn}P의 턴입니다.</h3>
            <h2>완성 줄 목록:</h2>
            <div className="row">
                <div className="box">
                    <h4>1P가 완성한 빙고들</h4>
                    <ul>{props.bingoList[0].map((item) => <li>{item.map((number) => number + ', ')}</li>)}</ul>
                </div>
                <div className="box">
                    <h4>2P가 완성한 빙고들</h4>
                    <ul>{props.bingoList[1].map((item) => <li>{item.map((number) => number + ', ')}</li>)}</ul>
                </div>
            </div>
            <button onClick={props.startGame }><h3>{props.isPlaying === false ? '게임 시작' : '게임 재시작'}</h3></button>
        </div>)
}

export default cockpit;