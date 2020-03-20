import React, { Component } from 'react';
import '../../App.css';

class SubList extends Component {
  render() {
    const {selected , BackToList, Logout, StartQuiz} = this.props;
    const quizes = [];
    for (let i = 0; i < selected.quizes; i++) {
      quizes.push(`${selected.name} Quiz ${i+1}`)
    }
    return (
      <div>
        <div className="App-header">
          <span></span>
          <h1 className="App-title" >{selected.name}</h1>
          <button className="dark" onClick={Logout}>Logout</button>
        </div>
        <ol>
          {quizes.map((value,index) => {
            return(
              <li className='pointer' onClick={() => {StartQuiz( value,index,selected.name.toLowerCase() )} } >
                <span>{value}</span>
              </li> 
            )
          })}
        </ol>
        <br/>
        <br/>
        <center> <button className="light" onClick={BackToList} > Back to List </button> </center>
      </div>
    );
  }
}

export default SubList;