import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/scss/styles.scss";
import "./Navbar.css";
import "./Navbar.scss";
import { NavLink,Link } from "react-router-dom";
import { route } from "./NavbarData";

const RenderSubMenu = (item, i) => {
  const { name, icon, subNav } = item.item;
  return (
    <Menu key={i} iconShape="circle">
      <SubMenu
        //    suffix={<span className="badge yellow">3</span>}
        title={name}
        icon={icon}
      >
        {subNav.length !== 0 && (
          <>
            {subNav.map((subNavitem,i) => {
              return (
                <MenuItem key={i} >
                  <NavLink className="nav-link" to={subNavitem.path}>
                    {subNavitem.name}
                  </NavLink>{" "}
                </MenuItem>
              );
            })}
          </>
        )}
      </SubMenu>
    </Menu>
  );
};
const RenderMenu =(item,i)=>{
  const {name,icon,path}=item.item
  return(
    <Menu key={i}  iconShape="circle">
    <MenuItem icon={icon}>
      {" "}
      <NavLink className="nav-link" to={path}>
        {name}
      </NavLink>{" "}
    </MenuItem>
  </Menu>
  )
}
const RenderNavbar = ({ item, i }) => {
  return (
    <div key={i}>
    {item.subNav.length !== 0 ? (
    <RenderSubMenu item={item} />
  ) : (
   <RenderMenu  item={item}/>
  )}
  </div>
  )
};
const NavBar = ({ rtl, toggled, handleToggleSidebar, children },i) => {
  return (
    <React.Fragment key={i}>
      <ProSidebar
        image={false}
        rtl={rtl}
        collapsed={false}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
        className={"pro-sidebar top"}
      >
        <SidebarHeader>
          <div
            className="heading"
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Comsats IMS
          </div>
        </SidebarHeader>

        <SidebarContent>
          {route.map((item, i) => {
            return <RenderNavbar i={i} item={item} />;
          })}
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper heading"
            style={{
              padding: "20px 24px",
            }}
          >
          <a href='https://jawad606.github.io/personal-portfolio' target='_blank'> Codex Developers</a>    
          </div>
        </SidebarFooter>
      </ProSidebar>
      <main>{children}</main>
    </React.Fragment>
  );
};

export default NavBar;
