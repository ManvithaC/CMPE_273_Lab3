import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback} from 'react-form-with-constraints';

class SignUp extends Component {
  constructor(props) {
    super(props);


    this.handleChangeFN = this.handleChangeFN.bind(this);
    this.handleChangeLN = this.handleChangeLN.bind(this);
    this.handleChangeUN = this.handleChangeUN.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.verifySubmit = this.verifySubmit.bind(this);
  }
  componentWillMount(){
    this.setState({
          SignUpfirstname:'',
          SignUplastname:'',
          SignUpusername: '',
          SignUppassword: '',
      		isSignUpPage:true,
      		hasErrors: false
        });
  }

  handleChangeFN(event) {
    this.form.validateFields(event.currentTarget);
    this.setState({
      SignUpfirstname: event.target.value
    })
  };
  handleChangeLN(event) {
    this.form.validateFields(event.currentTarget);
    this.setState({
      SignUplastname: event.target.value
    })
  };
  handleChangeUN(event) {
    this.form.validateFields(event.currentTarget);
    this.setState({
      SignUpusername: event.target.value
    })
  };
  handleChangePass(event) {
    this.form.validateFields(event.currentTarget);
    this.setState({
      SignUppassword: event.target.value
    })
  };

  verifySubmit(event) {
    event.preventDefault();

    this.form.validateFields();

    console.log("form Validity:" + this.form.isValid());
    if (!this.form.isValid()) {
      console.log('Fields are not valid, not submitting');
    } else {
      console.log('All fields are valid: submitting');
      this.props.handleSignUpSubmit(this.state);
    }
  }

  render() {
    return (
  		<div className="container-fluid">
  			<div className="row">
        <div className="col-md-8 justify-content-md-start">
                    <h4>Create an account</h4>
          </div>
          <div className="col-md-4">
    			<button
    				className="btn btn-link btn-block"
    				type="button"
    				onClick={() => this.props.handleSubmit("loginpage")}>
    				<strong>Log in</strong>
    			</button>
          </div>
           </div>
           <div>
           <form>
          <div className="form-group">
  			  <FormWithConstraints ref={form => this.form = form} onSubmit={this.contactSubmit} noValidate>

  				  <input id="firstname" name="firstname" minLength={4} size="30" type="text" placeholder="First Name" className="form-control"
  						 required onChange={this.handleChangeFN}/>
  				  <FieldFeedbacks for="firstname">
  					<FieldFeedback when="*"/>
  				  </FieldFeedbacks><br/>

  				  <input id="lastname" name="lastname" minLength={4} size="30" type="text" placeholder="Last Name" className="form-control"
  						 required onChange={this.handleChangeLN}/>
  				  <FieldFeedbacks for="lastname">
  					<FieldFeedback when="*"/>
  				  </FieldFeedbacks><br/>

  				  <input id="username" type="email" name="email" size="30" placeholder="Email" className="form-control"
  						 required onChange={this.handleChangeUN}/>
  				  <FieldFeedbacks for="email">
  					<FieldFeedback when="*"/>
  				  </FieldFeedbacks><br/>

  				  <input id="password" name="password" type="password" minLength={4} size="30" placeholder="Password" className="form-control"
  						 required onChange={this.handleChangePass}/>
  				  <FieldFeedbacks for="password">
  					<FieldFeedback when="*"/>
  				  </FieldFeedbacks><br/>

  				  <div className="row ml-5">
    					<div className="col-md-6 justify-content-md-start">
    					  <label>
    						  <input type="checkbox" className="form-check-input pt-1" id="checkboxSuccess" value="option1"></input>
    						  I agree to <a href="https://www.dropbox.com/install?src=login" className="btn btn-link ml-1">Dropbox terms.</a>
    					  </label>
    					</div>
    				</div><br/>
  					<div className="row justify-content-md-end">
                <button type="button" className="btn btn-sm btn-primary"
                onClick={this.verifySubmit}><strong>Create an account</strong></button>
            </div>

  			  </FormWithConstraints>
  			</div>
        </form>
        </div>
  		</div>
    );
  }
}

export default withRouter(SignUp);
