import { Injectable } from '@nestjs/common';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "./interfaces/user.interface";
import { CreateUserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    // Get all users
    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }
    
    // Get a single User
    async getUser(userID: string): Promise<User> {
        const user = await this.userModel.findById(userID); 
        return user;
    }

    // Post a single user
    async createUser(CreateUserDTO: CreateUserDTO): Promise<User> {
        const newUSer = new this.userModel(CreateUserDTO);
        return newUSer.save();
    }

    // Delete USer
    async deleteUser(userID: string): Promise<any> {
        const deletedUser = await this.userModel.findOneAndDelete(userID);
        return deletedUser;
    }

    // Put a single user
    async updateUser(userID: string, CreateUserDTO: CreateUserDTO): Promise<User> {
        const updatedUSer = await this.userModel
                            .findByIdAndUpdate(userID, CreateUserDTO, {new: true});
        return updatedUSer;
    }

}
