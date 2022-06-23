import './NavBar.css';

function NavBar() {
  return (
    <div className="NavBar">
      <span></span>
      <div id="LogoBox">
        <img id="LogoImg" alt="Image of Optimal Accessibility Logo" src="" />
      </div>
      <span></span>
      <div id="NavItemsBox">
        <ul>
          <li>question mark</li>
          <li>add assest</li>
          <li>user logout button</li>
        </ul>
      </div>
      <span></span>
    </div>
  );
}

export default NavBar;


