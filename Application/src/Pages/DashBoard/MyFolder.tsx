import "./MyFolder.css";
import FolderIcon from "@mui/icons-material/Folder";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useState } from "react";

const MyFolder: React.FC<{ folderType: string; folderName: string }> = ({
  folderType,
  folderName,
}): JSX.Element => {
  const [selected, setSelected] = useState<boolean>(false);

  function GetFolderIcon(type: string): JSX.Element {
    if (type === "new") {
      return <CreateNewFolderIcon fontSize="large" />;
    }
    return <FolderIcon fontSize="large" />;
  }

  function GetFolderClass(type: string): string {
    if (type === "new") {
      return " MadeFolder";
    }
    return " CreateFolder";
  }

  function SelectFolderHandler(): void {
    if (folderType === "new") return;
    if (selected) {
      setSelected(false);
      return;
    }

    setSelected(true);
  }

  function GetFolderSelectionClass(isSelected: boolean): string {
    if (isSelected) return " selectedFolder";
    return "";
  }

  return (
    <div
      className={
        "MyFolder " +
        GetFolderClass(folderType) +
        GetFolderSelectionClass(selected)
      }
      onClick={SelectFolderHandler}
    >
      {GetFolderIcon(folderType)}
      <p>{folderName}</p>
    </div>
  );
};

export default MyFolder;
