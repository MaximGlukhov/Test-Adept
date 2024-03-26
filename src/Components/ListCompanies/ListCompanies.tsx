import { useRef, useState } from "react";
import {
    checkedAllCompanies,
    uncheckedAllCompanies,
    delCompany,
    addCompany,
    redCompany,
} from "../../store/companySlice";
import { useAppDispatch } from "../../store/hook";
import { Company } from "./Company";
import classes from "./styles.module.scss";

export interface ICompaniesListProps {
    list: ICompany[];
}

export const ListCompanies: React.FC<ICompaniesListProps> = ({ list }) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLInputElement>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openRed, setOpenRed] = useState(false);

    const handleOpenAdd = () => {
        setOpenAdd(!openAdd);
    };

    const handleOpenRed = () => {
        setOpenRed(!openRed);
    };

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [building, setBuilding] = useState("");
    const [nameRed, setNameRed] = useState("");
    const [cityRed, setCityRed] = useState("");
    const [streetRed, setStreetRed] = useState("");
    const [buildingRed, setBuildingRed] = useState("");

    const handleAddCompany = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCompany = {
            id: Number(Date.now()),
            name: name,
            employess: [],
            address: {
                city: city,
                street: street,
                building: building,
            },
            checked: true,
        };

        setName("");
        setCity("");
        setStreet("");
        setBuilding("");

        setOpenAdd(false);

        dispatch(addCompany(newCompany));
    };

    const handleRedCompany = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const redactCompany = {
            name: nameRed,
            employess: [],
            address: {
                city: cityRed,
                street: streetRed,
                building: buildingRed,
            },
            checked: true,
        };

        setOpenRed(false);

        setNameRed("");
        setCityRed("");
        setStreetRed("");
        setBuildingRed("");

        dispatch(redCompany(redactCompany));
    };

    const allCheck = () => {
        dispatch(checkedAllCompanies());
    };

    const unallCheck = () => {
        dispatch(uncheckedAllCompanies());
    };

    const renderCompany = (item: ICompany) => {
        return <Company key={item.id} company={item} />;
    };

    const removeCompany = () => {
        dispatch(delCompany());
    };

    const checkedCompany = list.filter((item) => item.checked === true);

    return (
        <div className={classes.root}>
            <h4 className={classes.title}>Компании</h4>

            {list.length > 1 && (
                <label className={classes.allCheck}>
                    <input ref={ref} onChange={ref.current?.checked ? unallCheck : allCheck} type='checkbox' />
                    Выделить всё
                </label>
            )}

            <div className={classes.table}>{list.map(renderCompany)}</div>

            <button onClick={handleOpenAdd} className={classes.add}>
                {openAdd ? "Отмена" : "Добавить"}
            </button>

            {checkedCompany.length > 0 && (
                <>
                    <button onClick={removeCompany} className={classes.del}>
                        Удалить
                    </button>
                </>
            )}

            {checkedCompany.length === 1 && (
                <button onClick={handleOpenRed} className={classes.red}>
                    {openRed ? "Отмена" : "Изменить"}
                </button>
            )}

            {openRed && (
                <>
                    <form onSubmit={(e) => handleRedCompany(e)} className={classes.formRed}>
                        <input
                            required
                            value={nameRed}
                            onChange={(e) => setNameRed(e.target.value)}
                            placeholder='Название'
                            type='text'
                        />
                        <input
                            required
                            value={cityRed}
                            onChange={(e) => setCityRed(e.target.value)}
                            placeholder='Город'
                            type='text'
                        />
                        <input
                            required
                            value={streetRed}
                            onChange={(e) => setStreetRed(e.target.value)}
                            placeholder='Улица'
                            type='text'
                        />
                        <input
                            required
                            value={buildingRed}
                            onChange={(e) => setBuildingRed(e.target.value)}
                            placeholder='Дом'
                            type='text'
                        />
                        <button className={classes.addFormBtn}>Изменить</button>
                    </form>
                </>
            )}

            {openAdd && (
                <>
                    <form onSubmit={(e) => handleAddCompany(e)} className={classes.formAdd}>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Название'
                            type='text'
                        />
                        <input
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='Город'
                            type='text'
                        />
                        <input
                            required
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder='Улица'
                            type='text'
                        />
                        <input
                            required
                            value={building}
                            onChange={(e) => setBuilding(e.target.value)}
                            placeholder='Дом'
                            type='text'
                        />
                        <button className={classes.addFormBtn}>Добавить</button>
                    </form>
                </>
            )}
        </div>
    );
};
