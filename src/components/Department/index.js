import React from "react";
import { Button} from "@material-ui/core";
import { connect } from "react-redux";
import moment from 'moment';

import CreateDepartment from "components/Dialogs/CreateDepartment";
import ConfirmationDialog from 'components/Dialogs/ConfirmationDialog';
import FileContainer from 'components/File/FileContainer';

import { getUserList } from 'actions/Auth';
import { 
  addDepartment, 
  listDepartment,
  deleteDepartment,
  editDepartment
} from 'actions/Department';

class Department extends React.Component {
  constructor() {
    super();
    this.state = {
      createDepartmentDialog: false,
      editDepartment: null,
      deleteConfirmation: false,
      selectedDepartment: null
    }
  }

  componentDidMount(){
    this.props.getUserList();
    this.props.listDepartment(this.props.appUser._id, this.props.appUser._id);
  }

  handleDialogCloseClose = () => {
    this.setState({createDepartmentDialog: false});
  }

  createDepartment = (dataObj) => {
    if(!this.state.editDepartment){
      dataObj.createdBy = this.props.appUser;
      this.props.addDepartment(dataObj);
    }
    else{
      dataObj.id = this.state.editDepartment._id;
      dataObj.updatedBy = this.props.appUser;
      this.props.editDepartment(dataObj);
    }
    
    this.setState({ 
      createDepartmentDialog: false,
      editDepartment: null
    })
  }

  editDepartmentDialog = (event,item) => {
    event.stopPropagation();
    this.setState({
      editDepartment: item,
      createDepartmentDialog: true
    });
  }

  deleteDepartmentConfirmation = (event,item) => {
    event.stopPropagation();
    let data = {
      id: item._id,
      user: this.props.appUser
    };
    this.setState({ 
      dialogSuccessData: data,
      deleteConfirmation: true
    });
  }

  deleteDepartment = (data) => {
    this.props.deleteDepartment(data);
    this.setState({ deleteConfirmation: false });
  }

  deleteDepartmentCancel = () =>{
    this.setState({ deleteConfirmation: false });
  }

  selectDepartment = (dept) => {
    this.setState({ selectedDepartment: dept });
  }

  getListItem = (item, role) => {
    return (
      <div 
        key={item._id} 
        className="d-flex justify-content-center pt-1 team-member-list-wrapper cursor-pointer" 
        onClick={() => this.selectDepartment(item)}
      >
        <div className="w-20 bg-white p-3 d-flex">
          <div className="text-black">{item.name}</div>
        </div>
        <div className="w-30 bg-white pt-3">
          <div>{item.description}</div>
        </div>
        <div className="w-10 bg-white pt-3">
          <div>{role}</div>
        </div>
        <div className="w-15 bg-white pt-3">
          <div>{item.createdBy.name}</div>
        </div>
        <div className="w-10 bg-white pt-3">
          <div>{moment(item.createdAt).format("DD-MMM-YYYY")}</div>
        </div>
        <div className="w-15 bg-white pt-3 d-flex">
          <div className="pr-2 d-flex action-text cursor-pointer" onClick={(event) => this.editDepartmentDialog(event,item)}>
            <i className="zmdi zmdi-edit p-1"/>
            <div>Edit</div>
          </div>
          <div className="pr-2 d-flex action-text cursor-pointer" onClick={(event) => this.deleteDepartmentConfirmation(event,item)}>
            <i className="zmdi zmdi-delete p-1"/>
            <div>Delete</div>
          </div>
        </div>
      </div>
    )
  }

  getDepartmentHome = () => {
    return(
      <React.Fragment>
        <div className="module-main-content">
          {/* <Paper className="h-100"> */}
            <div className="d-flex justify-content-end p-3 container-button-wrapper">
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={() => { this.setState({createDepartmentDialog: true}); }}
              >
                New Department
              </Button>
            </div>
            {/* <div className="p-3">
              <span>Department</span>
            </div>
          </Paper> */}

            <div className="animated slideInUpTiny animation-duration-3 pb-5">
              <div className="d-flex justify-content-center">
                <div className="w-20 pl-3">NAME</div>
                <div className="w-30">DESCRIPTION</div>
                <div className="w-10">ROLE</div>
                <div className="w-15">CREATED BY</div>
                <div className="w-10">CREATED AT</div>
                <div className="w-15"></div>
                
              </div>
              {this.props.departmentList.adminDepts && this.props.departmentList.adminDepts.map(user => this.getListItem(user, "Admin"))}
              {this.props.departmentList.userDepts && this.props.departmentList.userDepts.map(user => this.getListItem(user, "User"))}
            </div>
        </div>
        {
          this.state.createDepartmentDialog && 
          <CreateDepartment
            handleClose={()=> this.handleDialogCloseClose()}
            createDepartment= { this.createDepartment }
            userList={this.props.userList}
            appUser={this.props.appUser}
            editDepartment={this.state.editDepartment}
          />
        }

        <ConfirmationDialog
          open = {this.state.deleteConfirmation}
          heading = "Are you sure ?"
          body = "Do you want to delete the Department"
          successFunction = { () => this.deleteDepartment(this.state.dialogSuccessData) }
          errorFunction = { () => this.deleteDepartmentCancel()}
          successData = {this.state.dialogSuccessData }
        />
      </React.Fragment>
    )
  }

  render() {
    return(
      <div>
        {
          !this.state.selectedDepartment ? 
            this.getDepartmentHome()
          : <FileContainer container="DEPARTMENT" containerId={this.state.selectedDepartment._id}/>
        }
      </div>
    )
  }
}
const mapStateToProps = ({ auth, department }) => {
  const { appUser, userList } = auth;
  const { departmentList } = department;

  return {
    userList,
    appUser,
    departmentList
  };
};

export default connect(
  mapStateToProps,
  {
    getUserList,
    addDepartment,
    listDepartment,
    deleteDepartment,
    editDepartment
  }
)(Department);