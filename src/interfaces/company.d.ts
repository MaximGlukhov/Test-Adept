interface ICompany {
    id: number;
    name: string;
    address: {
        city: string;
        street: string;
        building: string;
    };
    employess: IEmpoyee[] | [];
    checked: boolean;
}

interface IEmpoyee {
    id: number;
    name: string;
    post: string;
    checked: boolean;
}
