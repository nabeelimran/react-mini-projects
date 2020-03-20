import React from "react";
import Container from "../../components/Container";


const Result = ({isGiven, BackToList}) => {
    return(
        <div>
            <h3>Quiz given on {isGiven.date} at {isGiven.time}</h3>
            <Container><h1>You have scored {isGiven.score} %</h1></Container>
            <button className="light" onClick={BackToList} > Back to List </button>
        </div>
    );
}

export default Result;
