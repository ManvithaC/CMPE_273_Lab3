import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import * as API from '../api/API';
import GroupDetails from "./GroupDetails";
import GroupsList from "./GroupsList";
import '../App.css';


class GroupSharing extends Component {

  state = {
    GroupName:'',
    GroupDetails:this.props.GroupDetails || [],
    isDetailsPage:false,
    isGroupsPage:true,
    memberDetails:this.props.memberDetails || []
  };


  componentWillMount(props){
    this.setState({
    GroupDetails:this.props.GroupDetails || [],
    memberDetails:this.props.memberDetails || []
 });
  }

  componentDidMount(props){
    this.setState({
    GroupDetails:this.props.GroupDetails || [],
    memberDetails:this.props.memberDetails || [] });
  }

  handleAddGroup = (groupName) => {
    this.props.CreateGroup(groupName);
  };

  handledeleteGroup = (groupName) => {
    this.props.deleteGroup(groupName);
  };

  addMember = (memberName) => {
    var detailstoAdd={
      memberName : memberName,
      groupName : this.state.GroupName,
    }
    this.props.addMember1(detailstoAdd);
  };

  deleteMember = (memberName) => {
    var detailstoDelete={
      memberName : memberName,
      groupName : this.state.GroupName,
    }
    this.props.deleteMember(detailstoDelete);
  };

  getDetailsOfGroups = (groupName) => {
    this.props.getGroupMembers(groupName);
    this.setState({
    isDetailsPage:true,
    isGroupsPage:false,
    GroupName:groupName,
   });
  };


  render() {


    return (

      <div className="container-fluid">
      <div className="row pb-4 justify-content-md-start">
          <h2>Groups</h2>
      </div>
      {
        this.state.isGroupsPage
        ? <GroupsList GroupDetails={this.state.GroupDetails}  memberDetails={this.state.memberDetails} getDetailsOfGroups={this.getDetailsOfGroups} handleAddGroup={this.handleAddGroup} handledeleteGroup={this.handledeleteGroup}/>
        :null
      }
      {
        this.state.isDetailsPage
        ? <GroupDetails GroupDetails={this.state.GroupDetails} memberDetails={this.props.memberDetails} deleteMember={this.deleteMember} addMember={this.addMember}/>
        : null
      }
        {console.log("Members length in Group Sharing : "+this.props.memberDetails.length )}
        {console.log("Groups length in Group Sharing : "+this.props.GroupDetails.length )}
     </div>
    );
  }
}

export default withRouter(GroupSharing);
