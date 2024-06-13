import styled from "styled-components";

export const StyledMonthItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 10px;
  transition: 0.4s;

  &:hover {
    cursor: pointer;
    background-color: ${({id, $selectedMonth}) => {
      if (id == $selectedMonth) {
        return "#6b9bef";
      } else {
        return "#abc7f7";
      }
    }};

    transition: 0.4s;
  }

  /* background-color: #e1ecff; */

  background-color: ${({id, $selectedMonth}) => {
    if (id == $selectedMonth) {
      return "#6b9bef";
    } else {
      return "#e1ecff";
    }
  }};
`;
