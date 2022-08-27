import { motion } from "framer-motion";
import "./MyFolderLoadingAnimate.css";
import SyncIcon from "@mui/icons-material/Sync";

const MyFolderLoadingCard: React.FC<{ delay: number }> = ({
  delay,
}): JSX.Element => {
  return (
    <motion.div
      className="MyFolderAnimateCard"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1.0 }}
      exit={{ opacity: 0.3 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        delay: delay,
      }}
    >
      <SyncIcon fontSize="large" className="spinning_loader" />
      <p>Loading...</p>
    </motion.div>
  );
};

export default function MyFolderLoadingAnimate() {
  return (
    <motion.div style={{ display: "flex" }}>
      <MyFolderLoadingCard delay={0.6} />
      <MyFolderLoadingCard delay={1.2} />
      <MyFolderLoadingCard delay={1.8} />
    </motion.div>
  );
}
