import styled from "styled-components";

export const ExpenseLabel = styled.p`
  text-align: center;
  font-weight: bolder;
  margin: 5px auto 3px auto;
`;

export const ExpenseDiagramContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 40px;
  width: 90%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  justify-content: center;
  font-style: italic;
  color: grey;

  background-color: rgb(233, 236, 239);
`;

const COLOR_ARRAY = ["#94e0a1", "#edc0f0", "#a19bf2", "#e6d5a1", "#95edcc", "#f57393", "#c497f7"];

export const ExpenseDiagramSegment = styled.div`
  height: 100%;
  width: ${({$expenseRatio}) => {
    const width = parseInt($expenseRatio) * 100;
    return `${width}%`;
  }};
  background-color: ${({$index}) => {
    return COLOR_ARRAY[$index];
  }};
`;

export const FootnoteContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40%, auto));
  justify-content: space-between;
  gap: 1%;
  width: 80%;
`;

export const FootnoteItem = styled.div`
  display: flex;
  justify-content: start;
  padding: 10px 0px;
  align-items: center;
  gap: 5%;
`;

export const FootnoteColorbox = styled.div`
  height: 12px;
  width: 12px;
  background-color: ${({$index}) => {
    return COLOR_ARRAY[$index];
  }};
`;
