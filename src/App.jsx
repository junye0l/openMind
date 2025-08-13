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
    <>
      <Answerpage />;
    </>
  );
}

export default App;
