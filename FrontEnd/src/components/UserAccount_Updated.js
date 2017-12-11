
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';

class UserAccount_Updated extends Component {

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
      this.setState({
        username: this.props.username
      });
  }

  render() {
    return (
      <div className="form-group">
        <form>
            <div>
            <label id="about_work">Work</label><input required id ="about_work" type="text" className="form-control" value={this.props.about_work} readOnly></input><br/>
            <label id="about_education">Education</label><input required id ="about_education" type="text" className="form-control" value={this.props.about_education} readOnly></input><br/>
            <label id="about_mobile">Mobile</label><input required id ="about_mobile" type="number" className="form-control" value={this.props.about_mobile} readOnly></input><br/>
            <label id="about_secEmail">Secondary Email</label><input required id ="about_secEmail" type="email" className="form-control" value={this.props.about_secEmail} readOnly></input><br/>
            </div>
            <hr/>
            <div className="row justify-content-md-start">
                <h4 className="text-muted">Interests</h4>
            </div>
            <hr/>
            <label id="about_music">Music</label><input required id="about_music" type="text" className="form-control" value={this.props.about_music} readOnly></input><br/>
            <label id="about_shows">Shows</label><input required id ="about_shows" type="text" className="form-control" value={this.props.about_shows} readOnly></input><br/>
            <label id="about_sports">Sports</label><input required id ="about_sports" type="text" className="form-control" value={this.props.about_sports} readOnly></input><br/>
            <label id="about_food">Food</label><input required id ="about_food" type="text" className="form-control" value={this.props.about_food} readOnly></input><br/>
          </form>
      </div>
    );
  }
}

export default withRouter(UserAccount_Updated);
