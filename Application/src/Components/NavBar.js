import './NavBar.css';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import Popup from 'reactjs-popup';
import OptimalAccessibilityLogo from './Optimal-Accessibility-Logo.png';

function NavBar() {
  function MouseOverExitSpotHandler() {
    let close_popup_menu_element = document.querySelector('#ExitSpot p');
    close_popup_menu_element.textContent = "Click here to close any popup window";
  }

  function MouseLeaveExitSpotHandler() {
    let close_popup_menu_element = document.querySelector('#ExitSpot p');
    close_popup_menu_element.textContent = "";
  }

  return (
    <div className="NavBar">
      <span></span>
      <div id="LogoBox">
        <img id="LogoImg" alt="Optimal Accessibility Logo" src={OptimalAccessibilityLogo} />
        <h1>Optimal-Accessibility</h1>
      </div>
      <span id="ExitSpot" onMouseOver={MouseOverExitSpotHandler} onMouseLeave={MouseLeaveExitSpotHandler}>
        <p></p>
      </span>
      <div id="NavItemsBox">
        <ul>
          <li>
            <Popup trigger={<HelpIcon fontSize="large"/>}>
              <div id="PopUpHelpMenuDivSection">
                <ul id="PopUpHelpMenuDiv">
                  <li id="PopUpHelpMenuDivTextField">Text</li>
                  <li id="PopUpHelpMenuDivStructureField">Structure</li>
                  <li id="PopUpHelpMenuDivColorField">Color</li>
                </ul>
              </div>
            </Popup>
          </li>
          <li><AddIcon fontSize="large"/></li>
          <li><AccountCircleIcon fontSize="large"/></li>
        </ul>
      </div>
      <span></span>
    </div>
  );
}

export default NavBar;


