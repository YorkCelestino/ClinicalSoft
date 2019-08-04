export interface IAppoinment {
    id?: string;
    idUser?: {
        id?: string
        fullName?: string;
    };
    idPatient?: {
        id?: string
        name?: string
    };
    appointmentDate?: any;
    observations?: string;
    cellPhoneSend?: string;
    emailSend?: string;
    isActive?: Boolean;
}
