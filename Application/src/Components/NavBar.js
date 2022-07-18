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

function NavBar() {
  let Lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo. Non arcu risus quis varius quam. Posuere ac ut consequat semper. Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Tincidunt praesent semper feugiat nibh sed. Leo vel orci porta non pulvinar neque laoreet. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Ut venenatis tellus in metus. Pellentesque elit eget gravida cum sociis natoque penatibus. In vitae turpis massa sed elementum tempus egestas. Laoreet non curabitur gravida arcu ac tortor dignissim.
  Pellentesque dignissim enim sit amet venenatis. Tincidunt dui ut ornare lectus sit amet est placerat in. Rhoncus mattis rhoncus urna neque viverra justo. Tristique senectus et netus et malesuada fames. Consequat ac felis donec et odio. Dignissim suspendisse in est ante in. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Faucibus vitae aliquet nec ullamcorper sit. Magna fermentum iaculis eu non. Porttitor leo a diam sollicitudin tempor id.`;

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
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    let errorFlag = false;

    let title = Math.random().toString();

    async function getAccessibilityScore(poster) {
      setLoading(true);
      poster = await ConvertImageToBase64(poster);
      let posterGrades = await getImageGrid('data:image/png;base64,' + poster).then((score) => {
        setLoading(false);
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

    ConvertImageToBase64(FileData)
      .then((data) => {
        const addPosterBody = { name, title, data, accessibilityScore };
        let userId = localStorage.getItem('userId');
        let cookies = new Cookies();
        let Jwt = cookies.get('jwt');

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
            return responce.json();
          })
          .then((responseJSON) => {
            if (errorFlag) {
              throw new Error(`${responseJSON}`);
            }
            window.location.reload(false);
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

  function ConvertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onLoad = () => {
        resolve(fileReader.result);
      };

      fileReader.onloadend = () => {
        if (fileReader.result != null) {
          resolve(fileReader.result.split(',')[1]);
        } else {
          reject(new Error(`fileReader.result is null`));
        }
      };

      fileReader.onError = (err) => {
        console.error(err);
        reject(err);
      };
    });
  }

  function handleLogout() {
    localStorage.clear();
    let cookies = new Cookies();
    cookies.remove('jwt');
  }

  return (
    <div className='NavBar'>
      <span></span>
      <Link to='/'>
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
                    <HelpPage PageName='Text' PageContent={Lorem} Color={'#017F01'} />
                  </Popup>
                  <Popup trigger={<li id='PopUpHelpMenuDivStructureField'>Structure</li>}>
                    <HelpPage PageName='Structure' PageContent={Lorem} Color={'#640665'} />
                  </Popup>
                  <Popup trigger={<li id='PopUpHelpMenuDivColorField'>Color</li>}>
                    <HelpPage PageName='Color' PageContent={Lorem} Color={'#DA364A'} />
                  </Popup>
                </ul>
              </div>
            </Popup>
          </li>
          <li>
            <Popup trigger={<AddIcon fontSize='large' />}>
              <div id='PopUpAddMenuDivSection'>
                <div id='PopUpAddMenuDiv'>
                  <h2>New Poster</h2>
                  <form onSubmit={handleSubmit} id='PopUpAddMenuForm'>
                    {/* Either remove before finished or make it look nice, would be nice to show that we are loading */}
                    {loading ? <h3>Loading...</h3> : null}
                    <input
                      placeholder='Name'
                      type='text'
                      value={name}
                      onChange={handleNameChange}
                    />
                    <input type='File' accept='.png, .jpg' onChange={handleFileChange} />
                    <input type='submit' value='Submit' className='PopUpAccountMenuDivbtn' />
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
