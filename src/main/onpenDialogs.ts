/* eslint-disable import/newline-after-import */
import { readFile } from './Files/ReportSap';
const { dialog } = require('electron');

export const openFileDialog = async (window: any) => {
  const resp = await dialog.showOpenDialog({
    filters: [{ name: 'Hoja de calculo', extensions: ['xlsx'] }],
  });

  if (resp.filePaths.length === 0) {
    console.log('No se selecciono un archivo');
  } else {
    readFile(resp.filePaths[0], window);
    window.webContents.send('finishReportSap', { data: 'Modal Abierto' });
  }
};

export const openSaveDialog = async () => {
  const resp = await dialog.showSaveDialog({
    defaultPath: '.xlsx',
    filters: [{ name: 'Hoja de calculo', extensions: ['xlsx'] }],
  });

  if (resp.filePath === '') {
    console.log('no guardaste ningun archivo');
  } else {
    // console.log(resp);
    // xlsx.writeFile(newFile, resp.filePath);
    // window.webContents.send('resetData');
  }
};
