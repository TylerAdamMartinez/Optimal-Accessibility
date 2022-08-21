import "./MyPoster.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const MyPoster: React.FC<{}> = () => {
  return (
    <div
      id="MyPoster"
      className="CreatePoster"
      onClick={() => {
        alert("should prompt user to add a poster");
      }}
    >
      <div id="PosterImage">
        <AddAPhotoIcon style={{ alignSelf: "center", fontSize: "64px" }} />
      </div>
      <div id="PosterNameSection">
        <h3>Add Poster</h3>
      </div>
    </div>
  );
};

export default MyPoster;
