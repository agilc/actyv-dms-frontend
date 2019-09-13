import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';

import MyFiles from 'components/MyFiles';
import Department from 'components/Department';
import Categories from 'components/Categories';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      selectedContainer : "myfiles"
    }
  }

  onSelectContainer =(container) => {
    this.setState({ selectedContainer: container});
  }

  getSideNav= () => {
    let { selectedContainer } = this.state;
    return(
      <div className="mt-4">
        <div className="module-side-content">
          <Paper className={`profile-settings-sidebar ${selectedContainer === "myfiles" && "active"}`}
            onClick={()=> this.onSelectContainer("myfiles")}
          >
            <div className="p-3">
              <span>My Files</span>
            </div>
          </Paper>
          <Paper className={`profile-settings-sidebar mt-1 ${selectedContainer === "department" && "active"}`}
            onClick={()=> this.onSelectContainer("department")}
          >
            <div className="p-3">
              <span>Department</span>
            </div>
          </Paper>
          <Paper className={`profile-settings-sidebar mt-1 ${selectedContainer === "categories" && "active"}`}
            onClick={()=> this.onSelectContainer("categories")}
          >
            <div className="p-3">
              <span>Categories</span>
            </div>
          </Paper>
        </div>
      </div>
    )
  }
  render() {
    let { selectedContainer } = this.state;
    return(
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="d-flex">
          <div className="flex-grow-1 m-3">
            {this.getSideNav()}
          </div>
          <div className="flex-grow-6 m-3">
            {
              selectedContainer === "myfiles" ? <MyFiles/>
              : selectedContainer === "department" ? <Department/>
              : <Categories/>
            }
          </div>
        </div>
      </div>  
    )
  }
}

export default Home;