import React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = styled('div')({
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  height: '40px',
  '&:hover': {
    backgroundColor: '#F1F1F1',
  },
});

const SearchInput = styled(InputBase)({
  marginLeft: '8px',
  flex: 1,
  fontSize: '16px',
  lineHeight: '24px',
  '& input': {
    padding: '10px 0px 10px 10px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
  },
});

const StyledSearchIcon = styled(SearchIcon)({
  marginLeft: '10px',
});

const PrimarySearchAppBar = () => {
  return (
    <SearchBox>
      <StyledSearchIcon />
      <SearchInput placeholder="Buscar..." />
    </SearchBox>
  );
};

export default PrimarySearchAppBar;
