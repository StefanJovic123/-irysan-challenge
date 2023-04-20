import { Button } from 'components/ui';
import React from 'react';
import { AiOutlineStar, AiFillStar, AiOutlineEye } from 'react-icons/ai'
import { getFavorites } from 'services/localStorage';

const Actions = ({ id, onAction1, onAction2 }) => {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(id);

  return (
    <>
      <Button
        onClick={() => onAction1({ id })}
        shape="circle"
        size="sm"
        variant="twoTone"
        icon={isFavorite ? <AiFillStar color='green' /> : <AiOutlineStar />}
      />

      <Button
        onClick={() => onAction2({ id })}
        shape="circle"
        size="sm"
        variant="twoTone"
        icon={<AiOutlineEye />}
      />
    </>
  )
}

export default Actions;
