import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
const style = {
marginRight: 20,
};
const customContentStyle = {
  width: '50%',
  maxWidth: 'none',
};
class Message extends Component {
  state = {

    memberToAdd:'',
    groupMembers:this.props.groupMembers || [],
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
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleAddMember = () => {
    const memberToAdd = this.input.value;
    this.setState({open:false});
    this.props.addMember(memberToAdd);
    console.log(memberToAdd);
  };
  handledeleteMember = (memDelete) => {
    console.log("member to del: "+memDelete);
    this.props.deleteMember(memDelete);
  };
    render() {
      const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Add"
              primary={true}
              onClick={this.handleAddMember}
            />,
          ];
      const FloatingActionButtonExampleSimple = () => (
        <div>
          <FloatingActionButton onClick={this.handleOpen} mini={true} style={style}>
            <ContentAdd />
            </FloatingActionButton>
        </div>
      );
        return (
            <div className="container-fluid">
            <div className="row ml-3 justify-content-md-start">
            <h4>Members</h4>
                <div className="ml-3">
                  <FloatingActionButtonExampleSimple />
                </div>
            </div>
                <Dialog
                  title="Add Member to group"
                  actions={actions}
                  modal={true}
                  contentStyle={customContentStyle}
                  open={this.state.open}
                >
                <input type="text" ref={node => this.input = node} placeholder="Enter Member Name " onChange={(event) => this.setState({
                open:true})}/>

                </Dialog>
                <table className="table">
                <thead>
                    <tr>
                      <th width="20%" colSpan="2">Member Name</th>
                      <th width="10%" colSpan="2">Group Name</th>
                      <th width="10%" colSpan="2">Added on</th>
                      <th width="10%" colSpan="2">Options</th>
                    </tr>
                  </thead>
                {this.props.memberDetails.map(listItem => (
                  <tbody key={listItem.username}>
                    <tr key={listItem.username}>
                      <td cols={listItem.cols || 3}>
                        {listItem.username}
                      </td>
                      <td key={listItem.groupName} cols={listItem.cols || 1}>{listItem.groupName}</td>
                      <td key={listItem.username} cols={listItem.cols || 1}>{listItem.addedDate}</td>
                      <td key={listItem.addedDate} cols={listItem.cols || 1}>
                        <button label="delete" className="btn btn-sm btn-outline-danger" name={listItem.username} onClick={(event) =>this.handledeleteMember(listItem.username)}>Delete</button>
                      </td>
                    </tr>
                  </tbody>
                ))}
               </table>
            </div>
        );
    }
}

export default Message;
