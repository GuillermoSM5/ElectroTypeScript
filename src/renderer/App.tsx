import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainScreen from './components/MainScreen';

const Hello = () => {
  window.electron.api.receive('finishReportSap', (data: string) => {
    console.log(data);
  });

  return (
    <div>
      <MainScreen />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
