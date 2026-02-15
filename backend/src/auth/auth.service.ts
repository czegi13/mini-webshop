import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    /**
     * Validates user credentials by email and password
     * @param email - User's email address
     * @param pass - Plain text password to verify
     * @returns User object without password if valid, null otherwise
     */
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && (await bcrypt.compare(pass, user.password))){
            const { password, ...result} = user
            return result;
        }
        return null;
    }

    /**
     * Generates JWT token for authenticated user
     * @param user - User object containing email and id
     * @returns Object with access_token property containing the JWT
     */
    async login(user: any){
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    
}