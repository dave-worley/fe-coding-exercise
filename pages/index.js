import { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch'
import xml2js from 'xml2js'
import styled from 'react-emotion'

const parser = xml2js.Parser({ trim: true })

import Header from '../lib/components/header';
import TwoColumn, {
  MainColumn,
  Sidebar,
} from '../lib/components/ui/layout/two-column';

const RSSItem = styled('div')`
  margin: 1.5rem 0 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dotted #ccc;
  a {
    font-size: 200%;
    font-weight: 900;
  }
`
const SmallText = styled('div')`
  font-size: 90%;
  color: #444;
  line-height: 1rem;
`

export default class FDAPage extends Component {
  static propTypes = {
    content: PropTypes.object,
    error: PropTypes.any,
  };

  static async getInitialProps() {
    let res, err;
    try {
      res = await fetch('https://www.bonappetit.com/feed/rss')
        .then(response => response.text())
        .then(txt => parser.parseStringPromise(txt))
        .then(json => json)
    } catch (e) {
      err = e
    }

    return {
      content: res ? res.rss.channel[0] : res,
      error: err
    };
  }

  render() {
    const { content, error } = this.props;

    if (error) {
      return <div>It Broke</div>;
    }

    return (
      <Fragment>
        <Header />
        <TwoColumn data-article-body>
          <MainColumn>
            { content.item.map((entry, i) => {
              return (
                <RSSItem key={i}>
                  <a href={ entry.link[0] }><img src={entry['media:thumbnail'][0].$.url}
                                                 alt={entry.title[0]} /></a>
                  <a href={ entry.link[0] }>{ entry.title[0] }</a><br/>
                  <SmallText>{ entry.description[0] }</SmallText>
                </RSSItem>
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
