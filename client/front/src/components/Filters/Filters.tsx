import { MDBCol, MDBRow } from 'mdbreact';
import * as React from 'react';
import { useEffect } from 'react';
import IFilter from '../../interfaces/IFilter';

export interface IFiltersProps<T> {
  filters: IFilter<T>[];
  onChangeFilter: (filterProperty: keyof T, selectedValue: string) => void;
}

const filterChangeName = (propertyFilter: string): string => {
  let nameFilter: string = '';

  if (propertyFilter === 'animalType') {
    nameFilter = 'Type';
  } else {
    nameFilter = propertyFilter.charAt(0).toUpperCase() + propertyFilter.slice(1);
  }
  return nameFilter;
};

export function Filters<T>(props: IFiltersProps<T>) {
  const { filters, onChangeFilter } = props;
  useEffect(() => {
    //console.log('in use effect on filters generic');
    //console.log(filters[3].values.length);
  }, [filters, onChangeFilter]);

  return (
    <div className="filters-list">
      {filters.map((filter) => {
        return (
          <MDBRow className="allPetsGrid" key={filter.property.toString()}>
            <MDBCol md="4">
              <span>{filterChangeName(filter.property.toString())}</span>
            </MDBCol>
            <MDBCol md="8">
              <select
                className="browser-default custom-select"
                defaultValue=""
                onChange={(event) => {
                  onChangeFilter(filter.property as any, event.target.value);
                }}
              >
                <option key="" value="">
                  Choose your {filterChangeName(filter.property.toString())}
                </option>
                {filter.values.map((value) => {
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </MDBCol>
          </MDBRow>
        );
      })}
    </div>
  );
}
