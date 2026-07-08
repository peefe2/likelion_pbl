import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLions } from './hooks/useLions';
import { useForm } from './hooks/useForm';
import Header from './components/Header';
import Footer from './components/Footer';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import './styles/style.css';

function App() {
  const { lions, status, errorMsg, fetchUsers, addLion, deleteLast, retry } = useLions();
  const { show, form, fillLoading, toggle, close, handleChange, isValid, buildLion, randomFill } = useForm();

  const sharedProps = {
    lions, status, errorMsg, fetchUsers, addLion, deleteLast, retry,
    show, form, fillLoading, toggle, close, handleChange, isValid, buildLion, randomFill,
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage {...sharedProps} />} />
        <Route path="/lions/:id" element={<DetailPage lions={lions} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
