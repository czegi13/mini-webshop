import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    /**
     * Login endpoint - Handles user authentication
     * @param loginDto - Contains email and password from the request body
     * @returns JWT token and user information if authentication is successful
     * @throws UnauthorizedException if credentials are invalid
     */
    @Post('login')
    async login(@Body() loginDto: LoginDto){
        // Validate user credentials by checking email and password against the database
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);

        // If user doesn't exist or password is incorrect, throw an unauthorized exception
        if (!user){
            throw new UnauthorizedException('Invalid email or password!');
        }

        // Generate and return JWT token for the authenticated user
        return this.authService.login(user);
    }
}
