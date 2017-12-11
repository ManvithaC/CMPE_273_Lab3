import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Checkbox from 'material-ui/Checkbox';
import FileFolder from 'material-ui/svg-icons/file/folder';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import Description from 'material-ui/svg-icons/action/description';
import {blue300} from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
//const base_url="http://localhost:3000/public/uploads/";
const styles = {
  customWidth: {
    width: 200,
  },
};
const customContentStyle = {
  width: '40%',
  maxWidth: 'none',
};
export default class FilesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: localStorage['username'] || this.props.username,
      filename: '',
      files: [],
      open: false,
      shareToEmail:'',
      folderName:this.props.folderName || '/',
      value1:1,
      value2:2
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleShareEmailHere = (filename) => {
    this.setState({open: false});
    const shareToEmail = this.input.value;
    console.log("value here: "+shareToEmail);
    console.log("filename here: "+filename);
    var shareEmail={
      shareToEmail : shareToEmail,
      filename : filename,
      Access : this.state.value1,
    }
    this.props.handleShare(shareEmail);
  };

  handleShareGroupHere = (filename) => {
    this.setState({open: false});
    const shareToGroup = this.input.value;
    console.log("value here in handleShareGroupHere : "+shareToGroup);
    console.log("filename here handleShareGroupHere: "+filename);
    var shareGroup={
      shareToGroup : shareToGroup,
      filename : filename,
      Access: this.state.value2,
    }
    this.props.handleGroupShare(shareGroup);
  };


  handleClose = () => {
    this.setState({open: false});
  };
  handleChange1 = (event, index, value1) => this.setState({value1});
  handleChange2 = (event, index, value2) => this.setState({value2});

  // componentDidUpdate(){
  //   this.state = {
  //     username: localStorage['username'] || this.props.username,
  //     files: this.props.files,
  //     open: false,
  //   }
  // }
  componentWillMount(){

      this.setState({
      username: localStorage['username'] || this.props.username,
      files: this.props.files,
      open: false,
      value: 1,
      value: 2
      });
  }
  render() {
    const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
        onClick={this.handleClose}
     />,

   ];
      return (
      <div className="container-fluid">
      <div className="row pb-4 justify-content-md-start">
          <h2>Files</h2>
      </div>
      <div className="row pb-4 justify-content-md-start"><h5>Current Location : Files {this.props.folderName}</h5></div>

            <table className="table">
            <thead>
                <tr>
                  <th width="5%" colSpan="1"></th>
                  <th width="50%"  colSpan="2">File Name</th>
                  <th width="5%" colSpan="1"></th>
                  <th colSpan="2">Modified</th>
                  <th colSpan="1">Members</th>
                  <th colSpan="1">Options</th>
                </tr>
              </thead>
              <tbody>

              {this.props.files.map(listItem => (
                <tr key={listItem.filename}>
                  <td className="align-baseline" colSpan="1">
                  {
                    listItem.type === 'File'
                    ? <Description color={blue300}/>
                    : <FileFolder color={blue300}/>
                  }
                  </td>
                  <td className="align-text-top" colSpan="2" cols={listItem.cols || 1}>
                  {
                    listItem.type === 'File'
                    ?<a href={"H:/"+listItem.filename} download={listItem.filepath}>{listItem.filename}</a>
                    :<button label="folder" className="btn btn-link" name={listItem.filename} onClick={this.props.handleListDir}>{listItem.filename}</button>
                  }
                  </td>

                  <td colSpan="1" >
                  {
                    listItem.starred === "true"
                    ? <Checkbox checked={true} key={listItem.toString()} checkedIcon={<Star name={listItem.filename}/>} uncheckedIcon={<StarBorder name={listItem.filename}/>} onCheck={() => this.props.unStarFile(listItem.filename)} />
                    : <Checkbox checked={false} key={listItem.toString()} checkedIcon={<Star name={listItem.filename}/>} uncheckedIcon={<StarBorder name={listItem.filename}/>} onCheck={() => this.props.starFile(listItem.filename)} />
                  }
                   </td>
                  <td colSpan="2" key={listItem.modifiedDate} cols={listItem.cols || 2}>{listItem.modifiedDate}</td>
                  <td colSpan="1" >
                    <div>
                      <button label="share" className="btn btn-outline-primary btn-sm" onClick={this.handleOpen}>Share</button>

                      <Dialog title={listItem.filename} shareToEmail={this.shareToEmail} actions={actions} modal={false} contentStyle={customContentStyle} open={this.state.open} >
                        <hr/>
                        <strong>To: </strong>
                        <input type="email" ref={node => this.input = node} placeholder="Email or name" onChange={(event) => this.setState({
                        open:true})}/>
                        <button label="Share" className="btn btn-outline-primary ml-1" onClick={() =>this.handleShareEmailHere(listItem.filename)}>Share</button>
                        <DropDownMenu value={this.state.value1} onChange={this.handleChange1}>
                          <MenuItem value={1} primaryText="Can View" />
                          <MenuItem value={2} primaryText="Can Edit" />
                        </DropDownMenu>
                        <br/><hr/>
                        <strong>To: </strong>
                        <input type="text" ref={node => this.input = node} placeholder="Group Name" onChange={(event) => this.setState({
                        open:true})}/>
                        <button label="Share" className="btn btn-outline-primary ml-1" onClick={() =>this.handleShareGroupHere(listItem.filename)}>Share</button>
                        <DropDownMenu value={this.state.value2} onChange={this.handleChange2}>
                          <MenuItem value={1} primaryText="Can View" />
                          <MenuItem value={2} primaryText="Can Edit" />
                        </DropDownMenu>
                        <br/>
                        <hr/>
                        <div>No link created yet</div>

                      </Dialog>
                    </div>
                  </td>
                  <td colSpan="2" cols={listItem.cols || 2}>
                  {
                    <div>
                          <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                          >
                          {
                            listItem.type === 'File'
                            ?<button key="filename" className="btn btn-link btn-sm" name={listItem.filename} onClick={this.props.handleFileDelete}>Delete</button>
                            : null
                          }
                            <MenuItem  ><a href={listItem.filepath} download={listItem.filename} >Download</a> </MenuItem>

                          </IconMenu>
                        </div>

                  }
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
      </div>


      );
  }
}
