import { MDBCol, MDBRow } from 'mdbreact';
import * as React from 'react';
import IFilter from '../../interfaces/IFilter';

export interface IFiltersProps<T> {
  filters: IFilter<T>[];
  onChangeFilter: (filterProperty: keyof T, selectedValue: string) => void;
}

export function Filters<T>(props: IFiltersProps<T>) {
  const { filters, onChangeFilter } = props;

  return (
    <div className="filters-list">
      {filters.map((filter) => {
        return (
          <MDBRow className="allPetsGrid" key={filter.property.toString()}>
            <MDBCol md="4">
              <span>{filter.property}</span>
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
                  Choose your {filter.property}
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
