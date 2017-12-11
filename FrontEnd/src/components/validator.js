import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback} from 'react-form-with-constraints';

class SignUp extends Component {
  constructor(props) {
    super(props);
	this.setState({
        SignUpfirstname:'',
        SignUplastname:'',
        SignUpusername: '',
        SignUppassword: '',
		isSignUpPage:true,
		hasErrors: false
      });

    this.handleChange = this.handleChange.bind(this);
    this.contactSubmit = this.contactSubmit.bind(this);
  }

  handleChange(e) {
    this.form.validateFields(e.currentTarget);
  }

  contactSubmit(e) {
    e.preventDefault();

    this.form.validateFields();

    if (!this.form.isValid()) {
      console.log('form is invalid: do not submit');
    } else {
      console.log('form is valid: submit');
    }
  }

  render() {
    return (
		<div ClassName="container-fluid">
			<div className="row justify-content-md-start">
                  <h3>Create an account</h3>
		  </div>
		  <div className="row justify-content-md-end">
			<button
				className="btn btn-link"
				type="button"
				onClick={() => this.props.handleSubmit("loginpage")}>
				<strong>Log in</strong>
			</button>
		  </div>
		  <div className="form-group">
			  <FormWithConstraints ref={form => this.form = form} onSubmit={this.contactSubmit} noValidate>
		 
				<div className="col-md-6">
				  <input id="firstname" name="firstname" size="30" type="text" placeholder="First Name" className="form-control" 
						 required onChange={this.handleChange}/>
				  <FieldFeedbacks for="firstname">
					<FieldFeedback when="*"/>
				  </FieldFeedbacks>
				  
				  <input id="lastname" name="lastname" size="30" type="text" placeholder="Last Name" className="form-control" 
						 required onChange={this.handleChange}/>
				  <FieldFeedbacks for="lastname">
					<FieldFeedback when="*"/>
				  </FieldFeedbacks>

				  <input id="username" type="email" name="email" size="30" placeholder="Email" className="form-control"
						 required onChange={this.handleChange}/>
				  <FieldFeedbacks for="email">
					<FieldFeedback when="*"/>
				  </FieldFeedbacks>

				  <input id="password" name="password" type="password" size="30" placeholder="Password" className="form-control"
						 required onChange={this.handleChange}/>
				  <FieldFeedbacks for="password">
					<FieldFeedback when="*"/>
				  </FieldFeedbacks>

				  <input name="address" size="30" placeholder="Address"
						 required onChange={this.handleChange}/>
				  <FieldFeedbacks for="address">
					<FieldFeedback when="*"/>
				  </FieldFeedbacks>
				</div>

				<div className="col-md-6">
				  <textarea name="comments" cols="40" rows="20" placeholder="Message"
							required minLength={5} maxLength={50}
							onChange={this.handleChange}/>
				  <FieldFeedbacks for="comments">
					<FieldFeedback when="*"/>
				  </FieldFeedbacks>
				</div>
		  
				<div className="col-md-12">
				  <button className="btn btn-lg">Send Message</button>
				</div>
			  </FormWithConstraints>
			</div>
		</div>
    );
  }
}

export default withRouter(SignUp);