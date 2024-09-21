/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!name || !email || !password) {
      throw new HttpException(
        {
          success: false,
          message: 'Please provide valid input',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Define the regex pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the regex pattern
    if (!emailRegex.test(email)) {
      throw new HttpException(
        {
          success: false,
          message: 'Invalid email format',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const duplicate_user = await this.authService.findOne({ email });

    if (duplicate_user) {
      throw new HttpException(
        {
          success: false,
          message: 'Email already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Check if the password matches the regex pattern
    if (!passwordRegex.test(password)) {
      throw new HttpException(
        {
          success: false,
          message:
            'Invalid password format. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(password.toString(), 12);

      const user = await this.authService.register({
        name,
        email,
        password: hashedPassword,
      });

      const { password: hashed, ...result } = user;

      return {
        success: true,
        message: 'User registered successfully',
        data: result,
      };
    } catch (error) {
      console.log('error', error);
      if (error.driverError.errno === '1062') {
        // mysql unique constraint violation code
        throw new HttpException(
          {
            success: false,
            message: 'Email already exists',
          },
          HttpStatus.CONFLICT,
        );
      }
      // Handle other potential errors
      throw new HttpException(
        {
          success: false,
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!email || !password) {
      throw new HttpException(
        {
          success: false,
          message: 'Please provide valid input',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Define the regex pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the regex pattern
    if (!emailRegex.test(email)) {
      throw new HttpException(
        {
          success: false,
          message: 'Invalid email format',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Check if the password matches the regex pattern
    if (!passwordRegex.test(password)) {
      throw new HttpException(
        {
          success: false,
          message:
            'Invalid password format. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.authService.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          success: false,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        {
          success: false,
          message: 'Invalid password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    delete user.password;

    return {
      success: true,
      message: 'Login successful',
      data: user,
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new HttpException(
          {
            success: false,
            message: 'Unauthorized',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = await this.authService.findOne({ id: data.id });

      const { password, ...result } = user;

      return {
        success: true,
        message: 'User retrieved successfully',
        data: result,
      };
    } catch (err) {
      console.log({ err });
      throw new HttpException(
        {
          success: false,
          message: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      success: true,
      message: 'Logout successful',
    };
  }
}
