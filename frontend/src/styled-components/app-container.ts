import styled from 'styled-components';

// SL - Server List
// SN - Server Name
// CI - Channel Info
// CL - Channel List
// CD - Channel Data
// UI - User Info
// RP - Right Panel

export const AppGridContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 71px 240px auto;
  grid-template-rows: 46px auto 52px;
  grid-template-areas:
    'SL SN CI'
    'SL CL CD'
    'SL UI CD';
  @media (max-width: 1200px) {
    grid-template-areas:
      'SL SN CI'
      'SL CL CD'
      'SL UI CD';
    grid-template-columns: 71px 240px auto;
  }
`;

export const FriendsContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 71px 240px auto 360px;
  grid-template-rows: 46px auto 52px;
  grid-template-areas: 
    'SL SN CI CI'
    'SL CL CD RP'
    'SL UI CD RP';
  @media (max-width: 1200px) {
    grid-template-areas:
      'SL SN CI'
      'SL CL CD'
      'SL UI CD';
    grid-template-columns: 71px 240px auto;
  }
`;
