import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { User } from "src/model/user.schema";
import { UserService } from "../service/user.service";
import { JwtService } from '@nestjs/jwt'
import { response } from "express";

@Controller("/api/v1/user")
export class UserController {
    constructor(private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    @Post('/signup')
    async Signup(@Res() response, @Body() user: User) {
        console.log(user)
        const newUSer = await this.userService.signup(user);
        return response.status(HttpStatus.CREATED).json({
            newUSer
        })
    }

    @Post("signin")
    async Signin(@Res() response, @Body() user: User) {
        console.log(user, response);
        const token = await this.userService.signin(user, this.jwtService)
        return response.status(HttpStatus.OK).json({
            token
        })
    }
}