import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import * as API from '../api/API';
import '../App.css';
import UserAccount_Empty from "./UserAccount_Empty";
import UserAccount_Updated from "./UserAccount_Updated";

class UserAccount extends Component {

  state = {
      about_work:'',
      about_education:'',
      about_mobile: '',
      about_secEmail: '',
      about_music: '',
      about_shows: '',
      about_sports: '',
      about_food: '',
      isUserAccount:true,
      isAboutUpdated: false,
      isAboutEmpty: true,
      hasErrors: false,
      username: localStorage['username'] || this.props.username
  };

  componentWillMount(){
      API.getAbout(this.props)
        .then((data) => {
          if(data.length === 1 ){
            this.setState({
                about_work:data[0].work,
                about_education:data[0].education,
                about_mobile: data[0].mobile,
                about_secEmail: data[0].sec_email,
                about_music: data[0].music,
                about_shows: data[0].shows,
                about_sports: data[0].sports,
                about_food: data[0].food,
                isAboutUpdated: true,
                isAboutEmpty: false,
                username : this.props.username
            });
          }
            else{
              this.setState({
                  isAboutUpdated: false,
                  isAboutEmpty: true,
                  username : this.props.username
              });
            }
        });
  }

  handleAboutSubmit = (userdata) => {
    console.log("about user data" + userdata.username);

    API.AboutSubmit(userdata)
    .then((status) => {
      console.log("About creation status:" + status);
      if (status === 201) {
        console.log("Details updated successfully");
        API.getAbout(this.props)
          .then((data) => {
            if(data.length === 1 ){
              this.setState({
                  isLoggedIn: true,
                  about_work:data[0].work,
                  about_education:data[0].education,
                  about_mobile: data[0].mobile,
                  about_secEmail: data[0].sec_email,
                  about_music: data[0].music,
                  about_shows: data[0].shows,
                  about_sports: data[0].sports,
                  about_food: data[0].food,
                  message1: "Details Updated Successfully",
                  isAboutEmpty: false,
                  isAboutUpdated: true
              });
            }
              else{
                this.setState({
                    isAboutUpdated: false,
                    isAboutEmpty: true,
                    username : this.props.username
                });
              }
          });

      } else if (status === '') {
        this.setState({
          isLoggedIn: false,
          isLoginPage:true,
          isAboutUpdated: false,
          isAboutEmpty: true,
          message1: "Details are not updated. Please try again. "
        });
      }
    });

   };

  render() {
    return (
      <div className="container-fluid">
      <div className="row pb-4 justify-content-md-start">
          <h2>Account</h2>
      </div>
            <div className="row justify-content-md-start">
                <h4 className="text-muted">About</h4>
            </div>
            <hr/>
            <div className="col-md-8 justify-content-md-start">
            {
                this.state.isAboutUpdated
                  ? <UserAccount_Updated username={this.state.username} about_education={this.state.about_education} about_mobile={this.state.about_mobile} about_work={this.state.about_work} about_secEmail={this.state.about_secEmail} about_music={this.state.about_music} about_shows={this.state.about_shows} about_sports={this.state.about_sports} about_food={this.state.about_food}/>
                  : <div/>
            }
            {
                this.state.isAboutEmpty
                  ? <UserAccount_Empty handleAboutSubmit={this.handleAboutSubmit} username={this.state.username} about_education={this.state.about_education}/>
                  : <div/>
            }
            </div>
      </div>
    );
  }
}

export default withRouter(UserAccount);
