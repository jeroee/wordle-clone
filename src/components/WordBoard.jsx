import React, { useEffect, useState } from "react";
import OnScreenKeyboard from "./Keyboard";
import axios from 'axios';
import Gameover from "./GameOver";
import Correct from "./Correct";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";

const WordBoard = ({ correct_word, word_length, tries }) => {

    // const [currentWord, setCurrentWord] = useState([]);
    const currentWord = [];
    const attemptedWords = [];
    const wrongLetters = [];
    const targetWord = [...Array.from(correct_word)];
    const attempts = [...Array(tries).keys()];

    // console.log("Current State:");
    // console.log("Current Word: ", currentWord);
    // console.log("Attempted Words: ", attemptedWords);
    // console.log("Wrong Letters: ", wrongLetters);
    // console.log("Target Word: ", targetWord);
    // console.log("Attempts: ", attempts);

    const alphabetToCode = {
        A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71,
        H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78,
        O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85,
        V: 86, W: 87, X: 88, Y: 89, Z: 90
    };

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
        const parent = document.getElementById(`row-${attemptedWords.length}`)
        const element = parent.children[colNumber].children[0].children[0];
        element.innerHTML = key;
    }
    //remove letters from grid
    function removeLetter() {
        const colNumber = currentWord.length;
        const parent = document.getElementById(`row-${attemptedWords.length}`)
        const element = parent.children[colNumber].children[0].children[0];
        element.innerHTML = "";
    }

    function CorrectLetterAndPos(position) {
        const colNumber = position;
        const parent = document.getElementById(`row-${attemptedWords.length}`)
        const element = parent.children[colNumber].children[0];
        element.style.backgroundColor = '#53BF9D';
    }

    function CorrectLetterWrongPos(position) {
        const colNumber = position;
        const parent = document.getElementById(`row-${attemptedWords.length}`)
        const element = parent.children[colNumber].children[0];
        element.style.backgroundColor = '#FFC54D';
    }

    function WrongLetter(position) {
        const colNumber = position;
        const parent = document.getElementById(`row-${attemptedWords.length}`)
        const element = parent.children[colNumber].children[0];
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
    async function checkWord(currentWord) {
        console.log(currentWord)
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
            if (err.response && err.response.status === 404) {
                // Word does not exist in dictionary
                setHidePing("")
                setTimeout(() => { setHidePing('hidden') }, 1500);
            } else {
                // Handle other errors
                console.error("An unexpected error occurred:", err.message);
            }
        }
    }
    //keyboard input 
    function handleKeyPress(e) {
        console.log("key pressed:", e)
        const { code, key, keyCode } = e;
        if (code === "Backspace") {
            console.log("current word: ", currentWord)
            // to clear entered letters

            currentWord.pop()
            // setCurrentWord(prev => prev.slice(0, -1));
            removeLetter();
        }
        else if (code === "Enter" && currentWord.length === word_length) {
            // to submit word for submission
            checkWord(currentWord)
        }
        else {
            if (currentWord.length < word_length && (keyCode >= 65 && keyCode <= 90)) {
                console.log("current word: ", currentWord)
                currentWord.push(key)
                // setCurrentWord(prev => [...prev, key]);
                insertLetter(key);
            }
            else if (currentWord.length === word_length) {
                console.log("max length reached");
            }
        }
    };

    function simulateKeyUpEvent(key) {
        const event = new KeyboardEvent("keyup", {
            key: key,
            code: key,
            keyCode: alphabetToCode[key.toUpperCase()],
            bubbles: true,
        });
        console.log(`Simulated keyup event from click for ${key}`);
        document.dispatchEvent(event);
    }

    //on screen keyboard input
    function handleClick(key) {
        console.log(key)
        if (key === "Del") {
            // to clear entered letters
            simulateKeyUpEvent("Backspace")
        }
        else if (key === "Enter" && currentWord.length === word_length) {
            // to submit word for submis
            simulateKeyUpEvent("Enter")
        }
        else {
            if (currentWord.length < word_length && (key !== "Enter" && key !== "Del")) {
                simulateKeyUpEvent(key)
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
                        <div className={`row ${attempt}`} id={`row-${index}`} key={index}>
                            {targetWord.map((_, index2) => {
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