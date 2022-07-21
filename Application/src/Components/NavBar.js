import './NavBar.css';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import Popup from 'reactjs-popup';
import OptimalAccessibilityLogo from './Optimal-Accessibility-Logo.png';
import HelpPage from './HelpPage';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getImageGrid } from '../Utils/Structure';
import ConvertImageToBase64 from '../Utils/ConvertImageToBase64';

function NavBar(props) {
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

  function MouseOverExitSpotHandler() {
    let close_popup_menu_element = document.querySelector('#ExitSpot p');
    close_popup_menu_element.textContent = 'close popup';
  }

  function MouseLeaveExitSpotHandler() {
    let close_popup_menu_element = document.querySelector('#ExitSpot p');
    close_popup_menu_element.textContent = '';
  }

  const [name, SetPosterName] = useState('');
  const [FileData, SetPosterFileData] = useState('');
  const [loadingState, setLoadingState] = useState("submit");
  const [IsProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsProcessing(true);
    let errorFlag = false;

    let title = Math.random().toString();
  
    async function getAccessibilityScore(poster) {
      setLoadingState('Uploading image...');
      poster = await ConvertImageToBase64(poster);
      setLoadingState('Calculating accessibility score...');
      let posterGrades = await getImageGrid('data:image/png;base64,' + poster).then((score) => {
        let posterGrade = {
          textRating: Math.round(score.textGrade),
          structureRating: Math.round(score.structureGrade),
          colorRating: Math.round(score.colorGrade),
        };

        return posterGrade;
      });

      return posterGrades;
    }

    let accessibilityScore = await getAccessibilityScore(FileData);
    setLoadingState('Sending Poster...');
    ConvertImageToBase64(FileData)
      .then((data) => {
        const addPosterBody = { name, title, data, accessibilityScore };
        let userId = localStorage.getItem('userId');
        let cookies = new Cookies();
        let Jwt = cookies.get('jwt');

        setLoadingState("Sent");
        fetch(`https://localhost:7267/api/User/AddPosterByUserId/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `bearer ${Jwt}`,
          },
          body: JSON.stringify(addPosterBody),
        })
          .then((responce) => {
            if (!responce.ok) {
              errorFlag = true;
            }

            setLoadingState('Sent');
            return responce.json();
          })
          .then((responseJSON) => {
            if (errorFlag) {
              throw new Error(`${responseJSON}`);
            }
            setIsProcessing(false);
            props.addPosterCallback(name);
            setLoadingState("Submit")
          })
          .catch((err) => {
            alert(err);
            console.error(err);
          });
      })
      .catch((Error) => {
        alert(Error);
        console.error(Error);
      });
  }

  function handleNameChange(event) {
    SetPosterName(event.target.value);
  }

  function handleFileChange(event) {
    let file = event.target.files[0];
    SetPosterFileData(file);
  }

  function handleLogout() {
    localStorage.clear();
    let cookies = new Cookies();
    cookies.remove('jwt');
  }

  return (
    <div className='NavBar'>
      <span></span>
      <Link to='/dashboard'>
        <div id='LogoBox'>
          <img id='LogoImg' alt='Optimal Accessibility Logo' src={OptimalAccessibilityLogo} />
          <h1>Optimal Accessibility</h1>
        </div>
      </Link>
      <span
        id='ExitSpot'
        onMouseOver={MouseOverExitSpotHandler}
        onMouseLeave={MouseLeaveExitSpotHandler}
      >
        <p></p>
      </span>
      <div id='NavItemsBox'>
        <ul>
          <li>
            <Popup trigger={<HelpIcon fontSize='large' />}>
              <div id='PopUpHelpMenuDivSection'>
                <ul id='PopUpHelpMenuDiv'>
                  <Popup trigger={<li id='PopUpHelpMenuDivTextField'>Text</li>}>
                    <HelpPage PageName='Text' PageContent={textHelpInfo} Color={'#017F01'} />
                  </Popup>
                  <Popup trigger={<li id='PopUpHelpMenuDivStructureField'>Structure</li>}>
                    <HelpPage
                      PageName='Structure'
                      PageContent={structureHelpInfo}
                      Color={'#640665'}
                    />
                  </Popup>
                  <Popup trigger={<li id='PopUpHelpMenuDivColorField'>Color</li>}>
                    <HelpPage PageName='Color' PageContent={colorHelpInfo} Color={'#DA364A'} />
                  </Popup>
                </ul>
              </div>
            </Popup>
          </li>
          <li>
            <Popup
              trigger={
                <AddIcon
                  onClick={() => {
                    setLoadingState('Submit');
                  }}
                  fontSize='large'
                />
              }
            >
              <div id='PopUpAddMenuDivSection'>
                <div id='PopUpAddMenuDiv'>
                  <h2>New Poster</h2>
                  <form onSubmit={handleSubmit} id='PopUpAddMenuForm'>
                    <input
                      readOnly={IsProcessing}
                      placeholder='Name'
                      type='text'
                      value={name}
                      onChange={handleNameChange}
                    />
                    <input
                      disabled={IsProcessing}
                      readOnly={IsProcessing} 
                      type='File' accept='.png, .jpg' 
                      onChange={handleFileChange} 
                    />
                    <input
                      readOnly={IsProcessing}
                      type='submit'
                      value={loadingState}
                      className='PopUpAccountMenuDivbtn'
                    />
                  </form>
                </div>
              </div>
            </Popup>
          </li>
          <li>
            <Popup trigger={<AccountCircleIcon fontSize='large' />}>
              <div id='PopUpAccountpMenuDivSection'>
                <ul id='PopUpAccountMenuDiv'>
                  <Link to='/' onClick={handleLogout}>
                    <li className='PopUpAccountMenuDivbtn'>Logout</li>
                  </Link>
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
