import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { saveAs } from 'file-saver';

import React from 'react';

import { generateExportText } from './parser.helpers';

const EXPORT_FILENAME = 'metroretro-export.txt';

export const DownloadButton = ({ content, ...props }) => {
  const textArray = generateExportText(content);

  const handleSave = () => {
    var blob = new Blob([textArray.join('\n')], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, EXPORT_FILENAME);
  };

  return (
    <Button onClick={handleSave} startIcon={<GetAppIcon />} {...props}>
      Download TXT
    </Button>
  );
};

export default DownloadButton;
