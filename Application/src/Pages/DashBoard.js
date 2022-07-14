import './../App.css';
import NavBar from './../Components/NavBar.js';
import TestImageComponent from './../Utils/TestImageComponent';
import MyPostersSection from './../Components/MyPostersSection';
import OverallAccessibilitySection from './../Components/OverallAccessibilitySection';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function DashBoard() {
	let params = useParams();
	let Jwt = localStorage.getItem('jwt');

	let [OverallAccessibilityScore, SetOverallAccessibilityScore] = useState({textRating: 5, structureRating: 5, colorRating: 5});
	useEffect(() => {
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
	}, [Jwt, params]);

	const [Posters, SetPosters] = useState([{name: "string", data: "", accessibilityScore: {textRating: 55, structureRating: 55, colorRating: 55}}]);
	useEffect(() => {
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
	}, [Jwt, params]);

	let OverallAccessibilityBarGraphData = {
		labels: ['Text', 'Structure', 'Color'],
		datasets: [
			{
				label: 'Rating Score',
				backgroundColor: ['rgba(1, 127, 1, 1)', 'rgba(100, 6, 101, 1)', 'rgba(218, 54, 74, 1)'],
				borderColor: 'rgba(51, 51, 51, 1)',
				borderWidth: 1,
				data: [ OverallAccessibilityScore.textRating, OverallAccessibilityScore.structureRating, OverallAccessibilityScore.colorRating],
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						yAxes: {
							min: 0,
							max: 100,
						},
					},
				},
			},
		],
	};

	return (
		<>
			<NavBar />
			<div className='App'>
				{/* Uncomment component below to see it working. 
            NOTE: Console will show an error initially and then start showing text, this is not an issue with the text recognition but more with how I set up the component. */}
				{/* <TestImageComponent /> */}
				<MyPostersSection myPosters={Posters}/>
				<OverallAccessibilitySection chartData={OverallAccessibilityBarGraphData} />
			</div>
		</>
	);
}

export default DashBoard;