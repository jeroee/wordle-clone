import React from "react";
import Button from 'react-bootstrap/Button';

const CounterComponent = ({ value, min, max, onChange }) => {
    const handleIncrease = () => {
        if (value < max) onChange(value + 1);
    };

    const handleDecrease = () => {
        if (value > min) onChange(value - 1);
    };

    return (
        <div className="counter-component">
            <div className="counter-controls">
                <Button className="value-button" onClick={handleDecrease} disabled={value === min}>
                    -
                </Button>
                <span className="card-letter">{value}</span>
                <Button className="value-button" onClick={handleIncrease} disabled={value === max}>
                    +
                </Button>
            </div>
        </div>
    );
};

export default CounterComponent;