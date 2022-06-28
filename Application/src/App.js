import './App.css';
import NavBar from './Components/NavBar.js';
import TestImageComponent from './Utils/TestImageComponent';
import MyPostersSection from './Components/MyPostersSection';

function App() {
	return (
		<>
			<NavBar />
			<div className='App'>
				{/* Uncomment component below to see it working. 
            NOTE: Console will show an error initially and then start showing text, this is not an issue with the text recognition but more with how I set up the component. */}
				{/* <TestImageComponent /> */}
				<MyPostersSection />
			</div>
		</>
	);
}

export default App;
