import "./OverallAccessibilitySection.css";
import BarGraph from "../../Components/BarGraph";

function OverallAccessibilitySection(props) {
  return (
    <div id="OverallAccessibilityDiv">
      <div id="InnerOverallAccessibilityDiv">
        <h2>My Average Accessibility Rating</h2>
        <BarGraph chartData={props.chartData} />
      </div>
    </div>
  );
}

export default OverallAccessibilitySection;
