import {Link} from "react-router-dom";
import styled from "styled-components";

export const StyledEditors = styled.div`
  width: 95%;
`;

export const StyledEditLabel = styled.p`
  margin: 10px 0px 10px 0px;
`;

export const StyledEditInput = styled.input`
  width: 95%;
  font-size: 1.1rem;
  margin: 0px 0px 10px 0px;
  padding: 1%;
`;

export const StyledBtnContainer = styled.div`
  margin: 10px 0px 10px 0px;
  width: 95%;
  display: flex;
  justify-content: start;
  gap: 1%;
`;

export const EditBtn = styled.button`
  padding: 1% 2%;
  background-color: #7fc5fa;
  border-width: 0.5pt;
  border-radius: 5px;
  &:hover {
    background-color: #60afeb;
    cursor: pointer;
  }
  font-size: 1rem;
`;

export const DeleteBtn = styled.button`
  padding: 1% 2%;
  background-color: #f29485;
  border-width: 0.5pt;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background-color: #e87866;
    cursor: pointer;
    transition: 0.3s;
  }
  font-size: 1rem;
`;

export const GoBackBtn = styled(Link)`
  padding: 1% 2%;
  background-color: #e3e3e3;
  border-style: solid;
  border-width: 0.5pt;
  border-radius: 5px;
  border-color: black;
  transition: 0.3s;
  &:hover {
    background-color: #c7c7c7;
    cursor: pointer;
    transition: 0.3s;
  }
  text-decoration: none;
  color: black;
  font-size: 1rem;
`;
