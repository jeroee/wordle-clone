import React from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Correct(props) {
    return (
        <div style={{ visibility: `${props.show}` }} >
            <Alert variant="light">
                <Alert.Heading>Hooray! 🥳</Alert.Heading>
                <p>
                    Good job for guessing the correct word <b>"{props.targetWord}"</b>.
                    Well Done. 😺
                </p>
                <Button onClick={props.restart}>Restart Game</Button>
            </Alert>
        </div>
    );
}

export default Correct;