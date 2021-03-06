import './../App.css';
import NavBar from './../Components/NavBar.js';
import MyPostersSection from './../Components/MyPostersSection';
import OverallAccessibilitySection from './../Components/OverallAccessibilitySection';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import AccessibilityBarGraphData from '../Components/AccessibilityBarGraphData';

function DashBoard() {
	let [NewPosterAdded, SetNewPosterAdded] = useState("");
	let [OldPosterEdited, SetOldPosterEdited] = useState("");
	let [OverallAccessibilityScore, SetOverallAccessibilityScore] = useState({textRating: 5, structureRating: 5, colorRating: 5});
	useEffect(() => {
		let cookies = new Cookies();
		let Jwt = cookies.get('jwt');
		let userId = localStorage.getItem('userId');

		fetch(`https://localhost:7267/api/User/GetOverallAccessibilityScoreByUserId/${userId}`, {
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
	}, [NewPosterAdded, OldPosterEdited]);

	const [Posters, SetPosters] = useState([{name: "string", data: "", accessibilityScore: {textRating: 55, structureRating: 55, colorRating: 55}}]);
	useEffect(() => {
		let cookies = new Cookies();
		let Jwt = cookies.get('jwt');
		let userId = localStorage.getItem('userId');

		fetch(`https://localhost:7267/api/User/GetPostersByUserId/${userId}`, {
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
	}, [NewPosterAdded, OldPosterEdited]);

	function addPosterCallbackHandler(name) {
		SetNewPosterAdded(name);
	}

	function editPosterCallbackHandler(title) {
		SetOldPosterEdited(title);
	}

	let OverallAccessibilityBarGraphData = new AccessibilityBarGraphData(OverallAccessibilityScore);

	return (
		<>
			<NavBar addPosterCallback={addPosterCallbackHandler}/>
			<div className='App'>
				<MyPostersSection myPosters={Posters} editPosterCallback={editPosterCallbackHandler}/>
				<OverallAccessibilitySection chartData={OverallAccessibilityBarGraphData.build} />
			</div>
		</>
	);
}

export default DashBoard;