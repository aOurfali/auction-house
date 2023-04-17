export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    coin: number;
    role?: UserRole;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}