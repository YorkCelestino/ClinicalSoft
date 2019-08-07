export interface ITpatient {
    id: string;
    idTreatment: string;
    idPatient: {
        name: string,
        id: string
    };
    isActive: boolean;
}
