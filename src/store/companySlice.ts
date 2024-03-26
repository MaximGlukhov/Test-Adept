import { createSlice } from "@reduxjs/toolkit";
import { companies } from "../constants/companies";

interface ICompany {
    id: number;
    name: string;
    address: {
        city: string;
        street: string;
        building: string;
    };
    checked: boolean;
    employess: IEmpoyee[];
}

interface IEmpoyee {
    id: number;
    name: string;
    post: string;
    checked: boolean;
}

interface companiesState {
    companies: ICompany[];
}

const initialState: companiesState = {
    companies: companies,
};

const companySlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        checkedCompany(state, action) {
            const toggledCompany = state.companies.find((company) => company.id === action.payload.id);
            if (toggledCompany) {
                toggledCompany.checked = !toggledCompany.checked;
            }
        },
        checkedAllCompanies(state) {
            state.companies.map((company) => {
                company.checked = true;
            });
        },
        uncheckedAllCompanies(state) {
            state.companies.map((company) => {
                company.checked = false;
            });
        },
        delCompany(state) {
            state.companies = state.companies.filter((item) => !item.checked);
        },
        addCompany(state, action) {
            state.companies.push({
                id: Number(Date.now()),
                name: action.payload.name,
                address: {
                    city: action.payload.address.city,
                    street: action.payload.address.street,
                    building: action.payload.address.building,
                },
                checked: false,
                employess: [],
            });
        },
        redCompany(state, action) {
            state.companies.map((com) => {
                if (com.checked === true) {
                    com.name = action.payload.name;

                    com.address.city = action.payload.address.city;
                    com.address.street = action.payload.address.street;
                    com.address.building = action.payload.address.building;
                }
            });
        },

        checkedEmployee(state, action) {
            const toggleCompany = state.companies.filter((item) => item.checked === true);
            const toggleEmp = toggleCompany.map((comp) => comp.employess.find((it) => it.id === action.payload.id));
            toggleEmp.map((item) => {
                if (item) {
                    item.checked = !item.checked;
                }
            });
        },

        checkedAllEmployeess(state) {
            state.companies.map((item) => {
                if (item.checked === true) {
                    item.employess.map((emp) => (emp.checked = true));
                }
            });
        },
        uncheckedAllEmployeess(state) {
            state.companies.map((item) => {
                if (item.checked === true) {
                    item.employess.map((emp) => (emp.checked = false));
                }
            });
        },
        delEmployee(state) {
            state.companies.map((obj) => {
                obj.employess = obj.employess.filter((item) => item.checked !== true);
            });
        },
        addEmployee(state, action) {
            state.companies.map((com) => {
                if (com.checked === true) {
                    com.employess.push({
                        name: action.payload.name,
                        post: action.payload.post,
                        id: Number(Date.now()),
                        checked: false,
                    });
                }
            });
        },
        redEmployee(state, action) {
            state.companies.map((comp) => {
                if (comp.checked === true) {
                    comp.employess.map((empl) => {
                        if (empl.checked === true) {
                            (empl.name = action.payload.name), (empl.post = action.payload.post);
                        }
                    });
                }
            });
        },
    },
});

export const {
    checkedCompany,
    checkedAllCompanies,
    uncheckedAllCompanies,
    checkedEmployee,
    delCompany,
    addCompany,
    checkedAllEmployeess,
    uncheckedAllEmployeess,
    delEmployee,
    addEmployee,
    redCompany,
    redEmployee,
} = companySlice.actions;

export default companySlice.reducer;
