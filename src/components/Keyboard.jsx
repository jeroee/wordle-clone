import React from "react";
import Button from 'react-bootstrap/Button';

function OnScreenKeyboard(props) {

    function handleClick(e) {
        var key = e.target.id;
        props.click(key);
    }
    return (
        <div id="keyboard-cont">
            <div className="first-row">
                <Button className="keyboard-button" id="q" onClick={(e) => { handleClick(e) }} >q</Button>
                <Button className="keyboard-button" id="w" onClick={(e) => { handleClick(e) }}>w</Button>
                <Button className="keyboard-button" id="e" onClick={(e) => { handleClick(e) }}>e</Button>
                <Button className="keyboard-button" id="r" onClick={(e) => { handleClick(e) }}>r</Button>
                <Button className="keyboard-button" id="t" onClick={(e) => { handleClick(e) }}>t</Button>
                <Button className="keyboard-button" id="y" onClick={(e) => { handleClick(e) }}>y</Button>
                <Button className="keyboard-button" id="u" onClick={(e) => { handleClick(e) }}>u</Button>
                <Button className="keyboard-button" id="i" onClick={(e) => { handleClick(e) }}>i</Button>
                <Button className="keyboard-button" id="o" onClick={(e) => { handleClick(e) }}>o</Button>
                <Button className="keyboard-button" id="p" onClick={(e) => { handleClick(e) }}>p</Button>
            </div>
            <div className="second-row">
                <Button className="keyboard-button" id="a" onClick={(e) => { handleClick(e) }}>a</Button>
                <Button className="keyboard-button" id="s" onClick={(e) => { handleClick(e) }}>s</Button>
                <Button className="keyboard-button" id="d" onClick={(e) => { handleClick(e) }}>d</Button>
                <Button className="keyboard-button" id="f" onClick={(e) => { handleClick(e) }}>f</Button>
                <Button className="keyboard-button" id="g" onClick={(e) => { handleClick(e) }}>g</Button>
                <Button className="keyboard-button" id="h" onClick={(e) => { handleClick(e) }}>h</Button>
                <Button className="keyboard-button" id="j" onClick={(e) => { handleClick(e) }}>j</Button>
                <Button className="keyboard-button" id="k" onClick={(e) => { handleClick(e) }}>k</Button>
                <Button className="keyboard-button" id="l" onClick={(e) => { handleClick(e) }}>l</Button>
            </div>
            <div className="third-row">
                <Button className="keyboard-button" id="Del" onClick={(e) => { handleClick(e) }}>Del</Button>
                <Button className="keyboard-button" id="z" onClick={(e) => { handleClick(e) }}>z</Button>
                <Button className="keyboard-button" id="x" onClick={(e) => { handleClick(e) }}>x</Button>
                <Button className="keyboard-button" id="c" onClick={(e) => { handleClick(e) }}>c</Button>
                <Button className="keyboard-button" id="v" onClick={(e) => { handleClick(e) }}>v</Button>
                <Button className="keyboard-button" id="b" onClick={(e) => { handleClick(e) }}>b</Button>
                <Button className="keyboard-button" id="n" onClick={(e) => { handleClick(e) }}>n</Button>
                <Button className="keyboard-button" id="m" onClick={(e) => { handleClick(e) }}>m</Button>
                <Button className="keyboard-button" id="Enter" onClick={(e) => { handleClick(e) }}>Enter</Button>
            </div>
        </div>
    )
}

export default OnScreenKeyboard;