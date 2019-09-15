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

class FileUpload extends Component {
  constructor(){
    super();
    this.state = {
      fileUrl: "",
      category: ""
    }
  }

  componentDidMount() {
    let { fileDetails } = this.props;
    if(fileDetails){
      this.setState({
        name: fileDetails.name,
        fileUrl: fileDetails.url,
        category: fileDetails.category
      })
    }
  }

  handleDialogSave = () => {
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
      this.props.saveFile(dataObj);
    }
  }

  handleDialogCancel = () => {
    this.props.handleClose();
  }

  onFilesChange =(fileArray) => {
    let file = fileArray[fileArray.length - 1];
    console.log("file",file);
		// const config = {
		// 	bucketName: "actyv-task",
		// 	region: "ap-south-1",
		// 	dirName: "files",
		// 	accessKeyId: "AKIAID43U7GENKUAXTQA",
		// 	secretAccessKey: "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"
		// }
		const config = {
			bucketName: "zoko-web-facelift",
			region: "ap-south-1",
			dirName: "files",
			accessKeyId: "AKIAJWZLNMTW3WKSRNJA",
			secretAccessKey: "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"
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
      <div>
        <Dialog 
          open={true} 
          TransitionComponent={Slide} 
          onClose={this.handleDialogCancel}
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle className="pb-0">
            <div className="col-10">
              <h4><b>{`${this.props.type === "CHECKIN" ? "Checkin" : "Upload"} File`}</b></h4>
            </div>
          </DialogTitle>
          <DialogContent className="d-flex">
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
              </Files>
            </div>
            <div className="flex-grow-5">
              <div className="col-10">
                <TextField
                  id="name"
                  label="Name"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  margin="normal"
                  fullWidth
                  className="mt-0"
                />
              </div>
              <div className="col-10 mt-2">
                <InputLabel htmlFor="name-multiple">Select Admins</InputLabel>
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