import "./OverallAccessibilitySection.css";
import BarGraph from "../../Components/BarGraph";
import { chartData } from "../../oaTypes";

interface OverallAccessibilitySectionProp {
  data: chartData;
}

function OverallAccessibilitySection(props: OverallAccessibilitySectionProp) {
  return (
    <div id="OverallAccessibilityDiv">
      <div id="InnerOverallAccessibilityDiv">
        <h2>My Average Accessibility Rating</h2>
        <BarGraph data={props.data} />
      </div>
    </div>
  );
}

export default OverallAccessibilitySection;
