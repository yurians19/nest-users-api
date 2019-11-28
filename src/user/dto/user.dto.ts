export class CreateUserDTO {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly rut?: string;
    readonly chilenRUT?: string;
    readonly gender?: string;
    readonly address?: string[];
    readonly phone?: string;
    readonly createdAt: Date;
}