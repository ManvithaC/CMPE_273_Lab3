import React, {Component} from 'react';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {blue300} from 'material-ui/styles/colors';
import Group from 'material-ui/svg-icons/social/group';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const customContentStyle = {
  width: '50%',
  maxWidth: 'none',
};
const IconSize = {
  width: 50,
  height: 50,
};
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 300,
    overflowY: 'auto',
  },
};

class GroupsList extends Component {
  state = {
    GroupName:'',
    GroupDetails:this.props.GroupDetails || [],

  };
  componentWillMount(){
    this.setState({
    open: false,
    GroupDetails:this.props.GroupDetails || [] });
  }

  componentDidMount(){
    this.setState({
    open: false,
    GroupDetails:this.props.GroupDetails || [] });
  }
  handleAddGroup = () => {
    const groupName = this.input.value;
    this.setState({open:false});
    this.props.handleAddGroup(groupName);
  };
  getDetailsOfGroups = (groupName) => {
     this.props.getDetailsOfGroups(groupName);
     console.log('groupName: '+groupName);
  };
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
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
              onClick={this.handleAddGroup}
            />,
          ];
          const style = {
        marginRight: 20,
      };
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
                  <FloatingActionButtonExampleSimple />
                </div>
              <Dialog
                title="Enter Group Name"
                actions={actions}
                modal={true}
                contentStyle={customContentStyle}
                open={this.state.open}
              >
              <input type="text" ref={node => this.input = node} placeholder="Enter Group Name" onChange={(event) => this.setState({
              open:true})}/>
              {console.log("Group length: "+this.state.GroupDetails.length)}
              </Dialog>
                <div className="row">
                  <div className="col-md-8">
                  <div style={styles.root}>
                        <GridList
                          cellHeight={180}
                          style={styles.gridList}
                          >
                          {this.state.GroupDetails.map((tile) => (
                            <GridTile
                              key={tile.groupName}
                              >
                              <Group style={IconSize} color={blue300}/>
                                <button label="groupName" className="btn btn-link" name={tile.groupName} onClick={(event) =>this.getDetailsOfGroups(tile.groupName)}>{tile.groupName}</button>
                                <button label="delete" className="btn btn-sm btn-outline-danger" name={tile.groupName} onClick={(event) =>this.props.handledeleteGroup(tile.groupName)}>Delete</button>
                            </GridTile>
                          ))}
                        </GridList>
                    </div>
                    </div>
                  </div>
            </div>
        );
    }
}

export default GroupsList;
