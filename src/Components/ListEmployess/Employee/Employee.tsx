import { checkedEmployee } from "../../../store/companySlice";
import { useAppDispatch } from "../../../store/hook";
import classes from "./styles.module.scss";

export interface IEmployeeProps {
    employee: IEmpoyee;
}

export const Employee = ({ employee }: IEmployeeProps) => {
    const dispatch = useAppDispatch();

    const handleCheck = () => {
        dispatch(checkedEmployee(employee));
    };

    return (
        <label className={!employee.checked ? classes.row : `${classes.row} ${classes.rowChecked}`}>
            <div className={classes.ceil}>
                <input checked={employee.checked} onChange={handleCheck} type='checkbox' />
            </div>
            <div className={classes.ceil}>{employee.name}</div>
            <div className={classes.ceil}>{employee.post}</div>
        </label>
    );
};
