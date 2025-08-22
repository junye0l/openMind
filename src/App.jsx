import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainAnswer from '../src/pages/MainAnswer';
import './App.css';
import AnswerQuestion from './pages/AnserQuestion';
import Answer from './pages/Answer';
import AnswerList from './pages/AnswerList';
import AnswerModal from './pages/AnswerModal';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainAnswer />} />
        <Route path="/list" element={<AnswerList />} />
        <Route path="/subjects/:id" element={<AnswerQuestion />} />
        <Route path="/post/:id/answer" element={<Answer />} />
        <Route path="/modal" element={<AnswerModal />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
