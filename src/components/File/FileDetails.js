import React, {Component} from 'react';
import { connect } from "react-redux";
import { 
  TextField,
  Paper, 
  Button,
  Input,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import { 
  editFileFolder
} from 'actions/MyFiles';
import { DatePicker } from "@material-ui/pickers";
import "react-datepicker/dist/react-datepicker.css";

class FileDetails extends Component {
  constructor(){
    super();
    this.state = {
      name: "",
      description: "",
      metadataKey: "",
      metadataValue: "",
      metadata : [],
      category: "",
      expiryDate: null
    }
  }

  componentDidMount(){
    this.setState({
      name: this.props.file.name,
      metadata: this.props.file.metadata,
      category: this.props.file.category,
      expiryDate: this.props.file.expiry
    });
  }

  addMetadata = () =>{
    let { metadata, metadataKey, metadataValue } = this.state;
    let temp = metadata;
    temp.push({
      key: metadataKey,
      value: metadataValue
    })
    this.setState({ 
      metadata: temp,
      metadataKey: "",
      metadataValue: ""
     });
  }

  editFile = () => {
    let { file } = this.props;
    let { category, metadata, expiryDate } = this.state;

    let dataObj = {
      id: file._id,
      name: this.state.name,
      updatedBy: this.props.appUser
    }

    category && (dataObj.category = category);
    metadata && (dataObj.metadata = metadata);
    expiryDate && (dataObj.expiry = expiryDate);

    this.props.editFileFolder(dataObj);
  }

  getListItem = (item) => {
    return (
      <div 
        key={item._id} 
        className="d-flex justify-content-center team-member-list-wrapper cursor-pointer"
      >
        <div className="w-35 bg-white p-3 d-flex">
          <div className="text-black">{item.name}</div>
        </div>
        <div className="w-30 bg-white pt-3">
          <div>{item.updatedAt}</div>
        </div>
        <div className="w-35 bg-white pt-3">
          <div>{item.updatedBy ? item.updatedBy.name : item.createdBy.name}</div>
        </div>
      </div>
    )
  }

  render() {
    let { url, name } = this.props.file;
    let { categoryList } = this.props;
    return (
      <div>
        <div className="bg-white file-details-wrapper d-flex">
          <div className="col-6 d-flex justify-content-center">
            <img className="pt-4" src={url} alt={name}></img>
          </div>
          <div className="col-6 mt-1">
            <div className="col-10">
              <TextField
                id="name"
                label="Name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                margin="normal"
                fullWidth
              />
            </div>
            <div className="col-10 mt-3">
              <InputLabel className="mt-1 mr-1" htmlFor="name-multiple">Set expiry</InputLabel>
              <DatePicker
                value={this.state.expiryDate}
                onChange={ (date) => this.setState({expiryDate: date})}
                disablePast
              />
            </div>
            <div className="col-10 mt-2">
                <InputLabel htmlFor="name-multiple">Select Category</InputLabel>
                <Select
                  value={this.state.category}
                  onChange={ e => this.setState({ category: e.target.value })}
                  fullWidth
                >
                  { categoryList && categoryList.map(user => (
                    <MenuItem
                      key={user._id}
                      value={user._id}
                    >
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            <div>
              <h5 className="pt-3 m-0 pl-3">Metadata</h5>
                {
                  this.state.metadata.map((item, index) => 
                    <div className="d-flex" key={index}>
                      <div className="col-4">
                          <span>{item.key}</span>
                        </div>
                        <div className="col-8">
                          <span>{item.value}</span>
                        </div>
                    </div>
                  )
                }
                <div className="d-flex">
                  <div className="col-4">
                      <Input
                        placeholder="Name"
                        value={this.state.metadataKey}
                        onChange={event =>
                          this.setState({ metadataKey: event.target.value })
                        }
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        placeholder="Value"
                        value={this.state.metadataValue}
                        onChange={event =>
                          this.setState({ metadataValue: event.target.value })
                        }
                      />
                    </div>
                    <div className="col-2">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        className="jr-btn text-white"
                        onClick={this.addMetadata}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
            </div>
            <div className="d-flex p-3">
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={this.editFile}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        {
        this.props.file && this.props.file.revisionHistory.length > 0 &&
        <div className="animated slideInUpTiny animation-duration-3 pb-5">
          <div className="justify-content-center d-flex bg-white mt-2">
            <h5>File Revision History</h5>
          </div>
          <Paper className="d-flex justify-content-center mb-1">
            <div className="w-35 pl-3">NAME</div>
            <div className="w-30">DATE</div>
            <div className="w-35">OWNER</div>
          </Paper>
          {this.props.file && this.props.file.revisionHistory.map(file => this.getListItem(file))}
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { appUser } = auth;

  return {
    appUser
  };
};

export default connect(
  mapStateToProps,
  {
    editFileFolder
  }
)(FileDetails);