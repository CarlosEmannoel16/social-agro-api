export interface InputCreateUserDTO {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    imageUrl?: string;
}

export interface OutputCreateUserDTO {
    id: string;
    name: string;
    email: string;
    token: string;
}