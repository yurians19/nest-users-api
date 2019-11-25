import { Document } from "mongoose";

export interface User extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly rut: string;
    readonly chilenRUT: string;
    readonly gender: string;
    readonly address: string[];
    readonly phone: string;
    readonly createdAt: Date;
}