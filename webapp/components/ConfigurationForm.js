import React, { useState } from 'react';

const ConfigurationForm = ({ onSave }) => {
  const [config, setConfig] = useState({
    mattermost_channel: '',
    imap: { host: '', port: 993, user: '', password: '' },
    smtp: { host: '', port: 465, user: '', password: '' },
  });

  const handleChange = (e, field) => {
    const { name, value } = e.target;
    if (field) {
      setConfig({ ...config, [field]: { ...config[field], [name]: value } });
    } else {
      setConfig({ ...config, [name]: value });
    }
  };

  return (
    <div>
      <h2>Add Configuration</h2>
      <input
        type="text"
        name="mattermost_channel"
        placeholder="Mattermost Channel ID"
        value={config.mattermost_channel}
        onChange={(e) => handleChange(e)}
      />
      <h3>IMAP Settings</h3>
      <input
        type="text"
        name="host"
        placeholder="IMAP Host"
        value={config.imap.host}
        onChange={(e) => handleChange(e, 'imap')}
      />
      <input
        type="number"
        name="port"
        placeholder="IMAP Port"
        value={config.imap.port}
        onChange={(e) => handleChange(e, 'imap')}
      />
      <input
        type="text"
        name="user"
        placeholder="IMAP Username"
        value={config.imap.user}
        onChange={(e) => handleChange(e, 'imap')}
      />
      <input
        type="password"
        name="password"
        placeholder="IMAP Password"
        value={config.imap.password}
        onChange={(e) => handleChange(e, 'imap')}
      />
      <h3>SMTP Settings</h3>
      <input
        type="text"
        name="host"
        placeholder="SMTP Host"
        value={config.smtp.host}
        onChange={(e) => handleChange(e, 'smtp')}
      />
      <input
        type="number"
        name="port"
        placeholder="SMTP Port"
        value={config.smtp.port}
        onChange={(e) => handleChange(e, 'smtp')}
      />
      <input
        type="text"
        name="user"
        placeholder="SMTP Username"
        value={config.smtp.user}
        onChange={(e) => handleChange(e, 'smtp')}
      />
      <input
        type="password"
        name="password"
        placeholder="SMTP Password"
        value={config.smtp.password}
        onChange={(e) => handleChange(e, 'smtp')}
      />
      <button onClick={() => onSave(config)}>Save Configuration</button>
    </div>
  );
};

export default ConfigurationForm;
