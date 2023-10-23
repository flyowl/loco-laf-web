import { Overlay } from '@alifd/next';
import * as React from 'react';
import './index.scss';

const { Popup } = Overlay;

const { useState, useEffect } = React;

interface BlockCardProps {
  id: string;
  title: string;
  screenshot: string;
  description: string;
}

const BlockCard = (props: BlockCardProps) => {
  const {
    id,
    title,
    description,
    screenshot = 'https://tianshu.alicdn.com/19307bb5-2881-44ad-82d3-f92e2f44aabb.png',
  } = props;

  return (
    <div className="block-card snippet" data-id={id}>
      <Popup
        v2
        trigger={
          <div className="block-card-screenshot">
            <img src={screenshot} />
          </div>
        }
        triggerType="hover"
        autoFocus={false}
      >
        <span className="overlay-demo">
          <h3> {title}</h3>
          <h6>{description}</h6>
          <img src={screenshot} />
        </span>
      </Popup>

      <span>{title}</span>
    </div>
  );
};

export default BlockCard;
