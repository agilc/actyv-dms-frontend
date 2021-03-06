import React, { Component } from 'react';
import Files from 'react-files';
import S3FileUpload from 'react-s3';
import {
  DialogTitle, 
  DialogActions, 
  DialogContent, 
  TextField,
  Dialog, 
  Button,
  Slide,
  Avatar,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import "react-datepicker/dist/react-datepicker.css";

import { 
  fileUploadS3BucketName,
  fileUploadS3RegionName,
  fileUploadS3AccessKeyId,
  fileUploadS3SecretAccessKey
} from 'constants/App';

class FileUpload extends Component {
  constructor(){
    super();
    this.state = {
      fileUrl: "",
      category: "",
      name: "",
      expiryDate: null
    }
  }

  componentDidMount() {
    let { fileDetails } = this.props;
    if(fileDetails){
      this.setState({
        name: fileDetails.name,
        fileUrl: fileDetails.url,
        category: fileDetails.category,
        submitResult: false
      })
    }
  }

  handleDialogSave = () => {
    this.setState({ submitResult: true });

    if(!this.state.name || !this.state.fileUrl)
      return;

    let dataObj = {
      name: this.state.name,
      type:"FILE",
      container: this.props.container,
      url: this.state.fileUrl
    }
    if(this.props.type === "CHECKIN"){
      dataObj._id = this.props.fileDetails._id
      this.state.category && (dataObj.category = this.state.category);
      this.props.checkInFile(dataObj);
    }
    else{
      this.state.category && (dataObj.category = this.state.category);
      this.state.expiryDate && (dataObj.expiry = this.state.expiryDate);
      this.props.saveFile(dataObj);
    }
  }

  handleDialogCancel = () => {
    this.props.handleClose();
  }

  onFilesChange =(fileArray) => {
    let file = fileArray[fileArray.length - 1];
		const config = {
			bucketName: fileUploadS3BucketName,
			region: fileUploadS3RegionName,
			dirName: "files",
			accessKeyId: fileUploadS3AccessKeyId,
			secretAccessKey: fileUploadS3SecretAccessKey
		}


		S3FileUpload
		.uploadFile(file, config)
		.then(this.onUploadSuccess)
		.catch(err => console.error(err))
  }

  onUploadSuccess = (data) => {
    this.setState({ fileUrl : data.location});
  }

  render() {
    let { categoryList } = this.props;
    return(
      <div className="file-upload-dialog">
        <Dialog 
          open={true} 
          TransitionComponent={Slide} 
          onClose={this.handleDialogCancel}
          maxWidth="sm"
          fullWidth={true}
          className="h-100"
        >
          <DialogTitle className="pb-0">
            <div className="col-10">
              <h4><b>{`${this.props.type === "CHECKIN" ? "Checkin" : "Upload"} File`}</b></h4>
            </div>
          </DialogTitle>
          <DialogContent className="d-flex h-100 overflow-hidden">
            <div className="flex-grow-1">
              <Files
                className='files-dropzone'
                onChange={this.onFilesChange}
                onError={this.onFilesError}
                accepts={['image/*']}
                multiple
                maxFiles={3}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
                style={{ cursor: "pointer"}}
              >
                <div className="profile-image-wrapper mt-3">
                  <span className="image-overlay">
                    <span className="content" data-ember-action="" data-ember-action-42="42">
                      <i className="zmdi zmdi-cloud-upload"></i>
                      <div>Upload Picture</div>
                    </span>
                  </span>
                  <Avatar
                    alt="..."
                    src={this.state.fileUrl ? this.state.fileUrl : "https://via.placeholder.com/150x150"}
                    className="avatar-size"
                  />
                </div>
                {
                  this.state.submitResult && 
                  !this.state.fileUrl && 
                  <span className="text-danger">File is mandatory</span>
                }
              </Files>
            </div>
            <div className="flex-grow-5">
              <div className="col-10">
                <TextField
                  id="name"
                  label="File Name"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  margin="normal"
                  fullWidth
                  className="mt-0"
                  required
                />
                {
                  this.state.submitResult && 
                  !this.state.name && 
                  <span className="text-danger">File name is mandatory</span>
                }
              </div>
              <div className="col-10 mt-2">
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
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogCancel} className="bg-light text-dark">
              NO
            </Button>
            <Button onClick={this.handleDialogSave} className="bg-dark text-white">
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default FileUpload;