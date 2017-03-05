import React, { PropTypes } from 'react';
import AboutHeader from '../AboutHeader/AboutHeader';
import Cards from '../Cards/Cards';

export default class About extends React.Component {
  constructor(props){
    super(props);
    let self = this;
    this.state = {
      items: [],
      about: ''
    };

    fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
                  site{
                    about
                    cards{
                      id
                      title
                      image{
                        path
                        alt
                      }
                      link{
                        url
                        text
                      }
                      text
                    }
                  }
                }`,}),
      credentials: 'include',
    }).then(function (res) {
      res.json().then(function (json) {
        self.setState({
          items: json.data.site.cards,
          about: json.data.site.about
        });
      });
    });
  }
  render() {
    return <div>
      <AboutHeader header="About Trialbee">
        {this.state.about}
      </AboutHeader>
      <Cards items={this.state.items}/>
    </div>;
  }
}
