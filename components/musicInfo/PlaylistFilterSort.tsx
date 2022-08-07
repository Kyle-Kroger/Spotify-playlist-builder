import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { DropdownItem, DropdownMenu, StyledButton } from "../ui";

const Wrapper = styled.div`
  background-color: var(--color-grey-900);
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterBar = styled.input`
  font-size: var(--fz-md);
  background-color: var(--color-grey-600);
  width: 70%;
  color: white;
  -webkit-appearance: none;
  outline: none;
  border: 1px solid transparent;
  padding: var(--spacing-xs);

  ::placeholder {
    color: var(--sidebar-text-color);
  }
`;

const SortWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PositionedDropdown = styled(DropdownMenu)`
  position: absolute;
  top: 32px;
  right: 0;
`;

const PlaylistFilterSort = ({ filterBy, onFilter }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownItemClicked = (sortBy) => {};
  const handleFilterChange = (e) => {
    onFilter(e.target.value);
  };
  return (
    <Wrapper>
      <FilterBar
        type="text"
        placeholder="Filter Playlists..."
        value={filterBy}
        onChange={handleFilterChange}
      />
      <SortWrapper>
        <StyledButton
          state="filled"
          onClick={() => {
            setShowDropdown((prev) => !prev);
          }}
        >
          Sort
        </StyledButton>
        <AnimatePresence>
          {showDropdown && (
            <PositionedDropdown className="">
              <DropdownItem onClick={handleDropdownItemClicked}>
                Alphabetical
              </DropdownItem>
              <DropdownItem onClick={handleDropdownItemClicked}>
                Recently added
              </DropdownItem>
              <DropdownItem onClick={handleDropdownItemClicked}>
                Creator
              </DropdownItem>
            </PositionedDropdown>
          )}
        </AnimatePresence>
      </SortWrapper>
    </Wrapper>
  );
};

export default PlaylistFilterSort;
