import React from "react";
import { Paper, Button} from "@material-ui/core";
import { connect } from "react-redux";
import moment from 'moment';

import FileUpload from 'components/Dialogs/FileUpload';
import CreateFolder from "components/Dialogs/CreateFolder";
import CreateDepartment from "components/Dialogs/CreateDepartment";
import ConfirmationDialog from 'components/Dialogs/ConfirmationDialog';

import { getUserList } from 'actions/Auth';
import { 
  addDepartment, 
  listDepartment,
  deleteDepartment
} from 'actions/Department';

class Department extends React.Component {
  constructor() {
    super();
    this.state = {
      fileUploadDialog: false,
      createFolderDialog: false,
      createDepartmentDialog: false,
      editDepartment: null,
      deleteConfirmation: false
    }
  }

  componentDidMount(){
    this.props.getUserList();
    this.props.listDepartment(this.props.appUser._id, this.props.appUser._id);
  }

  handleDialogCloseClose = (type) => {
    if(type === "file_upload"){
      this.setState({fileUploadDialog: false});
    }
    else if(type === "new_folder"){
      this.setState({createFolderDialog: false});
    }
    else{
      this.setState({createDepartmentDialog: false});
    }
  }

  createDepartment = (dataObj) => {
    this.props.addDepartment(dataObj);
    this.setState({createDepartmentDialog: false});
  }

  editDepartmentDialog = (item) => {
    this.setState({
      editDepartment: item,
      createDepartmentDialog: true
    });
  }

  deleteDepartmentConfirmation = (item) => {
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

  getListItem = (item, role) => {
    return (
      <div key={item._id} className="d-flex justify-content-center pt-1 team-member-list-wrapper">
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
          <div className="pr-2 d-flex action-text cursor-pointer" onClick={() => this.editDepartmentDialog(item)}>
            <i className="zmdi zmdi-edit p-1"/>
            <div>Edit</div>
          </div>
          <div className="pr-2 d-flex action-text cursor-pointer" onClick={() => this.deleteDepartmentConfirmation(item)}>
            <i className="zmdi zmdi-delete p-1"/>
            <div>Delete</div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div>
        <div className="module-main-content">
          {/* <Paper className="h-100"> */}
            <div className="d-flex justify-content-end p-3 container-button-wrapper">
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={() => { this.setState({fileUploadDialog: true}); }}
              >
                Upload
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={() => { this.setState({createFolderDialog: true}); }}
              >
                New Folder
              </Button>
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
          this.state.fileUploadDialog && 
          <FileUpload
            handleClose={()=> this.handleDialogCloseClose("file_upload")}
          />
        }
        {
          this.state.createFolderDialog && 
          <CreateFolder
            handleClose={()=> this.handleDialogCloseClose("new_folder")}
          />
        }
        {
          this.state.createDepartmentDialog && 
          <CreateDepartment
            handleClose={()=> this.handleDialogCloseClose("new_dept")}
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
    deleteDepartment
  }
)(Department);