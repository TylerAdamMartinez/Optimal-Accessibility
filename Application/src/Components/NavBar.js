import './NavBar.css';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import Popup from 'reactjs-popup';
import OptimalAccessibilityLogo from './Optimal-Accessibility-Logo.png';
import HelpPage from './HelpPage';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  let Lorem = 
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo. Non arcu risus quis varius quam. Posuere ac ut consequat semper. Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Tincidunt praesent semper feugiat nibh sed. Leo vel orci porta non pulvinar neque laoreet. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Ut venenatis tellus in metus. Pellentesque elit eget gravida cum sociis natoque penatibus. In vitae turpis massa sed elementum tempus egestas. Laoreet non curabitur gravida arcu ac tortor dignissim.
  Pellentesque dignissim enim sit amet venenatis. Tincidunt dui ut ornare lectus sit amet est placerat in. Rhoncus mattis rhoncus urna neque viverra justo. Tristique senectus et netus et malesuada fames. Consequat ac felis donec et odio. Dignissim suspendisse in est ante in. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Faucibus vitae aliquet nec ullamcorper sit. Magna fermentum iaculis eu non. Porttitor leo a diam sollicitudin tempor id.`;

  function MouseOverExitSpotHandler() {
    let close_popup_menu_element = document.querySelector('#ExitSpot p');
    close_popup_menu_element.textContent = "close popup";
  }

  function MouseLeaveExitSpotHandler() {
    let close_popup_menu_element = document.querySelector('#ExitSpot p');
    close_popup_menu_element.textContent = "";
  }

  const [PosterName, SetPosterName] = useState('');
  const [PosterFileData, SetPosterFileData] = useState(null);

  function handleSubmit(event) {
    alert(`PosterName="${PosterName}"\nPosterFileData="${PosterFileData}"`);
    event.preventDefault();
  }

  function handleNameChange(event) {
    SetPosterName(event.target.value)
  }

  function handleFileChange(event) {
    SetPosterFileData(event.target.value)
  }

  return (
    <div className="NavBar">
      <span></span>
      <Link to="/">
        <div id="LogoBox">
          <img id="LogoImg" alt="Optimal Accessibility Logo" src={OptimalAccessibilityLogo} />
          <h1>Optimal Accessibility</h1>
        </div>
      </Link>
      <span id="ExitSpot" onMouseOver={MouseOverExitSpotHandler} onMouseLeave={MouseLeaveExitSpotHandler}>
        <p></p>
      </span>
      <div id="NavItemsBox">
        <ul>
          <li>
            <Popup trigger={<HelpIcon fontSize="large"/>}>
              <div id="PopUpHelpMenuDivSection">
                <ul id="PopUpHelpMenuDiv">
                  <Popup trigger={<li id="PopUpHelpMenuDivTextField">Text</li>}>
                    <HelpPage PageName="Text" PageContent={Lorem} Color={"#017F01"}/>
                  </Popup>
                  <Popup trigger={<li id="PopUpHelpMenuDivStructureField">Structure</li>}>
                    <HelpPage PageName="Structure" PageContent={Lorem} Color={"#640665"}/>
                  </Popup>
                  <Popup trigger={<li id="PopUpHelpMenuDivColorField">Color</li>}>
                  <HelpPage PageName="Color" PageContent={Lorem} Color={"#DA364A"}/>
                  </Popup>
                </ul>
              </div>
            </Popup>
          </li>
          <li>
            <Popup trigger={<AddIcon fontSize="large"/>}>
              <div id="PopUpAddMenuDivSection">
                <div id='PopUpAddMenuDiv'>
                  <h2>New Poster</h2>
                  <form onSubmit={handleSubmit} id='PopUpAddMenuForm'>
                    <input placeholder="Name" type="text" value={PosterName} onChange={handleNameChange} />
                    <input placeholder="File" type="File" accept=".png, .jpg"  value={PosterFileData} onChange={handleFileChange}/>
                    <input type="submit" value="Submit" className='PopUpAccountMenuDivbtn'/>
                  </form>
                </div>
              </div>
            </Popup>
          </li>
          <li>
            <Popup trigger={<AccountCircleIcon fontSize="large"/>}>
              <div id="PopUpAccountpMenuDivSection">
                  <ul id="PopUpAccountMenuDiv">
                  <Link to="/"><li className='PopUpAccountMenuDivbtn'>Logout</li></Link>
                  </ul>
                </div>
            </Popup>
          </li>
        </ul>
      </div>
      <span></span>
    </div>
  );
}

export default NavBar;


