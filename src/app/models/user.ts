export interface IUser {
    id?: string;
    fullName?: string;
    idCard?: string;
    username?: string;
    password?: string;
    email?: string;
    cellPhone?: number;
    speciality?: string;
    role?:
      {
        id?: string
        name?: string,
         slug?: string,
      };
    isActive?: boolean;

  }
