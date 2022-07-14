import './../App.css';
import NavBar from './../Components/NavBar.js';
import TestImageComponent from './../Utils/TestImageComponent';
import MyPostersSection from './../Components/MyPostersSection';
import OverallAccessibilitySection from './../Components/OverallAccessibilitySection';

function DashBoard() {
	let OverallAccessibilityBarGraphData = {
		labels: ['Text', 'Structure', 'Color'],
		datasets: [
			{
				label: 'Rating Score',
				backgroundColor: ['rgba(1, 127, 1, 1)', 'rgba(100, 6, 101, 1)', 'rgba(218, 54, 74, 1)'],
				borderColor: 'rgba(51, 51, 51, 1)',
				borderWidth: 1,
				data: [65, 59, 80],
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
				<MyPostersSection />
				<OverallAccessibilitySection chartData={OverallAccessibilityBarGraphData} />
			</div>
		</>
	);
}

export default DashBoard;