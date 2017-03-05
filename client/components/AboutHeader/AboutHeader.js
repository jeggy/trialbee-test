import React, { PropTypes } from 'react';
import styles from './AboutHeader.scss';


class SectionContent extends React.Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  render() {
    const { header, children, ...props } = this.props;
    return <div className={styles.card} {...props}>
      <h1>{header}</h1>
      <p>{children}</p>
    </div>;
  }
}

export default SectionContent;
