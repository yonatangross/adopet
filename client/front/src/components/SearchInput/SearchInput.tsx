import { MDBCard, MDBCardBody, MDBRow } from "mdbreact";
import * as React from "react";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import './SearchInput.css';

export interface ISearchProps {
  onChangeSearchQuery: (searchQuery: string) => void;
}

export default function SearchInput(props: ISearchProps) {
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const { onChangeSearchQuery } = props;
  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  useEffect(() => {
    if (debouncedSearchQuery !== undefined) {
      onChangeSearchQuery(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, onChangeSearchQuery]);

  return (
    <MDBCard>
      <div id="inputsBack" className="header pt-3  light-blue lighten-2">
        <MDBRow className="d-flex justify-content-start">
          <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5" >Search:</h3>
        </MDBRow>
      </div>
      {/* <h3 htmlFor="search" >Search animals here!</h3> */}
      <MDBCardBody>
        <input
          id="search"
          className="form-control full-width"
          type="search"
          placeholder="Search..."
          aria-label="Search"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </MDBCardBody>
    </MDBCard>
  );
}
