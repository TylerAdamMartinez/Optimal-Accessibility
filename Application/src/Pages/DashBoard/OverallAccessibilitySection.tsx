import "./OverallAccessibilitySection.css";
import PolarGraph from "../../Components/PieGraph";
import { chartData } from "../../oaTypes";

interface OverallAccessibilitySectionProp {
  data: chartData;
}

function OverallAccessibilitySection(props: OverallAccessibilitySectionProp) {
  return (
    <div id="OverallAccessibilityDiv">
      <div id="InnerOverallAccessibilityDiv">
        <h2>My Average Accessibility Rating</h2>
        <PolarGraph data={props.data} />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
          obcaecati dolorum eius nam. Totam nesciunt praesentium quia maxime
          perferendis consectetur saepe tenetur, repellendus, impedit
          reprehenderit dolores illo deleniti soluta ipsam.
        </p>
      </div>
    </div>
  );
}

export default OverallAccessibilitySection;
