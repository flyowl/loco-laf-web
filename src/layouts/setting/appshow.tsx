import { Overlay, Grid, Loading } from '@alifd/next';
import * as React from 'react';
import './index.scss';
import { GetlistApp } from 'src/apis/menu';
const { Row, Col } = Grid;

const { Popup } = Overlay;

const { useState, useEffect } = React;

const BlockCard = () => {
  const [display, setDisplay] = useState(true);
  const [appdata, setAppdata] = useState([]);

  async function getapp() {
    const data = await GetlistApp({ limit: 9 });
    setDisplay(false);

    setAppdata(data);
  }
  const LinkTo = (item:any)=>{
    debugger
    if (item.appPath =="/"){
      window.open(item.appPath, "_blank");
      return
    }
    if (item.jump_path != null  ){
      if (item.is_link == 0){
        window.open(item.appPath + "/" + item.jump_path, "_blank");
        return
      }else{
        window.open(item.jump_path, "_blank");
        return
      }
    }else{
      window.open(item.appPath, "_blank");
    }

  }

  const renderData = (data: any) => {
    return appdata.map((item: any) => {
      return (
        <Col className="block-card-col" span="8" onClick={(e) => LinkTo(item)}>
          <img src={item.cover}></img>
          <p>{item.appName}</p>
        </Col>
      );
    });
  };

  useEffect(() => {
    getapp();
  }, []);

  return (
    <div className="block-card snippet">
         <Loading className='block-load' visible={display}>
         <Row gutter={10} wrap={true}>
        {appdata.length ? renderData(appdata) : null}
        {/* <Loading visible={display}></Loading> */}
      </Row>


         </Loading>

    </div>
  );
};

export default BlockCard;
