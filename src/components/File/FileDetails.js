import React, {Component} from 'react';
import {
  TextField,
  Input,
  Button
} from "@material-ui/core";

let metadata = [
  {
    key: "new",
    value: "Value"
  },
  {
    key: "new",
    value: "Value"
  },
  {
    key: "new",
    value: "Value"
  }
]

class FileDetails extends Component {
  constructor(){
    super();
    this.state = {
      name: "",
      description: ""
    }
  }

  componentDidMount(){
    this.setState({
      name: this.props.file.name
    });
  }

  render() {
    let { url } = this.props.file;
    return (
      <div className="bg-white file-details-wrapper d-flex">
        <div className="col-6">
          <img className="w-100 pt-4" src={url}></img>
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
          <div>
            <h5 className="p-3">Metadata</h5>
              {
                metadata.map(item => 
                  <div className="d-flex">
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
                      value={this.state.key}
                      onChange={event =>
                        this.setState({ key: event.target.value })
                      }
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      placeholder="Value"
                      value={this.state.value}
                      onChange={event =>
                        this.setState({ value: event.target.value })
                      }
                    />
                  </div>
                  <div className="col-6">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      className="jr-btn text-white"
                      // onClick={this.createChatProperty}
                    >
                      Add
                    </Button>
                  </div>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FileDetails;