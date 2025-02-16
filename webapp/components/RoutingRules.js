import React, { useState } from 'react';

const RoutingRules = ({ onSave }) => {
  const [rule, setRule] = useState({
    condition: 'subject',
    value: '',
    channel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRule({ ...rule, [name]: value });
  };

  return (
    <div>
      <h2>Add Routing Rule</h2>
      <select name="condition" value={rule.condition} onChange={handleChange}>
        <option value="subject">Subject</option>
        <option value="from">From</option>
      </select>
      <input
        type="text"
        name="value"
        placeholder="Value"
        value={rule.value}
        onChange={handleChange}
      />
      <input
        type="text"
        name="channel"
        placeholder="Mattermost Channel ID"
        value={rule.channel}
        onChange={handleChange}
      />
      <button onClick={() => onSave(rule)}>Save Rule</button>
    </div>
  );
};

export default RoutingRules;
