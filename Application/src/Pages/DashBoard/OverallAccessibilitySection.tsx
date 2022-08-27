import "./OverallAccessibilitySection.css";
import PolarGraph from "../../Components/Graphs/PieGraph/PieGraph";
import { chartData } from "../../oaTypes";
import { motion } from "framer-motion";

interface OverallAccessibilitySectionProp {
  data: chartData;
}

function OverallAccessibilitySection(props: OverallAccessibilitySectionProp) {
  return (
    <motion.div
      id="OverallAccessibilityDiv"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
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
    </motion.div>
  );
}

export default OverallAccessibilitySection;
