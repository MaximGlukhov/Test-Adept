import { ListCompanies } from "../ListCompanies/ListCompanies";
import { ListEmployess } from "../ListEmployess/ListEmployess";
import classes from "./container.module.scss";
import { useAppSelector } from "../../store/hook";

export const Container = () => {
    const LIST = useAppSelector((state) => state.list.companies);

    const arrEmp: Array<IEmpoyee> = [];
    const filter = LIST.filter((item) => item.checked === true);
    filter.map((item) => arrEmp.push(...item.employess));

    return (
        <div className={classes.container}>
            <ListCompanies list={LIST} />
            <ListEmployess list={arrEmp} />
        </div>
    );
};
