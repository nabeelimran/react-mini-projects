import React, { Component } from "react";
import swal from "sweetalert";
import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";

const employee = [
  {
    firstName: "Romin",
    lastName: "Irani",
    emailAddress: "romin.k.irani@gmail.com",
    salary: "50000",
    date: "2014-08-13"
  },
  {
    firstName: "Neil",
    lastName: "Irani",
    emailAddress: "neilrirani@gmail.com",
    salary: "55000",
    date: "2014-06-1"
  },
  {
    firstName: "Tom",
    lastName: "Hanks",
    emailAddress: "tomhanks@gmail.com",
    salary: "75000",
    date: "2014-09-10"
  }
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      employee,
      credentials: { email: "admin@domain.com", pass: "admin" },
      user: false,
      addForm: false,
      eEmail: "",
      ePass: "",
      fName: "",
      lName: "",
      email: "",
      salary: "",
      sDate: "",
      currentIndex: -1
    };

    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.Add = this.Add.bind(this);
    this.Update = this.Update.bind(this);
  }

  Login() {
    const { credentials, eEmail, ePass } = this.state;
    if (eEmail === credentials.email && ePass === credentials.pass) {
      swal({
        title: "Login Successful",
        icon: "success",
        buttons: false,
        timer: 1500
      });
      setTimeout(() => {
        this.setState({ user: true });
      }, 1500);
    } else swal("Wrong email or password", "Please try again", "error");
  }

  Logout() {
    swal({
      title: "Logout Successfully",
      icon: "warning",
      buttons: false,
      timer: 1000
    });
    setTimeout(() => {
      console.log("set time out");
      this.setState({ user: false });
    }, 1000);
  }

  Add() {
    const { employee, fName, lName, email, salary, sDate } = this.state;
    const obj = {
      firstName: fName,
      lastName: lName,
      emailAddress: email,
      salary: salary,
      date: sDate.toString()
    };
    employee.push(obj);
    swal({
      title: "Added successfully!",
      icon: "success",
      buttons: false,
      timer: 900
    });
    setTimeout(() => {
      this.setState({ employee: employee, addForm: false, fName:'', lName:'', email:'', salary:'', sDate:''  });
    }, 800);
  }

  UpdateShow(index) {
    var { employee, fName, lName, email, salary, sDate } = this.state;
    const current = employee[index];
    fName = current.firstName;
    lName = current.lastName
    email = current.emailAddress
    salary = current.salary
    sDate = current.date
    this.setState({fName, lName, email, salary, sDate ,currentIndex:index})
  }

  Update() {
    const { employee, fName, lName, email, salary, sDate, currentIndex } = this.state;
    const obj = {
      firstName: fName,
      lastName: lName,
      emailAddress: email,
      salary: salary,
      date: sDate.toString()
    };
    employee.splice(currentIndex,1,obj);
    this.setState({employee ,fName:'', lName:'', email:'', salary:'', sDate:'' ,currentIndex:-1})
  }

  Delete(index) {
    const { employee } = this.state;
    employee.splice(index,1);
    this.setState({employee})
  }

  // Render Functions **************************************************************

  renderLogin() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="form">
            <h1>Reactified Admin</h1>
            <input
              type="text"
              autoFocus
              placeholder="Email Address"
              onChange={e => {
                this.setState({ eEmail: e.target.value });
              }}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Password"
              onChange={e => {
                this.setState({ ePass: e.target.value });
              }}
            />
            <div className="btn-block" onClick={this.Login}>
              LOGIN
            </div>
          </div>
        </header>
      </div>
    );
  }

  showTable() {
    return (
      <div className="emp-info">
        <div className="emp-header">
          <span className="in-line">
            <p />
            <h1 className="heading">Employee Info Table</h1>
            <input
              className="logout-btn"
              type="button"
              value="Logout"
              onClick={this.Logout}
            />
          </span>
          {this.state.currentIndex !== -1 &&
          <div className="jaadu-contain">
            <div className="jaadu">
              <input type="text" name="" id="" value={this.state.fName} onChange={ e => {this.setState({fName:e.target.value})}} />
              <input type="text" name="" id="" value={this.state.lName} onChange={ e => {this.setState({lName:e.target.value})}} />
              <input type="text" name="" id="" value={this.state.email} onChange={ e => {this.setState({email:e.target.value})}} />
              <input type="text" name="" id="" value={this.state.salary} onChange={ e => {this.setState({salary:e.target.value})}} />
              <input type="text" name="" id="" value={this.state.sDate} onChange={ e => {this.setState({sDate:e.target.value})}} />
            </div>
            <div className="jaadu-btn">
              <input type="button" className="primary" value="Update" onClick={this.Update} />
              &nbsp;
              <input type="button" value="Cancel" onClick={ () => { this.setState({currentIndex:-1}) } } />
            </div>
          </div>}
        </div>
        <table className="emp-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Start Date</th>
              <th>Edit or Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employee.map((value,index) => {
              var name;
              index==this.state.currentIndex? name="highlight":name=""; 
              return (
                <tr className={name}>
                  <td>{value.firstName}</td>
                  <td>{value.lastName}</td>
                  <td>{value.emailAddress}</td>
                  <td>{value.salary}</td>
                  <td>{value.date}</td>
                  <td>
                    <input type="button" value="edit" onClick={this.UpdateShow.bind(this,index)} />
                    &nbsp;
                    <input
                      className="logout-btn wide"
                      type="button"
                      value="&times;"
                      onClick={this.Delete.bind(this,index)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button
          class="app-fab--absolute primary radi"
          variant="contained"
          color="primary"
          aria-label="Add"
          onClick={() => {
            setTimeout(() => {
              this.setState({ addForm: true });
            }, 300);
          }}
        >
          <span class="mdc-fab__icon material-icons">add</span>
        </Button>
      </div>
    );
  }

  addEmployeeForm() {
    return (
      <div className="App trans">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="form">
            <h1>Add Employee</h1>
            <form action="" onSubmit="return false">
            <input
              type="text"
              placeholder="First Name"
              autoFocus
              onChange={e => {
                this.setState({ fName: e.target.value });
              }}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Last Name"
              onChange={e => {
                this.setState({ lName: e.target.value });
              }}
            />
            <br />
            <br />
            <input
              type="email"
              placeholder="Email Address"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            <br />
            <br />
            <input
              type="number"
              placeholder="Salary"
              onChange={e => {
                this.setState({ salary: e.target.value });
              }}
            />
            <br />
            <br />
            <input
              type="date"
              placeholder="Job Start-date"
              onChange={e => {
                this.setState({ sDate: e.target.value });
              }}
            />

            <div className="btn-block" onClick={this.Add}>
              Add Employee
            </div>
            <div
              className="btn-block red"
              onClick={() => {
                setTimeout(() => {
                  this.setState({ addForm: false });
                }, 300);
              }}
            >
              Cancel
            </div>
          </form>
          </div>
        </header>
      </div>
    );
  }

  render() {
    const { user, addForm } = this.state;
    return (
      <div>
        {!user && this.renderLogin()}
        {user && !addForm && this.showTable()}
        {user && addForm && this.addEmployeeForm()}
      </div>
    );
  }
}

export default App;
