import classes from "./styles.module.scss";
import { Employee } from "./Employee/Employee";
import { useRef, useState } from "react";
import { addEmployee, checkedAllEmployeess, delEmployee, redEmployee, uncheckedAllEmployeess } from "../../store/companySlice";
import { useAppDispatch } from "../../store/hook";

export interface IEmployeeListProps {
    list: IEmpoyee[];
}

export const ListEmployess: React.FC<IEmployeeListProps> = ({ list }) => {
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
    const [post, setPost] = useState("");
    const [nameRed, setNameRed] = useState("");
    const [postRed, setPostRed] = useState("");

    const handleRedCompany = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const redactEmployee = {
            name: nameRed,
            post: postRed,
            checked: false,
        };

        setOpenRed(false);

        setNameRed("");
        setPostRed("");

        dispatch(redEmployee(redactEmployee));
    };

    const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newEmployee = {
            id: Number(Date.now()),
            name: name,
            post: post,
            checked: false,
        };

        setOpenAdd(false);

        setName("");
        setPost("");

        dispatch(addEmployee(newEmployee));
    };

    const removeEmployee = () => {
        dispatch(delEmployee());
    };

    const allCheck = () => {
        dispatch(checkedAllEmployeess());
    };

    const unallCheck = () => {
        dispatch(uncheckedAllEmployeess());
    };

    const renderEmployee = (item: IEmpoyee) => {
        return <Employee key={item.id} employee={item} />;
    };

    const checkedEmployee = list.filter((item) => item.checked === true);

    return (
        <div className={classes.root}>
            <h4 className={classes.title}>Сотрудники</h4>
            {list.length > 1 && (
                <label className={classes.allCheck}>
                    <input ref={ref} onChange={ref.current?.checked ? unallCheck : allCheck} type='checkbox' />
                    Выделить всё
                </label>
            )}

            <div className={classes.table}>{list.map(renderEmployee)}</div>

            <button onClick={handleOpenAdd} className={classes.add}>
                {openAdd ? "Отмена" : "Добавить"}
            </button>

            {checkedEmployee.length > 0 && (
                <button onClick={removeEmployee} className={classes.del}>
                    Удалить
                </button>
            )}

            {openAdd && (
                <>
                    <form onSubmit={(e) => handleAddEmployee(e)} className={classes.formAdd}>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Имя'
                            type='text'
                        />
                        <input
                            required
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            placeholder='Должность'
                            type='text'
                        />
                        <button className={classes.addFormBtn}>Добавить</button>
                    </form>
                </>
            )}

            {checkedEmployee.length === 1 && (
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
                            value={postRed}
                            onChange={(e) => setPostRed(e.target.value)}
                            placeholder='Город'
                            type='text'
                        />
                        <button className={classes.addFormBtn}>Изменить</button>
                    </form>
                </>
            )}
        </div>
    );
};
