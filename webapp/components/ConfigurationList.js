import React from 'react';

const ConfigurationList = ({ configurations, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Configurations</h2>
      {configurations.map((config, index) => (
        <div key={index}>
          <p>Channel: {config.mattermost_channel}</p>
          <p>IMAP: {config.imap.user}@{config.imap.host}</p>
          <p>SMTP: {config.smtp.user}@{config.smtp.host}</p>
          <button onClick={() => onEdit(index)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ConfigurationList;
