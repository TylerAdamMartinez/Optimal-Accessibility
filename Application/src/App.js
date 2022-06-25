import './App.css';
import NavBar from './Components/NavBar.js';
import TestImageComponent from './Utils/TestImageComponent';

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        {/* Test component so I can see the images */}
        <TestImageComponent />
      </div>
    </>
  );
}

export default App;
