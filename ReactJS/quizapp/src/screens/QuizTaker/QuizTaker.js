import React, { Component } from "react";
import Timer from "../../components/Timer";
import swal from "sweetalert";
import "../../App.css";


class QuizTaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
        counter: 0,

    };
    this.correct = 0;

    this.Check = this.Check.bind(this);
    this.Result = this.Result.bind(this);
  }

  Check() {
    let { counter } = this.state;
    let localCounter = Number(localStorage.getItem("counter"));
    let localCorrect = Number(localStorage.getItem("correct"));
    const { quiz } = this.props;
    const val = document.querySelector("input[name='option']:checked");
    if (val === null) swal("select an option please");
    else {
      if (quiz[localCounter].answer === val.value) {
        localCorrect++;
        localStorage.setItem("correct",localCorrect);
      }

      if (quiz.length - 1 === localCounter) {
        this.Result();
      } else {
        localCounter++;
        counter++;
        document.querySelector("input[name='option']:checked").checked = false;
        localStorage.setItem("counter",localCounter);
        this.setState({ counter });
      }
    }
  }

  Result() {
    const {ShowResult} = this.props;
    const localCorrect = Number(localStorage.getItem("correct"));
    const score = (localCorrect/this.props.quiz.length) * 100;
    const obj = {
        date : new Date().toLocaleDateString(),        
        time : new Date().toLocaleTimeString(),    
        score,
    }
    ShowResult(obj);
  }

    render() {
      const {quiz} = this.props
      const counter = Number(localStorage.getItem("counter"));
      return (
          <div>
            <div className="App-header">
                <h4 className="App-title" > Question : {counter+1} of {quiz.length} </h4>
                <Timer Result={this.Result} />
            </div>

            <div className="container">
                <div className="options">
                    <h1>{quiz[counter].question}</h1>
                    <br/>
                    <br/>
                    <label htmlFor="">A. <input type="radio" name="option" value="1"/> {quiz[counter].option1} </label>
                    <br/>
                    <label htmlFor="">B. <input type="radio" name="option" value="2"/> {quiz[counter].option2} </label>
                    <br/>
                    <label htmlFor="">C. <input type="radio" name="option" value="3"/> {quiz[counter].option3} </label>
                    <br/>
                    <label htmlFor="">D. <input type="radio" name="option" value="4"/> {quiz[counter].option4} </label>
                </div>
                <br/>
                <br/>
                <button className="light" onClick={this.Check} >Next</button>
            </div>
        </div>
      );
    }
}

export default QuizTaker;
