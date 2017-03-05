import React from 'react';
import styles from './Page.scss';

export default class Page extends React.Component {
  static propTypes = {
    children: React.PropTypes.any.isRequired,
    heading: React.PropTypes.string.isRequired,
    headingRight: React.PropTypes.any,
    headingLeft: React.PropTypes.any
  };

  render() {
    return (
      <div>
        <h1 className={styles.heading}>
          {this.props.heading}&nbsp;&nbsp;
          <span>{this.props.headingLeft}</span>
          <div className={styles.right}>{this.props.headingRight}</div>
        </h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
