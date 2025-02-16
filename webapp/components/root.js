import React from 'react';
import { connect } from 'react-redux';
import ConfigurationForm from './ConfigurationForm';
import ConfigurationList from './ConfigurationList';
import RoutingRules from './RoutingRules';

const Root = ({ configurations }) => {
  return (
    <div>
      <h1>IMAP/SMTP Plugin</h1>
      <ConfigurationForm />
      <ConfigurationList configurations={configurations} />
      <RoutingRules />
    </div>
  );
};

const mapStateToProps = (state) => ({
  configurations: state['com.example.mattermost-imap-smtp-plugin'].configurations,
});

export default connect(mapStateToProps)(Root);
