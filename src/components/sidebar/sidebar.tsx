import {Menu} from "antd";
import {Layout} from "antd";
import {NavLink, useLocation} from "react-router-dom";
import {FaUserPlus} from "react-icons/fa";
import {PiIdentificationBadgeBold} from "react-icons/pi";

const {Sider} = Layout;

const Sidebar = ({collapsed}: { collapsed: boolean }) => {
  const location = useLocation();

  const items = [
    {
      key: "/",
      label: <NavLink to=""></NavLink>,
    },
    {
      key: "/create-teacher",
      icon: <FaUserPlus size="24"/>,
      label: (
          <NavLink className="font-medium" to="/create-teacher">
            Create Teacher
          </NavLink>
      ),
    },
    {
      key: "/identification-teacher",
      icon: <PiIdentificationBadgeBold size={24}/>,
      label: (
          <NavLink className="font-medium" to="/identification-teacher">
            Identification
          </NavLink>
      ),
    },
  ];

  return (
      <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="h-screen fixed left-0 top-0 overflow-auto"
      >
        <div className="demo-logo-vertical"/>
        <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={items}
            className="h-full"
        />
      </Sider>
  );
};

export default Sidebar;
