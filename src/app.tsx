import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { admin } from 'src/apis/config';
import App from 'src/layouts/index';
import Index from 'src/index/index';
import PortalRenderer from 'src/renderer/renderer';
import 'src/global.scss';


ReactDOM.render(

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
