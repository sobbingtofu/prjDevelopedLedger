import styled from "styled-components";

export const StyledArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  background-color: #f6ffff;
  border-radius: 15px;
  padding: 10px 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const StyledRowFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 3%;
  width: 90%;
`;

export const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  gap: 3%;
  width: 90%;
`;
