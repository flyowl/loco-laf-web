import md5 from 'js-md5';
import { openNotification } from 'src/utils/index';
import { ClearToken,SetToken } from './localStorageInfo';
import service from './request';

// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate()

export const LoginApi = async (data: any) => {
  const url = `/api/login/`;
  const pass = md5(data.password);
  const res = await service
    .post(url, {
      username: data.username,
      password: pass,
    })
    .then((res) => {
      if (res.code == 2000) {
        const auth = res.data.access;
        SetToken(auth);
        openNotification('success', '登入成功');
        window.location.href = "/"
      } else {
        openNotification('error', res.data.msg);
      }
    });
};

export const Logout = async () => {
  const url = `/api/logout/`;
  const res = await service.post(url).then((res) => {
    const str = JSON.stringify(res);
    ClearToken();
    openNotification('success', '退出成功');

    // navigate('/user/login')


  });
};
