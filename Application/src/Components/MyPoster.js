import './MyPoster.css';
import DefaultImage from './missing_image.jpg';
import Popup from 'reactjs-popup';
import BarGraph from './BarGraph.js';
import { useState, useRef } from 'react';
import AccessibilityBarGraphData from './AccessibilityBarGraphData';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Cookies from 'universal-cookie';

function MyPoster(props) {
  const imgRef = useRef();
  function onImageError() {
    imgRef.current.src = DefaultImage;
  }

  let [isOpen, setIsOpen] = useState(false);
  let [isEditing, setIsEditing] = useState(false);
  let [editPosterName, setEditPosterName] = useState(props.PosterName);

  function handleOpen() {
    setIsOpen(false);
  }

  function DeletePoster() {
    let errorFlag = false;
    let userId = localStorage.getItem('userId');
    let cookies = new Cookies();
    let Jwt = cookies.get('jwt');

    fetch(`https://localhost:7267/api/User/DeletePosterByUserId/${userId}/ByPosterName/${props.PosterName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `bearer ${Jwt}`,
      },
    })
    .then((responce) => {
      if (!responce.ok) {
        errorFlag = true;
        return responce.json();
      }
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
  }

  function UpdatePoster(event) {
    setIsEditing(false);
    event.preventDefault();
    let errorFlag = false;
    let userId = localStorage.getItem('userId');
    let cookies = new Cookies();
    let Jwt = cookies.get('jwt');

    fetch(`https://localhost:7267/api/User/UpdatePosterByUserId/${userId}/ByPosterName/${props.PosterName}?newPosterName=${editPosterName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `bearer ${Jwt}`,
      },
    })
    .then((responce) => {
      if (!responce.ok) {
        errorFlag = true;
        return responce.json();
      }
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
  }

  function editPosterNameHandler(event) {
    setEditPosterName(event.target.value);
  }

  let BarGraphData = new AccessibilityBarGraphData(props.AccessibilityRating);

  return (
    <Popup
      trigger={
        <div id='MyPoster'>
          <div id='PosterImage'>
            <img
              src={`data:image/png;base64,${props.Data}`}
              ref={imgRef}
              onError={onImageError}
              alt={`Poster number ${props.Id}`}
            />
          </div>
          <div id='PosterNameSection'>
            <h3>{props.PosterName}</h3>
          </div>
        </div>
      }
      open={isOpen}
      onOpen={handleOpen}
    >
      <div id='PosterPopUpMenuDiv'>
        <div className='PosterImgAndNameContainer'>
          <div id='PosterPopUpMenuPosterNameDiv'>
            { isEditing ?  
              <form id='editForm' onSubmit={UpdatePoster}>
                <input
                  id='editPosterNameInput'
                  placeholder={props.PosterName}
                  type='text'
                  value={editPosterName}
                  onChange={editPosterNameHandler} />
                <input
                  id='editPosterNameBtn'
                  type='submit'
                  value={"submit"} />
              </form> : <h3>{props.PosterName}</h3>
            }
          </div>
          <div id='PosterPopUpMenuImgDiv'>
            <img
              ref={imgRef}
              onError={onImageError}
              src={`data:image/png;base64,${props.Data}`}
              alt={`Poster number ${props.Id}`}
            />
          </div>
          <div className='PosterPopUpMenuIconContainer'>
            <DeleteForeverIcon
              className='deleteIcon'
              fontSize='large'
              onClick={DeletePoster}
            />
            <EditIcon
              className='editIcon'
              fontSize='large'
              onClick={() => {setIsEditing(!isEditing);}}
            />
          </div>
        </div>
        <div className='AccessibilityBarGraphScoreContainer'>
          <h3>Accessibility Score</h3>
          <div id='PosterPopUpMenuBarGraphDiv'>
            <BarGraph chartData={BarGraphData.build} />
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default MyPoster;
