/* eslint-disable @typescript-eslint/no-explicit-any */
import xlsx from 'xlsx-js-style';
import { findGEID, findSkills } from './Utils';

let newFile = xlsx.utils.book_new();
let newData: any[];
export const readFile = (path: string, window: any) => {
  newFile = xlsx.utils.book_new();
  const sheet = xlsx.readFile(path);
  const content = sheet.Sheets.report;
  const dataSap = xlsx.utils.sheet_to_json(content);

  if (dataSap.length === 0) {
    const responseObj = {
      txt: 'Elija un archivo con el formato correspondiente',
    };

    window.webContents.send('alertWrongFormat', responseObj);

    return;
  }

  newData = dataSap.map((ref) => findGEID(ref));

  const headers = [
    [
      'GEID',
      'SOEID',
      'Apellido Paterno',
      'Apellido Materno',
      'Nombre',
      'Empresa',
      'Perfil',
      'Conocimiento / competencia',
      'Sistema / Aplicación,',
      'Nivel  (Experto / Medio / Básico)',
      'Certificado en el conocimiento (si/no)',
      'Empresa que certifica el conocimiento',
      'Administrado',
      'Status',
    ],
  ];

  const newSheet = xlsx.utils.json_to_sheet([]);
  xlsx.utils.sheet_add_aoa(newSheet, [['OFERTA - DETALLE DE CONOCIMIENTOS']], {
    origin: 'A1',
  });
  xlsx.utils.sheet_add_aoa(newSheet, [['Personal']], { origin: 'A2' });
  xlsx.utils.sheet_add_aoa(newSheet, [['Skills']], { origin: 'G2' });
  xlsx.utils.sheet_add_json(newSheet, newData, {
    origin: 'A3',
    skipHeader: true,
  });
  xlsx.utils.sheet_add_aoa(newSheet, headers, { origin: 'A3' });
  newSheet['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 13 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
    { s: { r: 1, c: 6 }, e: { r: 1, c: 13 } },
  ];

  newSheet.A1.s = {
    font: {
      name: 'Arial',
      sz: 14,
      bold: true,
      color: { rgb: '013BFF' },
    },
    alignment: {
      horizontal: 'center',
    },
  };

  newSheet.A2.s = {
    fill: {
      patternType: 'solid',
      fgColor: { rgb: '26AEE4' },
    },
    font: {
      name: 'Arial',
      sz: 14,
      bold: true,
      color: { rgb: '000000' },
    },
    alignment: {
      horizontal: 'center',
    },
    border: {
      top: { style: 'thin', color: { auto: 1 } },
      right: { style: 'thin', color: { auto: 1 } },
      bottom: { style: 'thin', color: { auto: 1 } },
      left: { style: 'thin', color: { auto: 1 } },
    },
  };

  newSheet.G2.s = {
    fill: {
      patternType: 'solid',
      fgColor: { rgb: '4456B8' },
      bgColor: { rgb: '4456B8' },
    },
    font: {
      name: 'Arial',
      sz: 14,
      bold: true,
      color: { rgb: 'FFFFFF' },
    },
    alignment: {
      horizontal: 'center',
    },
  };

  const cells = [
    'A3',
    'B3',
    'C3',
    'D3',
    'E3',
    'F3',
    'G3',
    'H3',
    'I3',
    'J3',
    'K3',
    'L3',
    'M3',
    'N3',
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cellStyle = (cell: any) => {
    newSheet[cell].s = {
      fill: {
        patternType: 'solid',
        fgColor: { rgb: '7081E0' },
      },
      font: {
        name: 'Arial',
        sz: 10,
        bold: false,
        color: { rgb: '000000' },
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        top: { style: 'thin', color: { auto: 1 } },
        right: { style: 'thin', color: { auto: 1 } },
        bottom: { style: 'thin', color: { auto: 1 } },
        left: { style: 'thin', color: { auto: 1 } },
      },
    };
  };

  cells.map((cell) => cellStyle(cell));
  xlsx.utils.book_append_sheet(newFile, newSheet, 'New Data');

  window.webContents.send('finishReportSap');
};

export const reportNewSkills = (path: string, window: any) => {
  const sheet = xlsx.readFile(path);
  const content = sheet.Sheets['SKILL oferta para Banamex '];
  const data = xlsx.utils.sheet_to_json(content);

  if (data.length === 0) {
    const responseObj = {
      txt: 'Elija un archivo con el formato correspondiente',
    };

    window.webContents.send('alertWrongFormat', responseObj);

    return;
  }

  const dataSkillReport = newData.map((element) => {
    return findSkills(element, data);
  });
  // console.log(dataSkillReport);

  window.webContents.send('finishReportSkills');
};

export const saveFile = async (window: any, path: string) => {
  if (path === '') {
    // eslint-disable-next-line no-console
    console.log('No eleigio ninguna ruta');
  } else {
    xlsx.writeFile(newFile, path);
    window.webContents.send('resetData');
  }
};
