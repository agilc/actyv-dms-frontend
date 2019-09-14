import React from "react";
import { connect } from "react-redux";
import { Paper, Button} from "@material-ui/core";
import moment from 'moment';

import CreateCategory from 'components/Dialogs/CreateCategory';
import ConfirmationDialog from 'components/Dialogs/ConfirmationDialog';
import { 
  listCategories,
  addCategory,
  editCategory,
  deleteCategory
} from 'actions/Category';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      createCategoryDialog: false,
      selectedCategory: null,
      deleteConfirmation: false,
      dialogSuccessData: {}
    }
  }

  componentDidMount(){
    this.props.listCategories();
  }

  handleDialogCloseClose = () => {
    this.setState({createCategoryDialog: false});
  }

  editCategory = (item) => {
    this.setState({ 
      selectedCategory: item, 
      createCategoryDialog: true
    });
  }

  createCategory = (data) => {
    if(!this.state.selectedCategory){
      data.createdBy = this.props.appUser;
      this.props.addCategory(data);
    }
    else{
      data.id = this.state.selectedCategory._id;
      data.updatedBy = this.props.appUser;
      this.props.editCategory(data);
    }

    this.setState({ 
      createCategoryDialog: false,
      selectedCategory: null
    })
  }

  deleteCategoryConfirmation = (item) => {
    let data = {
      id: item._id
    };
    this.setState({ 
      dialogSuccessData: data,
      deleteConfirmation: true
    });
  }

  deleteCategory = (data) =>{
    this.props.deleteCategory(data);
    this.setState({ deleteConfirmation: false });
  }

  deleteCategoryCancel = () =>{
    this.setState({ deleteConfirmation: false });
  }

  getListItem = (item) => {
    return (
      <div key={item._id} className="d-flex justify-content-center pt-1 team-member-list-wrapper">
        <div className="w-20 bg-white p-3 d-flex">
          <div className="text-black">{item.name}</div>
        </div>
        <div className="w-30 bg-white pt-3">
          <div>{item.description}</div>
        </div>
        <div className="w-20 bg-white pt-3">
          <div>{item.createdBy.name}</div>
        </div>
        <div className="w-15 bg-white pt-3">
          <div>{moment(item.createdAt).format("DD-MMM-YYYY")}</div>
        </div>
        <div className="w-15 bg-white pt-3 d-flex">
          <div className="pr-2 d-flex action-text cursor-pointer" onClick={() => this.editCategory(item)}>
            <i className="zmdi zmdi-edit p-1"/>
            <div>Edit</div>
          </div>
          <div className="pr-2 d-flex action-text cursor-pointer" onClick={() => this.deleteCategoryConfirmation(item)}>
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
                onClick={() => { this.setState({createCategoryDialog: true}); }}
              >
                Create Category
              </Button>
            </div>
            {/* <div className="p-3">
              <span>Categories</span>
            </div> */}
          {/* </Paper> */}
        </div>

          <div className="animated slideInUpTiny animation-duration-3 pb-5">
            {/* <ContainerHeader title={<IntlMessages id="message.logs"/>} match={this.props.match}/> */}
            <div className="d-flex justify-content-center">
              <div className="w-20 pl-3">NAME</div>
              <div className="w-30">DESCRIPTION</div>
              <div className="w-20">CREATED BY</div>
              <div className="w-15">CREATED AT</div>
              <div className="w-15"></div>
              
            </div>
            {this.props.categoryList && this.props.categoryList.map(user => this.getListItem(user))}
          </div>

        {
          this.state.createCategoryDialog && 
          <CreateCategory
            handleClose={()=> this.handleDialogCloseClose()}
            selectedCategory={this.state.selectedCategory}
            successFunction={ this.createCategory }
          />
        }

        <ConfirmationDialog
          open = {this.state.deleteConfirmation}
          heading = "Are you sure ?"
          body = "Do you want to delete the Category"
          successFunction = { () => this.deleteCategory(this.state.dialogSuccessData) }
          errorFunction = { () => this.deleteCategoryCancel()}
          successData = {this.state.dialogSuccessData }
        />
      </div>
    )
  }
}

const mapStateToProps = ({ category, auth }) => {
  const { categoryList } = category;
  const { appUser } = auth;

  return {
    categoryList,
    appUser
  };
};

export default connect(
  mapStateToProps,
  {
    listCategories,
    addCategory,
    editCategory,
    deleteCategory
  }
)(Categories);