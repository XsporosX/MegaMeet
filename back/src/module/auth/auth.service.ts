import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createUser-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginUser: LoginUserDto) {
    const userFound = await this.userRepo.findOne({
      where: { email: loginUser.email },
    });
    if (!userFound) {
      throw new BadRequestException('Incorrect credentials');
    }

    const isValidPassword = await bcrypt.compare(
      loginUser.password,
      userFound.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Incorrect credentials');
    }

    const userPlayLoad = {
      sub: userFound.id,
      id: userFound.id,
      email: userFound.email,
    };
    const token = await this.jwtService.sign(userPlayLoad);
    return { success: 'User logged in successfully', token, user: userFound };
  }

  async CreateUser(createUserDto: CreateUserDto) {
    const UserEmail = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (UserEmail) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPasword = await bcrypt.hash(createUserDto.password, 10);
    if (!hashedPasword) {
      throw new BadRequestException('Password could not be hashed');
    }

    const newUser = this.userRepo.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPasword,
    });

    const savedUser = await this.userRepo.save(newUser);
    return {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    };
  }
}
