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
    appointmentDate?: Date;
    observations?: string;
    cellPhoneSend?: string;
    emailSend?: Boolean;
    isActive?: Boolean;
}
