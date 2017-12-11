import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import LabDemo from "./LabDemo";
import SignInImage from './SignInImage.JPG';
import SignIn_logo from './SignIn_logo.JPG';
import '../App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleSignSubmit = this.handleSignSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      isLoggedIn: false,
      isSignedUp: false,
      isSignUpPage: false,
      isLoginPage:true,
      message1: '',
      username: '',
      message2: '',
      message3: '',
      files: []
    };
  }

  handleSignSubmit = (userdata) => {
          console.log("Login request: " + JSON.stringify(userdata));
          API.doLogin(userdata)
              .then((status) => {
                  if (status === 200) {

                      this.setState({
                          isLoggedIn: true,
                          message1: '',
                          username: userdata.username
                      });
                      localStorage['username'] = userdata.username;
                      //console.log("user from login:" + this.state.username);
                      this.props.history.push("/welcome");
                  } else if (status === 404) {
                      this.setState({
                          isLoggedIn: false,
                            message1: "Oops! It looks like you may have forgotten your password/username. Please try again.",
                            message2: '',
                            message3: '',
                      });
                  }
                  else if(status === null) {
                    this.setState({
                        isLoggedIn: false,
                          message1: "Username does not exist!!",
                          message2:'',
                          message3:''
                    });
                  }
              });
      };


  handleLogout = () => {
      console.log('logout called');
      API.logout()
          .then((status) => {
              if(status === 200){
                  this.setState({
                      isLoggedIn: false,
                      username: ''
                  });
                  localStorage['username'] ='';
                  this.props.history.push("/");
              }
          });
  };

    handleSignUpSubmit = (userdata) => {
      console.log(userdata.SignUpusername);
      var signup ={
        username : userdata.SignUpusername,
        password : userdata.SignUppassword,
        firstname : userdata.SignUpfirstname,
        lastname : userdata.SignUplastname,

      }
      API.doSignUp(signup)
      .then((status) => {
        if (status === 201) {
          this.setState({
            isLoggedIn: false,
            isSignUpPage:false,
            isLoginPage:true,
            message2: "Account Creation Successful. Please login",
            message1:'',
            message3:''
          });
          //this.props.history.push("/");
        } else if (status === 401) {
          this.setState({
            isLoggedIn: false,
            isLoginPage:false,
            isSignUpPage:true,
            message1: "Account already exists. Please try with a different username or login ",
            message2:'',
            message3:''
          });
        }
      });


    };

    handleSubmit = (userdata) => {

      if (userdata==="loginpage"){
        this.setState({
            isSignUpPage : false,
            isLoginPage: true,
            message2:'',
            message1:'',
            message3:''
          });
      }
      else if (userdata==="signuppage"){
        this.setState({
            isSignUpPage : true,
            isLoginPage: false,
            message1:'',
            message2:'',
            message3:''

          });
      }
    };

  render() {
    return (
      <div className="login">
        <Route exact path="/" render={() => (
          <div className="container-fluid">
            <div className="row justify-content-md-center">
                  <div className="col-md-1 pt-3">
                      <button type="button" className="btn btn-outline-primary"><strong>Try Dropbox Business</strong></button>
                  </div>
                  <div className="col-md-8 pt-2 justify-content-md-start">
                      <img src={SignIn_logo}  alt="logo" />
                  </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-md-6 justify-content-md-end">
                <img src={SignInImage} alt="logo" />
              </div>

              <div className="col-md-3">
              {
                  this.state.isLoginPage
                    ? <Login handleSubmit={this.handleSubmit} handleSignSubmit={this.handleSignSubmit}/>
                    : <div/>
              }
              {
                  this.state.isSignUpPage
                    ? <SignUp handleSignUpSubmit={this.handleSignUpSubmit} handleSubmit={this.handleSubmit} />
                    : <div/>
              }
                    <div className="justify-content-md-center" >
                      <Message message1={this.state.message1} message2={this.state.message2} message3={this.state.message3}/>
                    </div>
              </div>

            </div>

          </div>
        )}/>
        <div></div>
        <Route exact path="/welcome" render={() => (
              <Welcome handleLogout={this.handleLogout} username={this.state.username}/>
        )}/>

        <Route exact path="/labdemo" render={() => (
              <LabDemo username={this.state.username}/>
        )}/>



      </div>
    );
  }
}

export default withRouter(Home);
