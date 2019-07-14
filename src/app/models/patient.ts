// tslint:disable-next-line:no-empty-interface
export interface IPatient {
    name?: string;
    surname?: string;
    email?: string;
    cellPhone?: any;
    idCard?: any;
    civilStatus: string;
    gender: string;
    birthdate: string ;
    scholarship: string ;
    attend?: string ;
    work?: string ;
    socialSecurityNumber?: any;
    riskFactorsDiseases?: string;
    admissionDate?: any;
    egressDate?: any;
    sdss?: {
        ars?: any;
        summary?: any;
    };
}
