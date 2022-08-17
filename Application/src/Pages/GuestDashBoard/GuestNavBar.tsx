import "./GuestNavBar.css";
import HelpIcon from "@mui/icons-material/Help";
import Popup from "reactjs-popup";
import HelpPage from "./../../Components/HelpPage";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import OptimalAccessibilityLogo from "./../../Images/Optimal-Accessibility-Logo.png";

function GuestNavBar(): JSX.Element {
  let textHelpInfo = `The text rating is mainly based on the readability of the text. If the text cannot be easily read by the computer, then it probably can't be easily read by a person. The size of the text, as well as the color contrast with its surroundings, are the largest factors.

If the text rating for your poster is low, the following list could help you find some issues:
- Text color vs. background color
- Text size (not too small or too big)
- Text orientation(vertical text can't be read easily)
- Spelling
`;

  let structureHelpInfo = `The structure rating uses both text and a split-up, 3x1 grid of the original image. Text size is compared with its parent section's location, whether it be top, middle, or bottom to find out if that specific text could be considered a heading or simply informative text. The final structure rating also uses the ratings from text and color to average itself out.

If the structure rating for your poster is low, the following list could help you find some issues:

- A low text rating can affect the structure
- A low color rating can affect the structure
- Large font in an area that shouldn't be used as a heading
`;

  let colorHelpInfo = `The color rating uses a 3x3 grid of the original image to find and evaluate color contrast. The color contrast is based on various colors found in the background and text of each grid section. The application uses a color contrast testing tool to figure out whether the colors are suitable to be used in close proximity to each other.

If the color rating for your poster is low, the following list could help you find some issues:

- Text color may not have enough contrast with its background
- Different colors that are in close proximity may have low contrast
`;

  const [isOpenHelpPages, setIsOpenHelpPages] = useState<boolean>(false);

  function handlePopupHelpPagesOpen() {
    setIsOpenHelpPages(true);
  }

  function handlePopupHelpPagesClose() {
    setIsOpenHelpPages(false);
  }

  function stopPropagation(event: { stopPropagation: () => void }) {
    event.stopPropagation();
  }

  const navigate = useNavigate();

  return (
    <div className="GuestNavBar">
      <div className="GuestModeTextContainer">
        <div id="NavItemsBox">
          <Link to="/guest" id="LogoBoxLink">
            <div id="LogoBox">
              <img
                id="LogoImg"
                alt="Optimal Accessibility Logo"
                src={OptimalAccessibilityLogo}
              />
            </div>
          </Link>
        </div>
        <p className="GuestModeText">You are in guest mode</p>
        <button className="CreateAccountButton" onClick={() => navigate("/")}>
          Create an Account
        </button>
        <Popup
          trigger={<HelpIcon className="HelpIcon" fontSize="large" />}
          open={isOpenHelpPages}
          onOpen={handlePopupHelpPagesOpen}
        >
          <div className="PopUpBackground" onClick={handlePopupHelpPagesClose}>
            <div
              id="PopUpHelpMenuDivSection"
              onClick={handlePopupHelpPagesClose}
            >
              <ul id="PopUpHelpMenuDiv" onClick={stopPropagation}>
                <Popup trigger={<li id="PopUpHelpMenuDivTextField">Text</li>}>
                  <div className="PopUpBackground">
                    <HelpPage
                      PageName="Text"
                      PageContent={textHelpInfo}
                      Color={"#017F01"}
                    />
                  </div>
                </Popup>
                <Popup
                  trigger={
                    <li id="PopUpHelpMenuDivStructureField">Structure</li>
                  }
                >
                  <div className="PopUpBackground">
                    <HelpPage
                      PageName="Structure"
                      PageContent={structureHelpInfo}
                      Color={"#640665"}
                    />
                  </div>
                </Popup>
                <Popup trigger={<li id="PopUpHelpMenuDivColorField">Color</li>}>
                  <div className="PopUpBackground">
                    <HelpPage
                      PageName="Color"
                      PageContent={colorHelpInfo}
                      Color={"#DA364A"}
                    />
                  </div>
                </Popup>
              </ul>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default GuestNavBar;
