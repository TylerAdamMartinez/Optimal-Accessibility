import './../App.css';
import NavBar from './../Components/NavBar.js';
//import TestImageComponent from './../Utils/TestImageComponent';
import MyPostersSection from './../Components/MyPostersSection';
import OverallAccessibilitySection from './../Components/OverallAccessibilitySection';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import AccessibilityBarGraphData from '../Components/AccessibilityBarGraphData';

function DashBoard() {
	let params = useParams();

	let [OverallAccessibilityScore, SetOverallAccessibilityScore] = useState({textRating: 5, structureRating: 5, colorRating: 5});
	useEffect(() => {
		let cookies = new Cookies();
		let Jwt = cookies.get('jwt');

		fetch(`https://localhost:7267/api/User/GetOverallAccessibilityScoreByUserId/${params.userId}`, {
			method : 'GET',
			headers : {
				"Content-Type" : "application/json",
				"accept" : "application/json",
				"Authorization" : `bearer ${Jwt}`
			}
		})
		.then((responce) => responce.json())
		.then((responseJSON) => { 
			SetOverallAccessibilityScore(responseJSON);
		})
		.catch((err) => console.error(err));
	}, [params]);

	const [Posters, SetPosters] = useState([{name: "string", data: "", accessibilityScore: {textRating: 55, structureRating: 55, colorRating: 55}}]);
	useEffect(() => {
		let cookies = new Cookies();
		let Jwt = cookies.get('jwt');

		fetch(`https://localhost:7267/api/User/GetPostersByUserId/${params.userId}`, {
			method : 'GET',
			headers : {
				"Content-Type" : "application/json",
				"accept" : "application/json",
				"Authorization" : `bearer ${Jwt}`
			}
		})
		.then((responce) => responce.json())
		.then((responseJSON) => { 
			SetPosters(responseJSON);
		})
		.catch((err) => console.error(err));
	}, [params]);

	let OverallAccessibilityBarGraphData = new AccessibilityBarGraphData(OverallAccessibilityScore);

	return (
		<>
			<NavBar />
			<div className='App'>
				{/* Uncomment component below to see it working. 
            NOTE: Console will show an error initially and then start showing text, this is not an issue with the text recognition but more with how I set up the component. */}
				{/* <TestImageComponent /> */}
				<MyPostersSection myPosters={Posters}/>
				<OverallAccessibilitySection chartData={OverallAccessibilityBarGraphData.build} />
			</div>
		</>
	);
}

export default DashBoard;