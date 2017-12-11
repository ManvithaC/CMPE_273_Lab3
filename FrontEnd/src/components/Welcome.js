import React, {Component} from 'react';
import {Route,withRouter} from 'react-router-dom';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {blue300} from 'material-ui/styles/colors';
import smiley from './smiley.PNG';
import * as API from '../api/API';
import '../App.css';
import Message from "./Message";
import Ionicon from 'react-ionicons';
import Avatar from 'material-ui/Avatar';
import FilesList from "./FilesList";
import Welcome_home from "./Welcome_home";
import GroupSharing from "./GroupSharing";
import UserAccount from "./UserAccount";
import UserActivity from "./UserActivity";
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardMedia, CardText} from 'material-ui/Card';
import card from './card.PNG';

class Welcome extends Component {

constructor(props) {
        super(props);
        //const files = [];
        this.state = {
            files: [],
            recentFiles: [],
            username : localStorage['username'] || this.props.username,
            message1: '',
            message2:'',
            message3:'Looking for a better way to manage projects? Learn more here. ',
            fileName:'',
            expired: false,
            isFilePage: false,
            isAboutPage: false,
            isWelcomeHomePage:true,
            isTextboxShown:false,
            isGroupsPage:false,
            isUserActivityPage:false,
            menuOpen: false,
            folderName:'/',
            newFolderName: '',
            shareToEmail:'',
            GroupDetails:[],
            memberDetails:[]
        };
    }
handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
handleRequestClose = () => {
    this.setState({
      open: false,
    });

  };
expireSession = () => {
      this.setState({expired: true})
      localStorage['username'] = '';
    }
componentDidMount(){
        document.title = `Files - Dropbox`;
        var details = {
          username : "jes@b.com",
        }
        API.getFiles(details)
            .then((data) => {
                if(data.length > 0){
                  console.log("returned data: " + Object.keys(data));
                  this.setState({
                      files: data || [],
                      username : localStorage['username'] || this.props.username
                  });
                }
            });
        API.getRecentFiles(this.state)
            .then((data) => {
                if(data.length > 0){
                  this.setState({
                      username : localStorage['username'] || this.props.username,
                      recentFiles : data || []
                  });
                }
            });
        API.getGroups()
            .then((data) => {
                console.log("Fetch Group Details - successful");
                console.log("Group Deatils: "+data);
                this.setState({
                  GroupDetails:data || [],
                  message2: '',
                  message1:'',
                  message3:''
            });

          });
    }

    componentWillMount(){
        this.setState({
            username : localStorage['username'] || this.props.username
        });
        var details = {
          username : "jes@b.com",
        }
        API.welcome()
            .then((status) => {
                console.log("in API.welcome - response:" + status);
                if (status === 200) {
                 console.log("Session is still valid!");
                 API.getFiles(details)
                     .then((data) => {
                         console.log("data: "+ Object.keys(data));
                          console.log("data len: "+data.length);
                         if(data){
                           this.setState({
                               files: data || [],
                               username : localStorage['username'] || this.props.username
                           });
                         }
                     });
                 API.getRecentFiles(this.state)
                     .then((data) => {
                         if(data.length > 0){
                           this.setState({
                               username : localStorage['username'] || this.props.username,
                               recentFiles : data || []
                           });
                         }
                     });
                }
                else if (status === 401) {
                      this.props.history.push("/");
                    console.log("Session is not valid!");
                }
            });
    }
starFile = (event) => {
    console.log("Starred File before: " + event);
    var userFile = {
      fileName: event,
      username: localStorage['username'] || this.props.username
    };
    var details = {
      username : "jes@b.com",
    }
    console.log("Starred File User: " + JSON.stringify(userFile));
    API.favoriteFile(userFile)
    .then((status) => {
      if (status === 200) {
        console.log("Star file user" + this.state.username);
        API.getFiles(details)
            .then((data) => {
                  this.setState({
                      files: data || [],
                      message1: 'File starred successfully',
                      message2:'',
                      message3:'Looking for a better way to manage projects? Learn more here. ',
                      username : localStorage['username'] || this.props.username
                  });
            });
      } else if (status === '') {
        this.setState({
          message1: "File did not get starred!!!"
        });
      }
    });
   };
unStarFile = (event) => {
       console.log("UnStarred File before: " + event);
       var userFile = {
         fileName: event,
         username: localStorage['username'] || this.state.username
       };
       var details = {
         username : "jes@b.com",
       }
       console.log("UNStarred File User: " + JSON.stringify(userFile));
       //console.log("Starred File: " + this.state.fileName);
       API.unFavoriteFile(userFile)
       .then((status) => {
         if (status === 200) {
           console.log("UnStar file user" + this.state.username);
           API.getFiles(details)
               .then((data) => {

                   if(data.length>0){
                     this.setState({
                         files: data || [],
                         message1: 'File unstarred successfully',
                         message2:'',
                         message3:'Looking for a better way to manage projects? Learn more here. ',
                         username : localStorage['username'] || this.props.username
                     });
                   }

               });
         } else if (status === '') {
           this.setState({
             message1: "File did not get unstarred!!!"
           });
         }
       });
      };
handleListDir = (event) => {
    if(this.state.folderName === '/')
      this.state.folderName = this.state.folderName + event.target.name;
    else {
      this.state.folderName = this.state.folderName + '/' + event.target.name;
    }
    var details = {
      username : "jes@b.com",
    }
    API.getFiles(details)
        .then((data) => {
            if (data) {
              console.log("files in a folder: " +  data);
              this.setState({
                  files: data || [],
                  username : localStorage['username'] || this.props.username
              });
            }
            else{
              this.setState({
                    message1: "Folder does not exist!!",
                    username : localStorage['username'] || this.props.username
              });
            }
        });
    };
handleDownload = (event) => {
        console.log("File Name to Download: " + event.target.name);
        var file = {
          filename : event.target.name,
          username: localStorage['username'] || this.props.username
        }
        API.download(file)
            .then((response) => {
                // if (status === 200) {
                //   console.log("in download");
                // }
                // else if(status === null) {
                //   console.log("not download");
                // }
              console.log("file download");
            });
        };
handleFileDelete = (event) => {
        console.log("FileName to delete: " + event.target.name);
        var file = {
          filePath :this.state.folderName,
          fileName:event.target.name,
          username: localStorage['username'] || this.props.username
        }
        var details = {
          username : "jes@b.com",
        }
        //console.log("FilePath to delete: " + this.state.folderName + event.target.name);
         API.deleteFile(file)
             .then((status) => {
                 if (status === 200) {
                   API.getFiles(details)
                       .then((data) => {
                           //files:data
                           this.setState({
                               files: data || [],
                               message2: 'File Deleted successfully',
                               message1:'',
                               message3:'Looking for a better way to manage projects? Learn more here. ',
                               username : localStorage['username'] || this.props.username
                           });
                       });
                 }
                 else if(status === 401) {
                   this.setState({
                         message1: "The You do not have permissions to delete the file!!",
                         message2:'',
                         username : localStorage['username'] || this.props.username
                   });
                 }
             });
     };
handleFileUpload = (event) => {
         //
         const payload = new FormData();
          payload.append("name",event.target.files[0].name);
          payload.append("file", event.target.files[0]);
          payload.append('username', this.state.username);
         // payload.append('filePath', this.state.folderName);
         var details = {
           username : this.state.username,
         }
         API.uploadFile(payload)
             .then((status) => {
                 if (status === 201) {
                    console.log("File upload successful");
                     API.getFiles(details)
                         .then((data) => {
                             this.setState({
                                 files: data || [],
                                 message3:'Looking for a better way to manage projects? Learn more here. ',
                                 message2: 'Document Uploaded successfully',
                                 message1: '',
                                 username : localStorage['username'] || this.props.username
                             });
                         });
                 }
                 else if (status === 401){
                   this.setState({
                       message1: 'Document with the same name already exists',
                       message2: '',
                       message3:'Looking for a better way to manage projects? Learn more here. ',
                       username : localStorage['username'] || this.props.username
                     });
                   }
                 else{
                   this.setState({
                       message1: 'Document Upload failed',
                       message2: '',
                       message3:'Looking for a better way to manage projects? Learn more here. ',
                       username : localStorage['username'] || this.props.username
                   });
                 }
             });

     };

 handleShare = (userdata) => {
   console.log("user Name to Share: " + userdata.shareToEmail);
   console.log("FIlename to Share: " + userdata.filename);
   var shareDetails = {
     shareToEmail : userdata.shareToEmail,
     filename : userdata.filename
   }
    console.log("Share File Request:" + shareDetails.filename);
   API.shareFile(shareDetails)
       .then((status) => {
         console.log(status.message);
           if (status === 200) {
             this.setState({
                 message2: 'File Shared successfully.',
                 message1:'',
                 message3:'Looking for a better way to manage projects? Learn more here. ',
                 username : localStorage['username'] || this.props.username
             });
           }
           else if(status === 401 || status === 500){
             this.setState({
                 message1: 'File Sharing Failed.',
                 message2:'',
                 message3:'Looking for a better way to manage projects? Learn more here. ',
                 username : localStorage['username'] || this.props.username
             });
           }
       });
 };

 handleGroupShare = (userdata) => {
   console.log("GroupName to Share: " + userdata.shareToGroup);
   console.log("FIlename to Share: " + userdata.filename);
   var shareDetails = {
     shareToGroup : userdata.shareToGroup,
     filename : userdata.filename
   }
    //console.log("Share File Request:" + shareDetails.filename);
   API.shareFileToGroup(shareDetails)
       .then((status) => {
         console.log(status.message);
           if (status === 200) {
             this.setState({
                 message2: 'File Shared to group successfully.',
                 message1:'',
                 message3:'Looking for a better way to manage projects? Learn more here. ',
                 username : localStorage['username'] || this.props.username
             });
           }
           else if(status === 401 || status === 500){
             this.setState({
                 message1: 'File Shared to group Failed.',
                 message2:'',
                 message3:'Looking for a better way to manage projects? Learn more here. ',
                 username : localStorage['username'] || this.props.username
             });
           }
       });
 };
handleCreateFolder = (userdata) => {
       console.log("FolderName" + userdata);

       var folder = {
         folderPath : this.state.folderName,
         folderName : userdata,
         username : localStorage['username'] || this.props.username
       }
       var details = {
         username : "jes@b.com",
       }
       console.log("CreateFolder Request:" + folder.folderPath);
       API.createFolder(folder)
           .then((status) => {
               if (status === 200) {
                   API.getFiles(details)
                       .then((data) => {
                           //files:data
                           this.setState({
                               files: data || [],
                               message3:'Looking for a better way to manage projects? Learn more here. ',
                               message2: 'Folder Created successfully',
                               message1:'',
                               isTextboxShown: false,
                               username : localStorage['username'] || this.props.username
                           });
                       });
               }
               else{
                 this.setState({
                     message1: 'Folder Creation failed',
                     message2:'',
                     message3:'Looking for a better way to manage projects? Learn more here. ',
                     username : localStorage['username'] || this.props.username
                 });
               }
           });
      };

CreateGroup = (GroupData) => {
    console.log("Group Data: "+GroupData );
    var groupname ={
      groupName: GroupData
    }
    API.createGroup(groupname)
    .then((status) => {
      if (status === 201) {
        console.log("Created Group - successful");
        API.getGroups()
        .then((data) => {
            console.log("Fetch Group Details - successful");
            this.setState({
              GroupDetails:data || [],
              message2: "Group Creation Successful",
              message1:'',
              message3:''
        });
      });
    } else{
        this.setState({
          message1: "Group Creation failed"
        });
      }
    });
   };

   deleteGroup = (GroupData) => {
       console.log("Group delete Data: "+GroupData );
       var groupname ={
         groupName: GroupData
       }
       API.deleteGroup(groupname)
       .then((status) => {
         if (status === 200) {
           console.log("Delete Group - successful");
           API.getGroups()
           .then((data) => {
               console.log("Fetch Group Details - successful");
               this.setState({
                 GroupDetails:data || [],
                 message2: "Group Deleted Successful",
                 message1:'',
                 message3:''
           });
         });
       } else{
           this.setState({
             message1: "Delete Group failed"
           });
         }
       });
      };
getGroupMembers = (MemberData) => {
    console.log("add member data: " + MemberData);
    var groupName ={
      groupName : MemberData
    }
        API.getMemberDetails(groupName)
        .then((data) => {
            console.log("Fetch Group Details - successful");
            console.log("data after getMemberDetails: "+data);
            this.setState({
              memberDetails:data || [],
              message2: "",
              message1:'',
              message3:''
        });
      });

   };
addMember1 = (MemberData) => {
    console.log("add member data: " + MemberData.memberName+ MemberData.groupName);
    API.addMember(MemberData)
    .then((status) => {
      if (status === 201) {
        console.log("Member Add  - successful");
        var groupName ={
          groupName : MemberData.groupName
        }
        API.getMemberDetails(groupName)
        .then((data) => {
            console.log("Fetch Group Details - successful");
            console.log("data after getMemberDetails: "+data);
            this.setState({
              memberDetails:data || [],
              message2: "Member Added Successfully",
              message1:'',
              message3:''
        });
      });
    } else{
        this.setState({
          message1: "Member Add failed"
        });
      }
    });
   };

   deleteMember = (MemberData) => {
       console.log("delete member data: " + MemberData.memberName+ MemberData.groupName);
       API.deleteMember(MemberData)
       .then((status) => {
         if (status === 201) {
           console.log("Member delete  - successful");
           var groupName ={
             groupName : MemberData.groupName
           }
           API.getMemberDetails(groupName)
           .then((data) => {
               console.log("Fetch Group Details - successful");
               console.log("data after getMemberDetails: "+data);
               this.setState({
                 memberDetails:data || [],
                 message2: "Member deleted Successfully",
                 message1:'',
                 message3:''
           });
         });
       } else{
           this.setState({
             message1: "Member Add failed"
           });
         }
       });
      };

render(){
      const classes = this.props;
        return(
          <div className="row container-fluid">
          <Route exact path="/" render={() => (
                <Message message1="Login Expired" message2={this.state.message2} message3={this.state.message3}/>
          )}/>
          <div className="col-2 pt-5 mt-3 d-flex flex-column">
              <div className="bg-grey" style={{height :"100vh"}}  >

              <div className="row pt-3 pl-5">
                <div className="col-md-1 pt-3 justify-content-md-start">
                    <Ionicon icon="ion-social-dropbox" fontSize="50px" color="#007AF5"></Ionicon>
                </div>
              </div>
              <div className="row pt-3 pl-5">
                <button
                    className="btn btn-link ml-3 btn-sm"
                    type="button"
                    onClick={(event) => {
                        this.setState({
                          isFilePage: false,
                          isAboutPage: false,
                          isWelcomeHomePage:true,
                          isUserActivityPage:false,
                        });}}>
                    <strong><h4>Home</h4></strong>
                </button>
              </div>
                  <div className="row pt-3 pl-5">
                    <button
                        className="btn btn-link ml-3 btn-sm"
                        type="button"
                        onClick={(event) => {
                            this.setState({
                              isFilePage: true,
                              isAboutPage: false,
                              isWelcomeHomePage:false,
                              isGroupsPage:false,
                              isUserActivityPage:false,
                            });}}>
                        <strong><h4>Files</h4></strong>
                    </button>
                  </div>
                  <div className="row pt-3 pl-5">
                      <button
                          className="btn btn-link ml-3 btn-sm"
                          type="button"
                          onClick={(event) => {
                              this.setState({
                                isFilePage: false,
                                isAboutPage: true,
                                isGroupsPage:false,
                                isWelcomeHomePage:false,
                                isUserActivityPage:false,
                              });}}>
                          <strong><h4>Account</h4></strong>
                      </button>
                    </div>
                    <div className="row pt-3 pl-5">
                        <button
                            className="btn btn-link ml-3 btn-sm"
                            type="button"
                            onClick={(event) => {
                                this.setState({
                                  isFilePage: false,
                                  isAboutPage: false,
                                  isWelcomeHomePage:false,
                                  isGroupsPage:true,
                                  isUserActivityPage:false,
                                });}}>
                            <strong><h4>Groups</h4></strong>
                        </button>
                      </div>
                      <div className="row pt-3 pl-5">
                          <button
                              className="btn btn-link ml-3 btn-sm"
                              type="button"
                              onClick={(event) => {
                                  this.setState({
                                    isFilePage: false,
                                    isAboutPage: false,
                                    isWelcomeHomePage:false,
                                    isGroupsPage:false,
                                    isUserActivityPage:true
                                  });}}>
                              <strong><h4>User Activity</h4></strong>
                          </button>
                        </div>
              </div>
            </div>
              <div className="col-10">
                <Message message3={this.state.message3}/>

                <div className="row justify-content-md-end">
                  <div className="justify-content-md-end pl-3">
                      <input type="text" placeholder = "Search"></input>
                      <Ionicon className = "mx-3 mt-3" icon="ion-android-notifications-none" fontSize="25px" color="grey"></Ionicon>

                      <Avatar src={smiley} onClick={this.handleTouchTap}/>
                      <Popover
                          open={this.state.open}
                          anchorEl={this.state.anchorEl}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                          targetOrigin={{horizontal: 'left', vertical: 'top'}}
                          onRequestClose={this.handleRequestClose}
                        >
                        <Menu>
                          <MenuItem><Avatar src={smiley}/></MenuItem>
                          <MenuItem>{this.props.username}</MenuItem>
                          <MenuItem><a href="https://www.dropbox.com/plans?_camp=624&_tk=prompt_header_link&trigger=wahprmt" className="btn btn-link">Upgrade</a></MenuItem>
                          <MenuItem>  <button
                              className="btn  btn-outline-danger ml-3 btn-sm"
                              type="button"
                              onClick={() => this.props.handleLogout()}>
                              Sign out
                          </button> </MenuItem>

                        </Menu>
                      </Popover>
                  </div>

                </div>

                <div className="row ">


                  <div className="col-md-10 justify-content-md-start">
                  {
                      this.state.isFilePage
                        ? <FilesList files={this.state.files} folderName={this.state.folderName} username={this.state.username} handleFileUpload={this.handleFileUpload} handleDownload={this.handleDownload} starFile={this.starFile} unStarFile={this.unStarFile} handleShare={this.handleShare} handleGroupShare={this.handleGroupShare} handleListDir={this.handleListDir} handleFileDelete={this.handleFileDelete} shareToEmail={this.shareToEmail}/>
                        : <div/>
                  }
                  {
                      this.state.isAboutPage
                        ? <UserAccount username={this.state.username}/>
                        : <div/>
                  }
                  {
                      this.state.isWelcomeHomePage
                        ? <Welcome_home username={this.state.username} files={this.state.files} recentFiles={this.state.recentFiles} starredFiles={this.state.starredFiles}/>
                        : <div/>
                  }
                  {
                      this.state.isGroupsPage
                        ? <GroupSharing memberDetails={this.state.memberDetails} CreateGroup={this.CreateGroup} deleteMember={this.deleteMember} addMember1={this.addMember1} GroupDetails={this.state.GroupDetails} deleteGroup={this.deleteGroup} getGroupMembers={this.getGroupMembers}/>
                        : <div/>
                  }
                  {
                      this.state.isUserActivityPage
                        ? <UserActivity/>
                        : <div/>
                  }

                  {console.log("Members length in welcome : "+this.state.memberDetails.length )}
                  {console.log("Groups length in welcome : "+this.state.GroupDetails.length )}
                </div>

                  <div className="col-md-2 justify-content-md-start">
                    <div>
                          <span className="btn mt-5 btn-primary btn-file btn-block">
                          Upload Files<input type="file" className="btn btn-primary btn-file btn-block" name="file" onChange={this.handleFileUpload}/>
                           </span>
                           <hr/>
                           <div className="row justify-content-md-start">
                           {
                               this.state.isTextboxShown
                                 ? <div><input type="text" placeholder="Folder name" onChange={(event) => {this.setState({newFolderName: event.target.value})}}/><button className="btn btn-link mt-2" type="button" onClick={() => this.handleCreateFolder(this.state.newFolderName)}><strong>Go</strong></button></div>
                                 : <div/>

                           }
                           </div>
                           <div className="row justify-content-md-start">
                                <FileFolder viewBox="0 0 30 20" color={blue300} className="mt-2 ml-3"/><button
                                    className="btn btn-link mt-2"
                                    type="button"
                                    onClick={(event) => {
                                          this.setState({
                                              isTextboxShown: true
                                        })}}><strong>New Shared Folder</strong></button>
                          </div>
                           <div className="row justify-content-md-start">
                                  <FileFolder viewBox="0 0 30 20" color={blue300} className="mt-2 ml-3"/><button
                                    className="btn btn-link mt-2"
                                    type="button"
                                    onClick={(event) => {
                                          this.setState({
                                              isTextboxShown: true
                                        })}}><strong>New Folder</strong></button>
                          </div>

                          <div className="row  mt-5 pt-5 align-items-end">
                            <Card >
                              <CardMedia>
                                <img src={card} alt="" />
                              </CardMedia>
                              <CardText>
                                Get the power of Dropbox Business and unlock more features!
                              </CardText>
                              <CardActions>
                                <button className="btn btn-outline-primary btn-sm" >Upgrade now</button>
                              </CardActions>
                          </Card>
                         </div>

                    </div>
                  </div>
                </div>
                <Message message2={this.state.message2} message1={this.state.message1} />
              </div>
          </div>
        )
    }
}

export default withRouter(Welcome);
