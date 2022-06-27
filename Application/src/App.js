import './App.css';
import NavBar from './Components/NavBar.js';
import MyPostersSection from './Components/MyPostersSection';
import OverallAccessibilitySection from './Components/OverallAccessibilitySection';

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <MyPostersSection />
        <OverallAccessibilitySection />
      </div>
    </>
  );
}

export default App;
