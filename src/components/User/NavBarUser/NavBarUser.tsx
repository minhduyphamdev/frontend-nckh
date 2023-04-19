import React, { useState, useEffect, useRef } from 'react';
import Styled from './style';
import user from '../../../assets/user.png';
import edit from '../../../assets/edit.png';
import inbox from '../../../assets/envelope.png';
import settings from '../../../assets/settings.png';
import help from '../../../assets/question.png';
import logout from '../../../assets/log-out.png';

const NavBarUser = () => {
  const [logined, setLogined] = useState(true);

  const [open, setOpen] = useState(false);

  let menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current != null) {
        if (!menuRef.current.contains(e.target)) {
          setOpen(false);
          console.log(menuRef.current);
        }
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  interface DropdownType {
    img: string;
    text: string;
  }
  function DropdownItem(props: DropdownType) {
    return (
      <Styled>
        <li className="dropdownItem">
          <img src={props.img} alt="" />
          <a>{props.text}</a>
        </li>
      </Styled>
    );
  }
  return (
    <Styled>
      <div className="container">
        <a href="/">
          <div className="container_logo">
            <img src="/assets/images/hcmus_logo.jpg" />
          </div>
        </a>
        <div>
          <ul>
            <li>
              <a href="">GIỚI THIỆU</a>
            </li>
            <li>
              <a href="">THỐNG KÊ</a>
            </li>
            <li>
              <a href="">TRANG CHỦ</a>
            </li>
            <li>
              <a href="">BÀI BÁO</a>
            </li>
          </ul>
        </div>

        {logined ? (
          <div className="menu-container" ref={menuRef}>
            <div
              className="menu-trigger"
              onClick={() => {
                setOpen(!open);
              }}>
              <div className="menu-trigger__space"></div>
              <img className="avatar" src="https://i.pravatar.cc/" />
            </div>

            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
              <h3>Lecturer</h3>
              <div className="dropdown-menu__subTitle">Website Designer</div>
              <ul style={{ display: 'flex', flexDirection: 'column' }}>
                <DropdownItem img={user} text={'Your Profile'} />
                <DropdownItem img={edit} text={'Your Article'} />
                <DropdownItem img={inbox} text={'Configuration'} />
                <DropdownItem img={settings} text={'Settings'} />
                <DropdownItem img={help} text={'Helps'} />
                <DropdownItem img={logout} text={'Logout'} />
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <ul>
              <li>
                <a href="/signin">Log In</a>
              </li>
              <li>
                <a>Register</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </Styled>
  );
};

export default NavBarUser;
