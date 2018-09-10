import React from 'react';

export const PersonComponent = (props) => {
  const { name, height, mass, hair_color, gender } = props.person;

  return (
    <tr>
      <td>{name}</td>
      <td>{height}</td>
      <td>{mass}</td>
      <td>{hair_color}</td>
      <td>{gender}</td>
    </tr>
  );
};
