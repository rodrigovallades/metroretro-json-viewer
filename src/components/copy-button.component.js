import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';

import React from 'react';

import { generateExportText } from './parser.helpers';

export const CopyButton = ({ content, onCopy, ...props }) => {
  const textArray = generateExportText(content);

  const handleCopy = () => {
    var toClipboard = textArray.join('\n');

    copy(toClipboard, {
      debug: true,
      onCopy
    });
  };

  return (
    <Button onClick={handleCopy} startIcon={<FileCopyIcon />} {...props}>
      Copy to clipboard
    </Button>
  );
};

export default CopyButton;
