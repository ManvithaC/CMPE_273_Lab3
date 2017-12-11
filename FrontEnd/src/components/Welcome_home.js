import React, {Component} from 'react';
import '../App.css';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Description from 'material-ui/svg-icons/action/description';
import {blue300} from 'material-ui/styles/colors';
const base_url="http://localhost:3000/public/uploads";

export default class Welcome_home extends Component {
  constructor(props) {
      super(props);
      //const files = [];
      this.state = {
          files: [],
          username : localStorage['username'] || this.props.username,
          message1: '',
          message2:'',
          message3:'Looking for a better way to manage projects? Learn more here. ',
          filename:'',
          expired: false,
          isFilePage: false,
          isAboutPage: false,
          isWelcomeHomePage:true,
          folderName:'',
          isTextboxShown:false,
          menuOpen: false
      };
  }

  componentDidMount(){
      document.title = `Files - Dropbox`;
  }

  componentWillMount(){
    this.setState({
    files: this.props.files
    });
  }

  render() {
      return (
      <div className="container-fluid">
      <div className="row pb-4 justify-content-md-start">
          <h2 >Home</h2>
      </div>
        <div className="row justify-content-md-start">
            <h4 className="text-muted">Starred</h4>
            <table className="table">


            {this.props.files.map(listItem => (

              <tbody key={listItem.filename}>
              { listItem.starred === "true"
              ?(
                <tr key={listItem.filename}>
                  <td width="5%">
                  {
                    listItem.type === 'File'
                    ? <Description color={blue300}/>
                    : <FileFolder color={blue300}/>
                  }
                  </td>
                  <td key={listItem.filename} cols={listItem.cols || 1}><a href={ base_url + listItem.filename} download >{listItem.filename}</a></td>
                  <td></td>
                </tr>
              ): null}
              </tbody>
            ))}
           </table>
        </div>
        <div className="row justify-content-md-start">
            <h4 className="text-muted">Recent Files</h4>
            <table className="table">

            {this.props.files.map(listItem => (
              <tbody key={listItem.filename}>
                <tr key={listItem.filename}>
                  <td width="5%">
                  {
                    listItem.type === 'File'
                    ? <Description color={blue300}/>
                    : <FileFolder color={blue300}/>
                  }
                  </td>
                  <td key={listItem.filename} cols={listItem.cols || 1}><a href={ base_url + listItem.filename} download >{listItem.filename}</a></td>
                </tr>
              </tbody>
            ))}
           </table>
        </div>
      </div>


      );
  }
}
