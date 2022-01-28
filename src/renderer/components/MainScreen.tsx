import Button from './Button';

const MainScreen = () => {
  const click = () => {
    window.electron.api.send('openFile');
  };
  return (
    <>
      <div className="Title">
        <h1>Hola buen dia </h1>
      </div>
      <div className="buttonContainer">
        <Button title="Agregar Reporte de SAP FieldGlass" />
        <Button title="Agregar Reporte de Skills" disabled />
        <Button title="Descargar Reporte" disabled />
      </div>
    </>
  );
};

export default MainScreen;
