import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/user.dto";
const users = require('./validators/users');
const usersUpdate = require('./validators/usersUpdate');
const Joi = require('@hapi/joi');
const schema = Joi.string().alphanum();

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    // Add User: /user/create
    @Post('/')
    async createUSer(@Res() res, @Body() CreateUserDTO: CreateUserDTO) {
        try {
            const value = await users.validateAsync(CreateUserDTO);
            console.log(value);
            const user = await this.userService.createUser(value);
            res.status(HttpStatus.OK).json({
                message: 'User Successfully Created',
                user
            });
        } catch (error) {
            res.status(409).json(error.details);
        }
    }

    // Get Users /user
    // @Get('/list')
    @Get('/')
    async getUsers(@Res() res) {
        const user = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(user);
    }

    // GET single user: /user/5c9d46100e2e5c44c444b2d1
    @Get('/:value/:field?')
    async getUser(@Res() res, @Param('value') value, @Param('field') field) {
        try {
            const _value = await schema.validateAsync(value);
            const _field = await schema.validateAsync(field);
            const user = await this.userService.getUser(_value,_field);
            if (!user) throw new NotFoundException('User does not exist!');
            res.status(HttpStatus.OK).json(user);
        } catch (error) {
            res.status(404).json(error);
        }
        
    }

    // Delete user: /delete?userID=5c9d45e705ea4843c8d0e8f7
    @Delete('/')
    async deleteUser(@Res() res, @Query('userID') userID) {
        try {
            const id = await schema.validateAsync(userID);
            const userDeleted = await this.userService.deleteUser(id);
            if (!userDeleted) throw new NotFoundException('User does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'User Deleted Successfully',
                userDeleted
            });
        } catch (error) {
            if (error.status == 404)
                res.status(404).json(error.message);
            else
                res.status(409).json(error.details);
        }
        
    }

    // Update user: /update?userID=5c9d45e705ea4843c8d0e8f7
    @Put('/')
    async updateUser(@Res() res, @Body() CreateUserDTO:CreateUserDTO, @Query('userID') userID) {
        console.log(userID);
        try {
            const id = await schema.validateAsync(userID);
            const value = await usersUpdate.validateAsync(CreateUserDTO);
            const updatedUser = await this.userService.updateUser(id, value);
            if (!updatedUser) throw new NotFoundException('User does not exist!');
            return res.status(HttpStatus.OK).json({
            message: 'User Updated Successfully',
            updatedUser 
        });
        } catch (error) {
            res.status(409).json(error.details);
        }
        
    }

}
