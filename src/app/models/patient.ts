// tslint:disable-next-line:no-empty-interface

// export interface IActData{
//     districtMunicipality?: string;
//     numberOfOfficial?: any;
//     bookNumber?: any;
//     folioNumber?: any;
//     actNumber?: any;
//     yearBook?: any;
// }
export interface ISdss {
   ars?: any;
   summary?: any;
}
export interface  IPatient {
    id?: any;
    name?: string;
    surname?: string;
    email?: string;
    cellPhone?: number;
    address?: string;
    idCard?: string;
    civilStatus?: string;
    actData?: Boolean;
    gender?: string;
    birthdate?: any;
    districtMunicipality?: string;
    numberOfOfficial?: any;
    bookNumber?: any;
    folioNumber?: any;
    actNumber?: any;
    yearBook?: any;

    scholarship?: string;
    // attend?: Boolean;
    work?: Boolean;
    worType?: string;
    whereWork?: string;
    sdss?: Boolean;
    ars?: String;
    regime?: string;
    socialSecurityNumber?: any;
    riskFactorsDiseases?: string;
    // remember complete this last attributes with following data
    admissionDate?: any; // nacio, llego
    egressDate?: any; // Salio, murio
    isActive?: Boolean;
    isTheBoss?: Boolean;
    familyBossId?: string;
}
/*export interface IPatient {
    name??: string;
    surname??: string;
    email??: string;
    cellPhone??: any;
    idCard??: any;
    civilStatus?: string;
    gender?: string;// genero
    birthdate?: string ;// fecha de nacimiento
    scholarship?: string ;// escolaridad
    attend??: string ;// asiste
    work??: string ;// trabaja
    socialSecurityNumber??: any;// numero de seguridad social
    riskFactorsDiseases??: string;
    admissionDate??: any;// fecha de ingresp
    egressDate??: any;// fecha de egreso
    sdss??: {
        ars??: any;
        summary??: any;
    };
}
*/
