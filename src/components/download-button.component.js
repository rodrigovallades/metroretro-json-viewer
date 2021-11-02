import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { saveAs } from 'file-saver';

import React from 'react';

import { generateExportText } from './parser.helpers';

const EXPORT_FILENAME = 'metroretro-export.txt';

export const DownloadButton = ({ content }) => {
  const textArray = generateExportText(content);

  const handleSave = () => {
    var blob = new Blob([textArray.join('\n')], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, EXPORT_FILENAME);
  };

  return (
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button onClick={handleSave} startIcon={<GetAppIcon />}>
        Download TXT
      </Button>
    </ButtonGroup>
  );
};

export default DownloadButton;
