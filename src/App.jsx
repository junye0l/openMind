import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainAnser from '../src/pages/MainAnswer';
import './App.css';
import AnswerQuestion from './pages/AnserQuestion';
import Answer from './pages/Answer';
import AnswerList from './pages/AnswerList';
import AnswerModal from './pages/AnswerModal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainAnser />} />
        <Route path="/list" element={<AnswerList />} />
        <Route path="/list/1" element={<AnswerQuestion />} />
        <Route path="/list/1/answer" element={<Answer />} />
        <Route path="/modal" element={<AnswerModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
