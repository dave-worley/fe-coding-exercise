import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch'
import xml2js from 'xml2js'

const parser = xml2js.Parser({ trim: true })

import Header from '../lib/components/header';
import TwoColumn, {
  MainColumn,
  Sidebar,
} from '../lib/components/ui/layout/two-column';

export default class FDAPage extends Component {
  static propTypes = {
    content: PropTypes.object,
    error: PropTypes.any,
  };

  static async getInitialProps() {
    const res = await fetch('https://www.wired.com/feed/rss')
      .then(response => response.text())
      .then(txt => parser.parseStringPromise(txt.replace('\ufeff', '')))
      .then(json => json)
    return {
      content: res.rss.channel[0],
    };
  }

  render() {
    const { content, error } = this.props;

    if (content) {
      console.log('-----------------------------------------------------------------')
      console.dir(content)
      console.log(content)
      console.log('-----------------------------------------------------------------')
    }

    if (error) {
      return <div>It Broke</div>;
    }

    return (
      <Fragment>
        <Header />
        <TwoColumn data-article-body marginTop={ 70 }>
          <MainColumn>
            { content.item.map((entry) => {
              return (
                <p>
                  <img src={entry['media:thumbnail'][0].$.url}
                       alt={entry.title[0]} />
                  <a href={ entry.link[0] }>{ entry.title[0] }</a><br/>
                  { entry.description[0] }
                </p>
              )
            }) }
          </MainColumn>
          <Sidebar>
            <a href='https://github.com/dave-worley/fe-coding-exercise'>Frontend Coding Exercise</a>
          </Sidebar>
        </TwoColumn>
      </Fragment>
    );
  }
}
