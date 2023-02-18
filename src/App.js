import './custom.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='products/:productId' element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
