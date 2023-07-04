import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { admin } from 'src/apis/config';

import App from 'src/layouts/index';
import Index from 'src/index/index';

import PortalRenderer from 'src/renderer/renderer';
// import Index from 'src/view/HomePage/index';
// import Login from 'src/view/Login/index';
// import {sys_menu_init} from 'src/apis/lafapi'
import 'src/global.scss';
import FusionActionTable from './view/FusionActionTable';

// const data =  sys_menu_init()

ReactDOM.render(
  //   <Router>
  //   <Routes>
  //     <Route path="/user/login" element={<PortalRenderer setUrl={'/user/login'} type={'login'} />} />
  //     <Route path="/render/:schemaid/" element={<PortalRenderer type={'params'} />} />
  //     <Route path="/release/:schemaid/" element={<PortalRenderer type={'releaseparams'} />} />

  //     <Route path="/" element={<App />}>
  //       <Route index element={<PortalRenderer type={'defaultmenu'} />} />
  //       <Route path="/menumanger" element={<FusionActionTable />} />

  //       <Route path="/*" element={<PortalRenderer type={'defaultmenu'} />} />
  //     </Route>
  //   </Routes>
  // </Router>
  <BrowserRouter>
    <Routes>
      <Route
        path="/user/login"
        element={<PortalRenderer setUrl={'/user/login'} type={'login'} />}
      />
      {/* 预览使用 */}
      <Route path="/render/:schemaid/" element={<PortalRenderer type={'params'} />} />
      {/* 线上使用,用于单独展示页面，内链组件等等 */}
      <Route path="/release/:schemaid/" element={<PortalRenderer type={'releaseparams'} />} />
      <Route path="/menumanger" element={<FusionActionTable />} />

{/* 后台管理系统 */}
      <Route path={admin} element={<App />}>
        <Route path={admin + '/*'} element={<PortalRenderer type={'defaultmenu'} />} />
      </Route>

{/* 前台管理系统 */}
      <Route path="/" element={<Index />}>
        <Route index element={<PortalRenderer type={'defaultmenu'} />} />

        <Route path="/*" element={<PortalRenderer type={'defaultmenu'} />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('ice-container'),
);
