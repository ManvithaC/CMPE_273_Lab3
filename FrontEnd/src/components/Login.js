import React, {Component} from 'react';
//import PropTypes from 'prop-types';
//import SignUp from "./SignUp";
import { withRouter } from 'react-router-dom';

class Login extends Component {

    // static propTypes = {
    //     // handleSubmit: PropTypes.func.isRequired
    //     // handleSubmit: PropTypes.func.isRequired
    //     // handleSubmit: PropTypes.func.isRequired
    // };

    state = {
        username: '',
        password: '',
        isLoginPage:true,
        isSignUpPage: false
    };

    componentWillMount(){

        this.setState({
            username: '',
            password: '',
            isLoginPage:true,
            isSignUpPage: false
        });
        localStorage['username'] = '';
    }



    render() {
      //alert(this.state.isSignUpPage);
        return (
            <div>
                <div className="row justify-content-md-start">
                    <h4>Sign in</h4>
                </div>
                <div className="form-group">
                <div className="row justify-content-md-end">
                    <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => this.props.handleSubmit("signuppage")}>
                        or <strong>Create an account</strong>
                    </button>
                  </div>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-primary btn-sm btn-block"><strong>Sign in with Google</strong></button>
                </div>
                <hr/>
                <div className="row justify-content-md-center">or</div>
                <div>
                    <form>

                        <div className="form-group">
                            <input required
                                className="form-control"
                                type="email"
                                label="username"
                                placeholder="Email"
                                value={this.state.username}
                                onChange={(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input required
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="col-md-6 justify-content-md-start">

                            <label>
                                <input type="checkbox" className="form-check-input" id="checkboxSuccess" value="option1"></input>
                                Remember me
                            </label>
                            </div>
                        <div className="form-group">
                        <div className="row justify-content-md-end">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSignSubmit(this.state)}>
                                <strong>Sign in</strong>
                            </button>
                              </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-link">Forgot your Password?</button>
                </div><br/>
                <div className="card">
                    <div>Get Dropbox on your desktop -
                      <a href="https://www.dropbox.com/install?src=login" className="btn btn-link">download now</a>
                    </div>
                </div>


            </div>
        );
    }
}

export default withRouter(Login);
