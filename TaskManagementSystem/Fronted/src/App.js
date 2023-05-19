import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import EditProfile from './Pages/EditProfile';
import PrivateRoutes from './components/PrivateRoutes';
import Auth from './Pages/Auth';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: '2rem' } }}
      />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
