import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';


class UserAccount_Empty extends Component {

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
      hasErrors: false,
      username: localStorage['username'] || this.props.username
  };

  componentWillMount(){
      console.log("Emtering empty");
      this.setState({
        username: this.props.username
      });
  }
  // componentDidUpdate(){
  //     //console.log("Emtering empty");
  //     this.setState({
  //       username: this.props.username
  //     });
  // }

  // handleAboutSubmit = (userdata) => {
  //   console.log("about user data" + userdata.username);
  //
  //   API.AboutSubmit(userdata)
  //   .then((status) => {
  //     if (status === 201) {
  //       this.setState({
  //         isLoggedIn: true,
  //         message1: "Details Updated Successfully"
  //       });
  //
  //     } else if (status === '') {
  //       this.setState({
  //         isLoggedIn: false,
  //         isLoginPage:true,
  //         message1: "Details are not updated. Please try again. "
  //       });
  //     }
  //   });
  //
  //  };

  render() {
    return (
      <div className="form-group">
        <form>
            <input required id="work" type="text" className="form-control" placeholder="Work"
            onChange={(event) => {
                this.setState({
                    about_work: event.target.value
                });}}></input><br/>
            <input required id ="about_education" type="text" className="form-control" placeholder="Education"
            onChange={(event) => {
                this.setState({
                    about_education: event.target.value
                });}}></input><br/>
            <input required id ="about_mobile" type="number" className="form-control" placeholder="Mobile Number"
            onChange={(event) => {
                this.setState({
                    about_mobile: event.target.value
                });}}></input><br/>
            <input required id ="about_secEmail" type="email" className="form-control" placeholder="Secondary Email"
            onChange={(event) => {
                this.setState({
                    about_secEmail: event.target.value
                });}}></input><br/>

                <hr/>

                <div className="row justify-content-md-start">
                    <h4 className="text-muted">Interests</h4>
                </div>
                <hr/>
                <input required id="about_music" type="text" className="form-control" placeholder="Music"
                onChange={(event) => {
                    this.setState({
                        about_music: event.target.value
                    });}}></input><br/>
                <input required id ="about_shows" type="text" className="form-control" placeholder="TV Shows"
                onChange={(event) => {
                    this.setState({
                        about_shows: event.target.value
                    });}}></input><br/>
                <input required id ="about_sports" type="text" className="form-control" placeholder="Sports"
                onChange={(event) => {
                    this.setState({
                        about_sports: event.target.value
                    });}}></input><br/>
                <input required id ="about_food" type="text" className="form-control" placeholder="Food"
                onChange={(event) => {
                    this.setState({
                        about_food: event.target.value
                    });}}></input><br/>

            <div className="row justify-content-md-end">
                <button type="button" className="btn btn-sm btn-primary"
                onClick={() => this.props.handleAboutSubmit(this.state)}><strong>Update Details</strong></button>
            </div>
          </form>
      </div>
    );
  }
}

export default withRouter(UserAccount_Empty);
