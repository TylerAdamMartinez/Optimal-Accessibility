import { motion } from "framer-motion";
import "./MyPosterLoadingAnimate.css";
import SyncIcon from "@mui/icons-material/Sync";

const MyPosterLoadingCard: React.FC<{ delay: number }> = ({
  delay,
}): JSX.Element => {
  return (
    <motion.div
      id="MyPosterAnimateCard"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1.0 }}
      exit={{ opacity: 0.3 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        delay: delay,
      }}
    >
      <div id="PosterImage">
        <SyncIcon
          style={{ alignSelf: "center", fontSize: "64px" }}
          className="spinning_loader"
        />
      </div>
      <div id="PosterNameSection">
        <h3>Loading..</h3>
      </div>
    </motion.div>
  );
};

export default function MyPosterLoadingAnimate() {
  return (
    <motion.div style={{ display: "flex" }}>
      <MyPosterLoadingCard delay={0.6} />
      <MyPosterLoadingCard delay={1.2} />
      <MyPosterLoadingCard delay={1.8} />
    </motion.div>
  );
}
