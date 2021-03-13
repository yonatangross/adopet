import * as React from 'react';

export interface ISortersProps<T> {
  object: T;
  onChangeSorter: (sortProperty: keyof T, isDescending: boolean) => void;
}

const sortChangeName = (propertySort: string): string => {
  let nameSort: string = '';
  //console.log(propertySort);
  if (propertySort === 'isAdopted') {
    return 'Adopted';
  }
  if (propertySort === 'animalType') {
    return 'Animal Type';
  } else {
    nameSort = propertySort.charAt(0).toUpperCase() + propertySort.slice(1);
  }
  return nameSort;
};

export default function Sorters<T>(props: ISortersProps<T>) {
  const { object, onChangeSorter } = props;

  return (
    <>
      <select
        id="sorters"
        className="custom-select"
        onChange={(event) => onChangeSorter(event.target.value.split('-')[0] as any, event.target.value.split('-')[1] === 'true')}
        defaultValue={'name-true'}
      >
        {Object.keys(object).map((key) => {
          if (!key || key === '_id' || key === '__v') {
          }
          return (
            <option key={`${key}-false`} value={`${key}-false`}>
              {sortChangeName(key)} Ascending
            </option>
          );
        })}
        {Object.keys(object).map((key) => {
          if (!key || key === '_id' || key === '__v' || key === 'primaryPicture') {
          }
          return (
            <option key={`${key}-true`} value={`${key}-true`}>
              {sortChangeName(key)} Descending
            </option>
          );
        })}
      </select>
    </>
  );
}
