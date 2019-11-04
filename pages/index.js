import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../lib/components/header';
import TwoColumn, {
  MainColumn,
  Sidebar,
} from '../lib/components/ui/layout/two-column';

export default class FDAPage extends Component {
  static propTypes = {
    content: PropTypes.any,
    error: PropTypes.any,
  };

  static async getInitialProps() {
    return {
      content: [],
    };
  }

  render() {
    const { error } = this.props;

    if (error) {
      return <div>It Broke</div>;
    }

    return (
      <Fragment>
        <Header />
        <TwoColumn data-article-body marginTop={ 70 }>
          <MainColumn>Here are things!</MainColumn>
          <Sidebar>And maybe other things?</Sidebar>
        </TwoColumn>
      </Fragment>
    );
  }
}
