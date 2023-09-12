import './App.css';
import { Navbar } from './components/homepage/navbar';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
      <Navbar/>
    <AllRoutes/>
    </div>
  );
}

export default App;
