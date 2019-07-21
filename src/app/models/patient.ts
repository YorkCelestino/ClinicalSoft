// tslint:disable-next-line:no-empty-interface
export interface IPatient {
    name?: string;
    surname?: string;
    email?: string;
    cellPhone?: any;
    idCard?: any;
    civilStatus: string;
    gender: string;// genero
    birthdate: string ;// fecha de nacimiento
    scholarship: string ;// escolaridad
    attend?: string ;// asiste
    work?: string ;// trabaja
    socialSecurityNumber?: any;// numero de seguridad social
    riskFactorsDiseases?: string;
    admissionDate?: any;// fecha de ingresp
    egressDate?: any;// fecha de egreso
    sdss?: {
        ars?: any;
        summary?: any;
    };
}
