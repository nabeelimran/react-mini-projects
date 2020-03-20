import React, { Component } from "react";
import swal from "sweetalert";
import QuizList from "./screens/QuizList/QuizList";
import SubList from "./screens/SubList/SubList";
import Container from "./components/Container";
import LoginForm from "./screens/Login/Login";
import SignupForm from "./screens/Signup/Signup";
import QuizTaker from "./screens/QuizTaker/QuizTaker";
import Result from "./screens/Result/Result";
import "./App.css";


const list = [
  { name: "Javascript", quizes: 2 },
  { name: "FireBase", quizes: 1 },
  { name: "AngularJs", quizes: 2 },
  { name: "PWA", quizes: 3 },
];

const procKey = "787898";

const javascript = [
  [
    {

        "question": "How to create alert box?",
        "option1": "alert='hello world'",
        "option2": "aler('hello world')",
        "option3": "alert.('hello world')",
        "option4": "alert('hello world')",
        "answer": "4"
    },
    {

        "question": "How to create variable?",
        "option1": "variable name = 'ali'",
        "option2": "var name = 'ali'",
        "option3": "variable: 'ali'",
        "option4": "variable. 'ali'",
        "answer": "2"
    },
    {

        "question": "How to create function?",
        "option1": "Function(){}",
        "option2": "function.create()",
        "option3": "function(){}",
        "option4": "function{}",
        "answer": "3"
    },
    {

        "question": "How to push value in array?",
        "option1": "arr.push(value)",
        "option2": "arr.push.value",
        "option3": "arr.(value)",
        "option4": "arr.value.push(value)",
        "answer": "1"
    }
  ],
  [
    {

        "question": "What is javascript",
        "option1": "programming language",
        "option2": "scripting language",
        "option3": "codding language",
        "option4": "web language",
        "answer": "2"
    },
    {

        "question": "keyword Which is Used To convert value In Integer?",
        "option1": "Int.parse",
        "option2": "parseInt",
        "option3": "Interger",
        "option4": "parse.Int",
        "answer": "2"
    },
    {

        "question": "Keyword Which Generates Random number?",
        "option1": "Math.Random",
        "option2": "Math.Round",
        "option3": "Round.Math",
        "option4": "Random.Math",
        "answer": "1"
    },
    {

      "question": "how we Concatenate two strings?",
      "option1": "+",
      "option2": "-",
      "option3": "#",
      "option4": "%",
      "answer": "1"
    }
  ]
];

const firebase = [
  [
    {

        "question": "FireBase is owned by?",
        "option1": "Microsoft",
        "option2": "Google",
        "option3": "Amazon",
        "option4": "none of these",
        "answer": "2"
    },
    {

        "question": "FireBase provides :",
        "option1": "Hosting",
        "option2": "RealTime Database",
        "option3": "Cloud Messaging",
        "option4": "All of these",
        "answer": "4"
    }
  ]
]



class App extends Component {
  constructor() {
    super();

    this.state = {
      list,
      javascript,
      firebase,
      isSignup: false,
      user: false,
      selected: null,
      quiz: null,
    };

    this.ShowSignup = this.ShowSignup.bind(this);
    this.ShowLogin = this.ShowLogin.bind(this);
    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.DisplayInfo = this.DisplayInfo.bind(this);
    this.BackToList = this.BackToList.bind(this);
    this.StartQuiz = this.StartQuiz.bind(this);
    this.ShowResult = this.ShowResult.bind(this);
  }

  ShowSignup() {
    this.setState({ isSignup: true });
  }
  ShowLogin() {
    this.setState({ isSignup: false });
  }
  Login() {
    this.setState({ user: true });
    localStorage.setItem("user",true);
  }
  Logout() {
    swal("","Logged out","info")
    this.setState({ user: false });
    localStorage.removeItem("user");
  }

  DisplayInfo(index) {
    const { list } = this.state;
    this.setState({ selected: list[index] });
    localStorage.setItem("selected", JSON.stringify(list[index]));
  }

  BackToList() {
    delete this.state.title;
    this.setState({ selected: null ,quiz : null});
    localStorage.removeItem("selected");
    localStorage.removeItem("quiz");
  }
  
  StartQuiz (title ,index, quizName) {
    localStorage.setItem("counter","0");
    localStorage.setItem("correct","0");
    if(localStorage.getItem(title) !== null){
      this.setState({title});
    }
    else if (this.state[quizName]){
      swal({
        title,
        text: "Enter proctoring key to proceed",
        content:"input",
      }).then( key => {
        if(key === procKey)
        {
          swal("Starting quiz","Duration : 05 minutes","success",{timer:1000,buttons:false})
          const current = this.state[quizName][index];
          setTimeout( localStorage.setItem("quiz",JSON.stringify(current)) , 900)
          setTimeout(this.setState({ quiz: current, title, [title] : false}),1000);
        }
        else
          swal("Wrong key","","error")
      });
    }
  }

  ShowResult(dateTimeMraks) {
    const {title} = this.state;
    localStorage.setItem(title,JSON.stringify(dateTimeMraks));
    this.setState({ [title]: true });
  }



  render() {
    const { list, isSignup, title } = this.state;
    const isGiven = localStorage.getItem(title);
    const user = JSON.parse(localStorage.getItem("user"));
    const selected = JSON.parse(localStorage.getItem("selected"));
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    return (
      <div className="App">
        {!user
         ? (
          <Container>
            {!isSignup ? (
              <LoginForm ShowSignup={this.ShowSignup} Login={this.Login} />
            ) : (
              <SignupForm ShowLogin={this.ShowLogin} />
            )}
          </Container>)
          : !selected
            ? (
            <QuizList list={list} Logout={this.Logout} DisplayInfo={this.DisplayInfo} />)
            :
              isGiven
              ?
              <Result isGiven={JSON.parse(isGiven)} BackToList={this.BackToList}/>
              :
                quiz
                ?
                <QuizTaker quiz={quiz}  ShowResult={this.ShowResult}/>
                :
                <SubList StartQuiz={this.StartQuiz} selected={selected} BackToList={this.BackToList} Logout={this.Logout} />
        }
      </div>
    );
  }
}

export default App;
