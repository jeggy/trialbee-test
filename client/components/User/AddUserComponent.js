import React from 'react';
import { Button } from 'react-mdl';
import UserDialog from './UserDialogComponent';
import styles from './User.scss';


export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false
    };
  }

  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Button colored onClick={() => {
          this.setState({dialog: !this.state.dialog});
        }} raised ripple className={styles.whiteText} >Add new User</Button>
        <UserDialog show={this.state.dialog}
                    viewer={this.props.viewer}
                    handleState={() => {this.setState({dialog: !this.state.dialog})}}
        />
      </div>
    );
  }
}
