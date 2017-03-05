import React, { PropTypes } from 'react';
import styles from './Cards.scss';
import { Link } from 'react-router';
import { Grid, Cell, Button } from 'react-mdl';

class Cards extends React.Component {

  render() {
    const { items, children, ...props } = this.props;
    return (
      <Grid {...props} className={styles.cards}>
        {items.map((item, index) =>
          <Cell col={4} key={item.title}>
            <div className={styles.cardItem}>
              <img src={item.image.path} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <Link to={item.link.url} className={styles.link}>
                <Button primary colored raised ripple >{item.link.text}</Button>
              </Link>
            </div>
          </Cell>
        )}
      </Grid>
    );
  }
}

export default Cards;
