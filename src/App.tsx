import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../src/styles/Global.css';
import router from './router';

function App() {
  return (
    <RouterProvider router={createBrowserRouter(router)}/>
  );
}

export default App;
