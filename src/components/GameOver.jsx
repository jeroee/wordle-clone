import React from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Gameover(props) {
    return (
        <div style={{ visibility: `${props.show}` }} >
            <Alert variant="dark">
                <Alert.Heading>Game Over 😥</Alert.Heading>
                <p>
                    The correct word is <b>'{props.targetWord.join('')}'</b>.
                    Better luck next time ...
                </p>
                <Button onClick={props.restart}>Restart Game</Button>
            </Alert>
        </div>
    );
}

export default Gameover;