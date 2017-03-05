import React from 'react';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import styles from './App.scss';
import Footer from '../Footer/FooterComponent';
import Navbar from '../Navbar/NavbarComponent';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <Navbar />
        <div className={styles.greeting}>
          <h1 className={styles.sawasdee}>Trialbee test</h1>
          <p>Fullstack & React component</p>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer viewer={this.props.viewer} />
      </div>
    );
  }
}
