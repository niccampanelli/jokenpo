import React, { useState } from 'react';
import { FiLinkedin, FiGithub, FiStar, FiShare2 } from 'react-icons/fi';
import api from '../../services/api';
import {ReactComponent as Escolhendo} from '../../assets/rockHand.svg';
import {ReactComponent as Pedra} from '../../assets/rockHand.svg';
import {ReactComponent as Tesoura} from '../../assets/scissorsHand.svg';
import {ReactComponent as Papel} from '../../assets/paperHand.svg';
import winEffect from '../../assets/winEffect.gif';

export default function Home(){

    if(localStorage.getItem("highScore") === null){
        localStorage.setItem("highScore", "0");
    }

    const [gameStatus, setGameStatus] = useState("");
    const [aiPlayed, setAiGame] = useState(<Pedra className="hand" transform="scale(-1, 1)"/>);
    const [playerPlayed, setPlayerGame] = useState(<Pedra className="hand"/>);
    const [scoreBoard, setScoreBoard] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [displayPlayerName, setDisplayPlayerName] = useState("");
    const [canPlay, setCanPlay] = useState(true);

    function makeShare(){
        navigator.share({title: `Minha pontuação no Jokenpo Online`, text: `Fiz ${localStorage.getItem("lastScore")} pontos no Jokenpo Online ✌😉\nMinha melhor pontuação foi ${localStorage.getItem("highScore")}! Consegue fazer melhor? 😎`, url: "localhost:3000"})
    }

    async function makeTheGame(entry){

        setPlayerGame(<Escolhendo id="playerEscolhendo" className="hand"/>);
        setAiGame(<Escolhendo id="oponenteEscolhendo" className="hand"/>);
        setGameStatus("");
        setDisplayPlayerName("")
        setCanPlay(false);

        setTimeout(async function(){

        try{
            const result = await api.post('/game', {entry})
                setGameStatus(result.data.resultado);
                if(playerName){
                setDisplayPlayerName(playerName);
                }
                else{
                    setDisplayPlayerName("Jogador");
                }
            switch (result.data.resultado) {
                case "perdeu":

                    if(scoreBoard > parseInt(localStorage.getItem("highScore"))){
                        localStorage.setItem("highScore", scoreBoard);
                    }

                    setScoreBoard(0);
                    break;
                case "ganhou":
                    setScoreBoard(scoreBoard+2);
                    break;
                case "empatou":
                    setScoreBoard(scoreBoard+1);
                    break;
                    
                default:
                    break;
            }

            switch (entry) {
                case 0:
                    setPlayerGame(<Pedra className="hand"/>)
                    break;
                case 1:
                    setPlayerGame(<Papel className="hand"/>)
                    break;
                case 2:
                    setPlayerGame(<Tesoura className="hand"/>)
                    break;
                default:
                    setPlayerGame(<Escolhendo id="playerEscolhendo" className="hand"/>)
                    break;
            }
            switch (result.data.aiPlayed) {
                case 0:
                    setAiGame(<Pedra className="hand" transform="scale(-1, 1)"/>)
                    break;
                case 1:
                    setAiGame(<Papel className="hand" transform="scale(-1, 1)"/>)
                    break;
                case 2:
                    setAiGame(<Tesoura className="hand" transform="scale(-1, 1)"/>)
                    break;
                default:
                    setAiGame(<Escolhendo id="oponenteEscolhendo" className="hand"/>)
                    break;
            }
        }
        catch(err){
            console.log(err)
        }
        
        setTimeout(function(){ setCanPlay(true); }, 500) 

    }, 1400)}

    localStorage.setItem("lastScore", scoreBoard);
    if(localStorage.getItem("lastScore") > localStorage.getItem("highScore")){
        localStorage.setItem("highScore", scoreBoard);
    }

    return (
        <div className="page">
            <body>
                <button onClick={makeShare} className="shareButton"><FiShare2/></button>
                <h1 className="highScore"><h1 className="highScoreText">Melhor Pontuação</h1>{localStorage.getItem("highScore")}</h1>
                <h1 className="scoreBoard"><h1 className="highScoreText">Pontos</h1>{scoreBoard}</h1>
                <div className="gameScreen">
                    <input type="text" onChange={e => setPlayerName(e.target.value)} className="playerName" placeholder="Jogador" maxLength="20"/>
                        <div className="playerNameAfter"/>
                    <h1 className="aiName">Oponente</h1>
                    <h1 className="playerChoice">
                        { gameStatus === "ganhou" && <img className="winEffect" src={winEffect}/>}
                        {playerPlayed}
                    </h1>
                    <h1 className="opponentChoice">
                        { gameStatus === "perdeu" && <img id="opponentWin" className="winEffect" src={winEffect}/>}
                        {aiPlayed}
                        </h1>
                    <h1 className="gameStatus">{displayPlayerName + " " + gameStatus}</h1>
                </div>
                <div className="chooseHeadlineDiv">
                    <h1 className="chooseHeadline">Escolha a sua jogada!</h1>
                </div>
                <div className="betOptions">
                    <button disabled={canPlay ? false : true} onClick={ () => makeTheGame(0)} className="option"><Pedra className="pedraOption"/></button>
                    <button disabled={canPlay ? false : true} onClick={ () => makeTheGame(1)} className="option"><Papel className="papelOption"/></button>
                    <button disabled={canPlay ? false : true} onClick={ () => makeTheGame(2)} className="option"><Tesoura className="tesouraOption"/></button>
                </div>
                <h1 className="credit">Feito por Nicholas Campanelli. <a className="linkToMedia" href="https://github.com/niccampanelli"><FiGithub fill="black" size="2.5vh"/> Siga</a> | <a className="linkToMedia" href="https://github.com/niccampanelli/jokenpo"><FiStar fill="black" size="2.5vh"/>Star</a> | <a className="linkToMedia" href="https://www.linkedin.com/in/campanellinicc"><FiLinkedin fill="black" size="2.5vh"/> Linkedin</a></h1>
            </body>
        </div>
    );
}