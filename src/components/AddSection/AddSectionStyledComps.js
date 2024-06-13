import styled from "styled-components";

export const StyledAddItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const StyledLabel = styled.p`
  margin: 5px 0px 7px 0px;
  font-size: 0.95rem;
`;

export const StyledInput = styled.input`
  border: solid;
  border-width: 0.5pt;
  border-color: grey;
  border-radius: 5px;
  padding: 3px 8px;
  width: 90%;
  font-size: 1.05rem;
  margin: 0px 0px 8px 0px;
`;

export const SaveButton = styled.button`
  border: solid;
  border-width: 0.5pt;
  border-color: grey;
  border-radius: 5px;
  padding: 3px 8px;
  width: 10%;
  height: 75%;
  font-size: 1.05rem;
  margin: 0px 0px 8px 0px;
  background-color: #d0f5df;
  transition: 0.3s;
  &:hover {
    background: #91ebb6;
    transition: 0.3s;
  }
`;
