import React from 'react';
import adoptedSticker from '../../images/adoptedSticker.png';

export const IsAdopted: React.FC<IIsAdoptedProps> = ({ isAdopted }) => {
  if (isAdopted) {
    return <img id="adopted" alt="adopted sticker" src={adoptedSticker} />;
  }
  return <></>;
};
