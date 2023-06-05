import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from 'src/layouts/index';
import PortalRenderer from 'src/renderer/renderer';
// import Index from 'src/view/HomePage/index';
// import Login from 'src/view/Login/index';

import 'src/global.scss';
import FusionActionTable from './view/FusionActionTable';



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/user/login" element={<PortalRenderer  setUrl={'/user/login'}  type={'login'}/>} />
      {/* 预览使用 */}
      <Route path="/render/:schemaid/" element={<PortalRenderer type={'params'} />} />
      {/* 线上使用,用于单独展示页面，内链组件等等 */}
      <Route path="/release/:schemaid/" element={<PortalRenderer type={'releaseparams'} />} />

      <Route path="/" element={<App />}>
        <Route index element={<PortalRenderer type={'defaultmenu'} />} />
        {/* <Route path="/test3" element={<Index />} /> */}
        <Route path="/menumanger" element={<FusionActionTable />} />

        <Route path="/*" element={<PortalRenderer type={'defaultmenu'}/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('ice-container'),
);
