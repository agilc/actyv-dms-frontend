import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

class ConfirmationDialog extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({open: false});
    this.props.errorFunction();
  };
  handleRequestSuccess = () => {
    this.setState({open: false});
    this.props.successFunction();
  };

  componentWillReceiveProps= (nextProps) => {
    if(this.props.open !== nextProps.open)
      this.setState({ open: nextProps.open });
  }


  render() {
    return (
      <div>
        <Dialog open={this.state.open} TransitionComponent={Slide} onClose={this.handleRequestClose}>
          <DialogTitle>
            {this.props.heading}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} className="bg-light text-dark">
              NO
            </Button>
            <Button onClick={this.handleRequestSuccess} className="bg-dark text-white">
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmationDialog;