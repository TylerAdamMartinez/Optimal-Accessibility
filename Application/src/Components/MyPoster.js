import './MyPoster.css';
import DefaultImage from './missing_image.jpg';
import Popup from 'reactjs-popup';
import BarGraph from './BarGraph.js';
import { useState, useRef } from 'react';
import AccessibilityBarGraphData from './AccessibilityBarGraphData';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Cookies from 'universal-cookie';
import ConvertImageToBase64 from '../Utils/ConvertImageToBase64';
import { getImageGrid } from '../Utils/Structure';

function MyPoster(props) {
  const imgRef = useRef();
  function onImageError() {
    imgRef.current.src = DefaultImage;
  }

  let [isOpen, setIsOpen] = useState(false);
  let [isEditing, setIsEditing] = useState(false);
  let [editPosterName, setEditPosterName] = useState(props.PosterName);
  let [editPosterData, setEditPosterData] = useState(props.Data);

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

  function UpdatePosterName(event) {
    setIsEditing(false);
    event.preventDefault();
    let errorFlag = false;
    let userId = localStorage.getItem('userId');
    let cookies = new Cookies();
    let Jwt = cookies.get('jwt');

    fetch(`https://localhost:7267/api/User/UpdatePosterNameByUserId/${userId}/ByPosterName/${props.PosterName}?newPosterName=${editPosterName}`, {
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

  async function UpdatePosterData(event) {
    setIsEditing(false);
    event.preventDefault();
    let errorFlag = false;
    let userId = localStorage.getItem('userId');
    let cookies = new Cookies();
    let Jwt = cookies.get('jwt');

    async function getAccessibilityScore(poster) {
      poster = await ConvertImageToBase64(poster);
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

    let name = props.PosterName;
    let title = Math.random().toString();
    let accessibilityScore = await getAccessibilityScore(editPosterData);
    ConvertImageToBase64(editPosterData)
    .then((data) => {
      const addPosterBody = { name, title, data, accessibilityScore };

      fetch(`https://localhost:7267/api/User/UpdatePosterDataByUserId/${userId}/ByPosterName/${name}`, {
        method: 'PUT',
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
    })
    .catch((err) => {
      alert(err);
      console.error(err);
    });
  }

  function editPosterNameHandler(event) {
    setEditPosterName(event.target.value);
  }

  function editPosterDatahandler(event){
    let file = event.target.files[0];
    setEditPosterData(file);
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
              <form id='editForm' onSubmit={UpdatePosterName}>
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
            { isEditing ?
            <>
              <div id='editingPosterDataFrom'>
                <form onSubmit={UpdatePosterData}>
                  <input type='File' accept='.png, .jpg' onChange={editPosterDatahandler} />
                  <input
                    id='editPosterDataBtn'
                    type='submit'
                    value={"Submit"}
                  />
                </form>
              </div>
              <img
                id='editingPosterDataImage'
                ref={imgRef}
                onError={onImageError}
                src={`data:image/png;base64,${props.Data}`}
                alt={`Poster number ${props.Id}`}
              /> 
            </>
            :        
            <img
              ref={imgRef}
              onError={onImageError}
              src={`data:image/png;base64,${props.Data}`}
              alt={`Poster number ${props.Id}`}
            /> }
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
