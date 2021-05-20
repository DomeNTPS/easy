import './App.css';
import FirstPage from '../src/pages/FirstPage'

/**
 * 
 * api 
 * - currentprice : /api/currentprice
 * - currentprice By code : /api/currentprice/:id
 * - supported-currencies" : /api/supported-currencies"
 */

function App() {
  return (
    <div>
      <FirstPage/>
    </div>
  );
}

export default App;
