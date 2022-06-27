import './App.css';
import NavBar from './Components/NavBar.js';
import MyPostersSection from './Components/MyPostersSection';

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <MyPostersSection />
      </div>
    </>
  );
}

export default App;
