import React, { Component } from 'react';
import '../../App.css';

class QuizList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {list,DisplayInfo,Logout} = this.props;
    return (
      <div>
        <div className="App-header">
          <span></span>
          <h1 className="App-title" >Dashboard</h1>
          <button className="dark" onClick={Logout}>Logout</button>
        </div>
        <ol>
          {list.map((value,index) => {
            return(
              <li>
                <span>{value.name}</span>
                <button onClick={() => {DisplayInfo(index)}} >Enter Quiz</button>
              </li> 
            )
          })}
        </ol>
      </div>
    );
  }
}

export default QuizList;
