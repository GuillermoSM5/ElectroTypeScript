import { useState } from 'react';
import Button from './Button';

const MainScreen = () => {
  const [state, setState] = useState({ disableButtons: true });
  const click = () => {
    window.electron.api.send('openFile', { report: 'sap' });
  };

  const loadReportSkills = () => {
    window.electron.api.send('openFile', { report: 'skills' });
  };

  const dowloadReport = () => {
    window.electron.api.send('saveFile');
  };

  window.electron.api.receive('finishReportSap', () => {
    setState({ ...state, disableButtons: false });
  });

  window.electron.api.receive('resetData', () => {
    setState({ ...state, disableButtons: true });
  });

  return (
    <>
      <div className="Title">
        <h1>Hola buen dia </h1>
      </div>
      <div className="buttonContainer">
        <Button title="Agregar Reporte de SAP FieldGlass" onClick={click} />
        <Button
          title="Agregar Reporte de Skills"
          disabled={state.disableButtons}
          onClick={loadReportSkills}
        />
        <Button
          title="Descargar Reporte"
          disabled={state.disableButtons}
          onClick={dowloadReport}
        />
      </div>
    </>
  );
};

export default MainScreen;
