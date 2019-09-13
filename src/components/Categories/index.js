import React from "react";
import { Paper, Button} from "@material-ui/core";

import CreateCategory from 'components/Dialogs/CreateCategory';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      createCategoryDialog: false
    }
  }

  handleDialogCloseClose = () => {
    this.setState({createCategoryDialog: false});
  }

  render() {
    return(
      <div className="mt-4">
        <div className="module-main-content">
          <Paper className="h-100">
            <div className="d-flex justify-content-end p-3 container-button-wrapper">
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                // onClick={this.saveStore}
              >
                Create Category
              </Button>
            </div>
            <div className="p-3">
              <span>Categories</span>
            </div>
          </Paper>
        </div>
        {
          this.state.createCategoryDialog && 
          <CreateCategory
            handleClose={()=> this.handleDialogCloseClose()}
          />
        }
      </div>
    )
  }
}
export default Categories;