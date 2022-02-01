import { useState } from 'react';
import Button from './Button';

const MainScreen = () => {
  const [state, setState] = useState({
    disableButtons: true,
    errorFormat: false,
  });
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
    setState({ ...state, disableButtons: false, errorFormat: false });
  });

  window.electron.api.receive('finishReportSkills', () => {
    setState({ ...state, disableButtons: false, errorFormat: false });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.electron.api.receive('alertWrongFormat', (txt: any) => {
    setState({ ...state, errorFormat: true });
  });

  window.electron.api.receive('resetData', () => {
    setState({ ...state, disableButtons: true });
  });

  return (
    <>
      <div className="Title">
        <h1>Hola buen dia </h1>
      </div>
      <div className="content">
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
        {state.errorFormat && (
          <div className="errorAlert">
            Elija un archivo con el formato correspondiente
          </div>
        )}
      </div>
    </>
  );
};

export default MainScreen;
