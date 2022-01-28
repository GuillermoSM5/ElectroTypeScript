/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
import { readFile, saveFile, reportNewSkills } from './Files/ReportSap';
const { dialog } = require('electron');

export const openFileDialog = async (window: any, report: string) => {
  const resp = await dialog.showOpenDialog({
    filters: [{ name: 'Hoja de calculo', extensions: ['xlsx'] }],
  });

  if (resp.filePaths.length === 0) {
    console.log('No se selecciono un archivo');
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    report === 'sap'
      ? readFile(resp.filePaths[0], window)
      : reportNewSkills(resp.filePaths[0], window);
  }
};

export const openSaveDialog = async (window: any) => {
  const resp = await dialog.showSaveDialog({
    defaultPath: '.xlsx',
    filters: [{ name: 'Hoja de calculo', extensions: ['xlsx'] }],
  });

  if (resp.filePath === '') {
    console.log('no guardaste ningun archivo');
  } else {
    saveFile(window, resp.filePath === undefined ? '' : resp.filePath);
  }
};
