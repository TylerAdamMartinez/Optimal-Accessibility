import './NavBar.css';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import OptimalAccessibilityLogo from './Optimal-Accessibility-Logo.png';

function NavBar() {
  return (
    <div className="NavBar">
      <span></span>
      <div id="LogoBox">
        <img id="LogoImg" alt="Optimal Accessibility Logo" src={OptimalAccessibilityLogo} />
        <h1>Optimal-Accessibility</h1>
      </div>
      <span></span>
      <div id="NavItemsBox">
        <ul>
          <li><HelpIcon fontSize="large"/></li>
          <li><AddIcon fontSize="large"/></li>
          <li><AccountCircleIcon fontSize="large"/></li>
        </ul>
      </div>
      <span></span>
    </div>
  );
}

export default NavBar;


