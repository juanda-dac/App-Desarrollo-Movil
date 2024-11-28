export interface UserModel{
    id?: string;
    email: string;
    password?: string;
}

export interface UserStoredModel {
    token: string;
    user: UserModel;
}