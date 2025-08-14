import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainAnswer from '../src/pages/MainAnswer';
import './App.css';
import AnswerQuestion from './pages/AnserQuestion';
import Answer from './pages/Answer';
import AnswerList from './pages/AnswerList';
import AnswerModal from './pages/AnswerModal';
import Answerpage from './components/Answerpage/Answerpage.jsx';

function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<MainAnswer />} />
        <Route path="/list" element={<AnswerList />} />
        <Route path="/list/:id" element={<AnswerQuestion />} />
        <Route path="/list/:id/answer" element={<Answer />} />
        <Route path="/modal" element={<AnswerModal />} />
      </Routes> */}
      <Answerpage />;
    </BrowserRouter>
  );
}

export default App;
