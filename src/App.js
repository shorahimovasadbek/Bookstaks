import './App.css';
import HomeBook from './components/HomeBooks/HomeBook';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App-header">
      {
        localStorage.getItem('token') ? <HomeBook /> : <Register />
      }
    </div>
  );
}

export default App;
