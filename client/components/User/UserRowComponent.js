import React from 'react';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button, Checkbox, FABButton, Icon } from 'react-mdl';
import UserDialog from './UserDialogComponent';
import * as Relay from 'react-relay';

// NOT USED: DELETE THIS FILE

export default Relay.createContainer(class UserRowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
    selected: React.PropTypes.bool.isRequired,
    handleSelected: React.PropTypes.func.isRequired
  };

  toggleDialog(id){
    // ;
  }



  toggleChecked(id){

    // this.props.relay.setVariables({
    //   age: 40
    // });
    // let test = this.state.selected;
    // let count = this.state.count;
    // if(test[id]){
    //   test[id] = null;
    //   test.count--;
    // }else{
    //   test[id] = id;
    //   test.count++;
    // }
    // this.setState({selected: test});
    // console.log('Selected');
  }

  render() {
    return (

      <div>
        <Checkbox ripple={true}
                  label={(
                    <Button colored onClick={() => this.setState({show: !this.state.show})} >
                      {this.props.user.name} ({this.props.user.age})
                    </Button>)}
                  onChange={() => {this.props.handleSelected(this.props.user._id)}}
                  checked={this.props.selected}  />

        <UserDialog show={this.state.show} viewer={this.props.viewer}
                    handleState={(state) => {this.setState({show: state});}} user={this.props.user} />
      </div>


    );
  }
}, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        _id
        name
        address
        email
        age
      }
    `
  },
});
