import React, { useEffect, useState } from "react";
import OnScreenKeyboard from "./Keyboard";
import axios from 'axios';
import Gameover from "./GameOver";
import Correct from "./Correct";

const currentWord = [];
const attemptedWords = [];
const targetWord = [];
const wrongLetters = [];

function WordBoard(props) {
    let attempts = [...Array(props.tries).keys()];
    let word_length = props.word_length;

    if (targetWord.length === 0) {
        targetWord.push(...Array.from(props.correct_word));
    }


    useEffect(() => {
        document.addEventListener('keyup', (e) => {
            handleKeyPress(e);
        })
    }, []);

    const [hidePing, setHidePing] = useState('hidden');
    const [hideGameOver, setHideGameOver] = useState('hidden');
    const [hideComplete, setHideComplete] = useState('hidden');

    //insert letters into grid 
    function insertLetter(key) {
        const colNumber = currentWord.length - 1;
        const parent = document.getElementsByClassName(`row ${attemptedWords.length}`);
        const element = parent[0].children[colNumber].children[0].children[0];
        element.innerHTML = key;
    }
    //remove letters from grid
    function removeLetter() {
        const colNumber = currentWord.length;
        const parent = document.getElementsByClassName(`row ${attemptedWords.length}`);
        const element = parent[0].children[colNumber].children[0].children[0];
        element.innerHTML = "";
    }

    function CorrectLetterAndPos(position) {
        const colNumber = position;
        const parent = document.getElementsByClassName(`row ${attemptedWords.length}`);
        const element = parent[0].children[colNumber].children[0];
        element.style.backgroundColor = '#53BF9D';
    }

    function CorrectLetterWrongPos(position) {
        const colNumber = position;
        const parent = document.getElementsByClassName(`row ${attemptedWords.length}`);
        const element = parent[0].children[colNumber].children[0];
        element.style.backgroundColor = '#FFC54D';
    }

    function WrongLetter(position) {
        const colNumber = position;
        const parent = document.getElementsByClassName(`row ${attemptedWords.length}`);
        const element = parent[0].children[colNumber].children[0];
        element.style.backgroundColor = 'grey';
    }

    // grey out keyboard letters upon wrong choice
    function GreyOutKeyboard(letters) {
        for (let i = 0; i < letters.length; i++) {
            const element = document.getElementById(`${letters[i]}`)
            element.style.backgroundColor = 'grey';
        }
    }

    //check word
    async function checkWord() {
        const wordToCheck = currentWord.join("");
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`
        let letterCounter = {};

        for (const i of targetWord) {
            if (letterCounter[i] == null) {
                letterCounter[i] = 1;
            }
            else {
                letterCounter[i] += 1;
            }
        }
        try {
            // if word exists
            let pos = [];
            const response = await axios.get(url);
            if (response.status === 200) {
                for (let i = 0; i < currentWord.length; i++) {
                    // if correct letter in correct position
                    if (currentWord[i] === targetWord[i]) {
                        CorrectLetterAndPos(i)
                        letterCounter[currentWord[i]] -= 1;
                    }
                    else {
                        pos.push(i)
                    }
                }
                // if letter exists but not in correct position
                for (const i of pos) {
                    if (currentWord[i] !== targetWord[i] &&
                        targetWord.some(letter => letter === currentWord[i]) &&
                        letterCounter[currentWord[i]] >= 1) {
                        CorrectLetterWrongPos(i)
                        letterCounter[currentWord[i]] -= 1;
                    }
                    // if letter do not exists at all
                    else {
                        WrongLetter(i)
                        if (!targetWord.some(letter => letter === currentWord[i])) {
                            while (!wrongLetters.includes(currentWord[i])) {
                                wrongLetters.push(currentWord[i])
                            }
                        }
                        letterCounter[currentWord[i]] -= 1;
                    }
                }

                // if gotten correct word
                if (currentWord.toString() === targetWord.toString()) {
                    console.log("congratulations you have gotten the correct word!")
                    setHideComplete("")
                }

                //store attempted word and move on to the next row
                attemptedWords.push(currentWord)

                // ```TODO: GREY OUT KEYBOARD FOR ATTEMPTED WRONG LETTERS```
                while (currentWord.length > 0) {
                    currentWord.pop()
                };

                // blank out the keyboards
                GreyOutKeyboard(wrongLetters);

                // reach maximum number of tries, gameover, choose to restart game
                if (attemptedWords.length === attempts.length) {
                    setHideGameOver("")
                }

            }
        }
        catch (err) {
            //if word does not exist
            setHidePing("")
            setTimeout(() => { setHidePing('hidden') }, 1500);

        }
    }
    //keyboard input 
    function handleKeyPress(e) {
        const { code, key, keyCode } = e;
        if (code === "Backspace") {
            // to clear entered letters
            currentWord.pop();
            removeLetter();

        }
        else if (code === "Enter" && currentWord.length === word_length) {
            // to submit word for submission
            checkWord()
        }
        else {
            if (currentWord.length < word_length && (keyCode >= 65 && keyCode <= 90)) {
                currentWord.push(key);
                insertLetter(key);
            }
            else if (currentWord.length === word_length) {
                console.log("max length reached");
            }
        }
    };

    //on screen keyboard input
    function handleClick(key) {
        console.log(key)
        if (key === "Del") {
            // to clear entered letters
            currentWord.pop();
            removeLetter();
        }
        else if (key === "Enter" && currentWord.length === word_length) {
            // to submit word for submission
            checkWord()
        }
        else {
            if (currentWord.length < word_length && (key !== "Enter" && key !== "Del")) {
                currentWord.push(key);
                insertLetter(key);
            }
            else if (currentWord.length === word_length) {
                console.log("max length reached");
            }
        }
    }

    function RestartGame() {
        setHideGameOver("hidden")
        window.location.reload(false);
    }

    return (
        <div className="wordboard">
            <div style={{ visibility: `${hidePing}` }} className="alert alert-warning fade show text-center" role="alert">
                <strong>Word does not exist!</strong>
            </div>
            <Gameover restart={RestartGame} targetWord={targetWord} show={hideGameOver} />
            <Correct restart={RestartGame} targetWord={targetWord} show={hideComplete} />
            <div className="container">
                {attempts.map((attempt, index) => {
                    return (
                        <div className={`row ${attempt}`} key={index}>
                            {targetWord.map((letter, index2) => {
                                return (
                                    <div className="col" key={index2}>
                                        <div className="card">
                                            <p className="letter"></p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <OnScreenKeyboard click={handleClick} wrongLetters={wrongLetters} />
        </div>

    )
}
export default WordBoard;