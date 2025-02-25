import {useState} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Button, Layout} from 'antd';
import {Outlet} from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar.tsx";

const {Header, Content} = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <Layout className="min-h-screen">
        <Sidebar collapsed={collapsed}/>
        <Layout
            className={`transition-all duration-300`}
            style={{
              marginLeft: collapsed ? 80 : 200,
            }}
        >
          <Header className="bg-white flex items-center shadow-md sticky top-0 z-10">
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={() => setCollapsed(!collapsed)}
                className="text-[16px] w-12 h-12 !px-6 -ml-10"
            />
          </Header>
          <Content
              className="bg-white rounded-xl shadow-xl m-2 p-3 max-h-screen"
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
  );
};

export default Dashboard;
