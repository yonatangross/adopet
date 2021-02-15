import * as React from 'react';

export interface ISortersProps<T> {
  object: T;
  onChangeSorter: (sortProperty: keyof T, isDescending: boolean) => void;
}

export default function Sorters<T>(props: ISortersProps<T>) {
  const { object, onChangeSorter } = props;
  return (
    <>
      <select
        id="sorters"
        className="custom-select"
        onChange={(event) =>
          onChangeSorter(
            event.target.value.split(',')[0] as any,
            event.target.value.split(',')[1] === 'true'
          )
        }
        defaultValue={['name', 'true']}
      >
        {Object.keys(object).map((key) => {
          if (!key || key === '_id' || key === '__v') {
            return <></>;
          }
          return (
            <option key={`${key}-true`} value={[key, 'true']}>
              sort by '{key}' descending
            </option>
          );
        })}
        {Object.keys(object).map((key) => {
          if (!key || key === '_id' || key === '__v') {
            return <></>;
          }
          return (
            <option key={`${key}-false`} value={[key, 'false']}>
              sort by '{key}' ascending
            </option>
          );
        })}
      </select>
    </>
  );
}
