import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';

import React from 'react';

import { generateExportText } from './parser.helpers';

export const CopyButton = ({ content, onCopy, ...props }) => {
  const textArray = generateExportText(content);

  const handleCopy = () => {
    const toClipboard = textArray.join('\n');
    const copied = copy(toClipboard);

    if (copied) onCopy();
  };

  return (
    <Button onClick={handleCopy} startIcon={<FileCopyIcon />} {...props}>
      Copy to clipboard
    </Button>
  );
};

export default CopyButton;
