function NavBarLoggedIn() {
  return (
    <div style={{ display: "flex" }}>
      <ul className="nav justify-content-left" style={{ flexGrow: 1 }}>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            My trips
          </a>
        </li>
      </ul>
      <ul className="nav justify-content-right">
        <li className="nav-item">
          <a className="nav-link" href="#">
            Log out
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavBarLoggedIn;
