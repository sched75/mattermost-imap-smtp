import React from 'react';

const AttachmentViewer = ({ attachments }) => {
  return (
    <div>
      <h3>Attachments</h3>
      {attachments.map((attachment, index) => (
        <div key={index}>
          <a href={attachment.url} target="_blank" rel="noopener noreferrer">
            {attachment.filename}
          </a>
        </div>
      ))}
    </div>
  );
};

export default AttachmentViewer;
