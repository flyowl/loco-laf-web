import { Button, Icon,Drawer, Tag } from '@alifd/next';
import * as React from 'react';
const { useEffect, useState } = React;
import './1.scss'
export interface Props {
}
const Webdw = (props:Props) => {
  const { Group: TagGroup,Selectable: SelectableTag } = Tag;

  const [pay, setpay] = useState(false);
  const [selectcolor, setselectcolor] = useState('');
  const [colordata, setcolordata] = useState(["blue", "green", "orange", "red", "turquoise", "yellow"])

  const onClose = ()=>{
    setpay(false)
  }
  const clickbtn =()=>{
    setpay(true)
  }
  const clickcolor =(name:string,i:number)=>{
    setselectcolor(name)
  }
  return (
    <div>
      <Button onClick={clickbtn} className="butcls" style={{position: 'absolute',right: 0,top: '50%'}} type="primary">
          <Icon type="set" />
      </Button>
        <Drawer
          title="风格设置"
          placement="right"
          visible={pay}
          onClose={onClose}
        >
          <div>
            <h3>主题色</h3>
            <div>
                <TagGroup className={'flexcolora'}>
                  {colordata.map((color,i) => (
                    <Tag key={`p_p_${color}`} onClick={()=>clickcolor(color,i)} type="primary"   color={color}>
                      <span className={selectcolor == color? 'check-style-2':''}></span>
                    </Tag>
                  ))}
              </TagGroup>
            </div>
          </div>
        </Drawer>
    </div>
  );
};

export default Webdw;