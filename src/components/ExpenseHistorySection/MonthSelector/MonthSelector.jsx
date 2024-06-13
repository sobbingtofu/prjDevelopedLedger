import {useDispatch, useSelector} from "react-redux";
import {StyledGridContainer, StyledArea} from "../../SharedStyleComponents";
import {StyledMonthItem} from "./MonthSelectorStyledComps";
import {SET_SELECTED_MONTH} from "../../../redux/modules/ledger";
import {getUserData} from "../../../axios/authApi";
import {useLogInSignUpStore} from "../../../zustand/logInSignUpStore";

const MonthSelectSection = () => {
  const dispatch = useDispatch();
  const shiftToLogOut = useLogInSignUpStore((state) => state.shiftToLogOut);
  const ARRAY_TO_TWELVE = Array.from({length: 12}, (v, i) => i + 1);

  const selectedMonth = useSelector((state) => {
    return state.handleLedger.selectedMonth;
  });

  const handleMonthClick = async (event) => {
    await getUserData().then((response) => {
      if (response.statusText !== "OK") {
        shiftToLogOut();
        localStorage.removeItem("accessToken");
        alert(response.data.message);
      } else {
        dispatch(SET_SELECTED_MONTH({month: event.target.id}));
      }
    });
  };

  return (
    <StyledArea>
      <StyledGridContainer>
        {ARRAY_TO_TWELVE.map((number) => {
          return (
            <StyledMonthItem
              key={number}
              id={`${number}`}
              $selectedMonth={`${selectedMonth}`}
              onClick={handleMonthClick}
            >
              {number}월
            </StyledMonthItem>
          );
        })}
      </StyledGridContainer>
    </StyledArea>
  );
};

export default MonthSelectSection;
