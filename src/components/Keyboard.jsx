import React from "react";

function OnScreenKeyboard(props) {

    function handleClick(e) {
        var key = e.target.id;
        props.click(key);
    }
    return (
        <div id="keyboard-cont">
            <div className="first-row">
                <button className="keyboard-button" id="q" onClick={(e) => { handleClick(e) }} >q</button>
                <button className="keyboard-button" id="w" onClick={(e) => { handleClick(e) }}>w</button>
                <button className="keyboard-button" id="e" onClick={(e) => { handleClick(e) }}>e</button>
                <button className="keyboard-button" id="r" onClick={(e) => { handleClick(e) }}>r</button>
                <button className="keyboard-button" id="t" onClick={(e) => { handleClick(e) }}>t</button>
                <button className="keyboard-button" id="y" onClick={(e) => { handleClick(e) }}>y</button>
                <button className="keyboard-button" id="u" onClick={(e) => { handleClick(e) }}>u</button>
                <button className="keyboard-button" id="i" onClick={(e) => { handleClick(e) }}>i</button>
                <button className="keyboard-button" id="o" onClick={(e) => { handleClick(e) }}>o</button>
                <button className="keyboard-button" id="p" onClick={(e) => { handleClick(e) }}>p</button>
            </div>
            <div className="second-row">
                <button className="keyboard-button" id="a" onClick={(e) => { handleClick(e) }}>a</button>
                <button className="keyboard-button" id="s" onClick={(e) => { handleClick(e) }}>s</button>
                <button className="keyboard-button" id="d" onClick={(e) => { handleClick(e) }}>d</button>
                <button className="keyboard-button" id="f" onClick={(e) => { handleClick(e) }}>f</button>
                <button className="keyboard-button" id="g" onClick={(e) => { handleClick(e) }}>g</button>
                <button className="keyboard-button" id="h" onClick={(e) => { handleClick(e) }}>h</button>
                <button className="keyboard-button" id="j" onClick={(e) => { handleClick(e) }}>j</button>
                <button className="keyboard-button" id="k" onClick={(e) => { handleClick(e) }}>k</button>
                <button className="keyboard-button" id="l" onClick={(e) => { handleClick(e) }}>l</button>
            </div>
            <div className="third-row">
                <button className="keyboard-button" id="Del" onClick={(e) => { handleClick(e) }}>Del</button>
                <button className="keyboard-button" id="z" onClick={(e) => { handleClick(e) }}>z</button>
                <button className="keyboard-button" id="x" onClick={(e) => { handleClick(e) }}>x</button>
                <button className="keyboard-button" id="c" onClick={(e) => { handleClick(e) }}>c</button>
                <button className="keyboard-button" id="v" onClick={(e) => { handleClick(e) }}>v</button>
                <button className="keyboard-button" id="b" onClick={(e) => { handleClick(e) }}>b</button>
                <button className="keyboard-button" id="n" onClick={(e) => { handleClick(e) }}>n</button>
                <button className="keyboard-button" id="m" onClick={(e) => { handleClick(e) }}>m</button>
                <button className="keyboard-button" id="Enter" onClick={(e) => { handleClick(e) }}>Enter</button>
            </div>
        </div>
    )
}

export default OnScreenKeyboard;