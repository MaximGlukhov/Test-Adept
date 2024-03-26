import classes from "./styles.module.scss";
import { useAppDispatch } from "../../../store/hook";
import { checkedCompany } from "../../../store/companySlice";

export interface ICompanyProps {
    company: ICompany;
}

export const Company: React.FC<ICompanyProps> = ({ company }) => {
    const dispatch = useAppDispatch();

    const handleCheck = () => {
        dispatch(checkedCompany(company));
    };

    if (!company) {
        return null;
    }

    return (
        <>
            <div className={!company.checked ? classes.row : `${classes.row} ${classes.rowChecked}`}>
                <div className={classes.ceil}>
                    <input checked={company.checked} onChange={handleCheck} type='checkbox' />
                </div>

                <div className={classes.ceil}>{`${company.name}`}</div>
                <div className={classes.ceil}>Количество сотрудников: {company.employess.length}&#160;чел.</div>
                <div className={classes.ceil}>
                    {`${company.address.city},`}
                    {`${company.address.street},`}
                    {`${company.address.building}.`}
                </div>
            </div>
        </>
    );
};
