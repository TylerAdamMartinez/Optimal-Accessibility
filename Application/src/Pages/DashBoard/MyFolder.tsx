import "./MyFolder.css";
import FolderIcon from "@mui/icons-material/Folder";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const MyFolder: React.FC<{ folderType: string; folderName: string }> = ({
  folderType,
  folderName,
}): JSX.Element => {
  function GetFolderIcon(type: string): JSX.Element {
    if (type === "new") {
      return <CreateNewFolderIcon fontSize="large" />;
    }
    return <FolderIcon fontSize="large" />;
  }

  function GetFolderClass(type: string): string {
    if (type === "new") {
      return "MadeFolder";
    }
    return "CreateFolder";
  }

  return (
    <div className={"MyFolder " + GetFolderClass(folderType)}>
      {GetFolderIcon(folderType)}
      <p>{folderName}</p>
    </div>
  );
};

export default MyFolder;
