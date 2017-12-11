import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import FileFolder from 'material-ui/svg-icons/file/folder';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import Description from 'material-ui/svg-icons/action/description';
import {blue300, red500, greenA200,transparent} from 'material-ui/styles/colors';
import {Link,withRouter} from 'react-router-dom';
import * as API from '../api/API';
import '../App.css';
const base_url="http://localhost:3000/public/uploads";


export default class StarredFiles extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: localStorage['username'] || this.props.username,
      fileName: this.props.file,
      files: this.props.files
    }
  }
  render() {
     const classes = this.props;
      return (
        <table className="table">

            <tbody>
          <tr key={this.props.file.filename}>
            <td>
            {
              this.props.file.type === 'File'
              ? <Description color={blue300}/>
              : <FileFolder color={blue300}/>
            }
            </td>
            <td key={this.props.file.filename} cols={this.props.file.cols || 1}><a href={ base_url + this.props.file.filename} download >{this.props.file.filename}</a></td>
            <td>
            {
              this.props.file.type === 'File'
              ? <button key="fileName" className="btn btn-outline-primary btn-sm" name={this.props.file.filename} onClick={this.props.handleFileDelete}>Delete</button>
              : null
            }
            </td>
          </tr>
          </tbody>
        </table>
      );
  }
}
