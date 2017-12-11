import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as API from '../api/API';
class LabDemo extends Component {

    state = {
        username: '',
        password: '',
    };

    componentWillMount(){
      var details ={
        username : "jes@b.com"
      }
      API.getFiles(details)
          .then((data) => {
              if(data.length > 0){
                console.log("returned data: " + Object.keys(data));
                // this.setState({
                //     files: data || [],
                //     username : localStorage['username'] || this.props.username
                // });
              }
          });
    }



    render() {
      //alert(this.state.isSignUpPage);
        return (
            <div>
hi

            </div>
        );
    }
}

export default withRouter(LabDemo);
