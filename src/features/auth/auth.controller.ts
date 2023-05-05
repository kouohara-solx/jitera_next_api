import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OAuthService } from './auth.service';
import * as SignUpDto from './dtos/sign-up.dto';
import { GrantTokenDto } from './dtos/grant-token.dto';
import { RevokeTokenDto } from './dtos/revoke-token.dto';
import { TokenResponseDTO } from './dtos/token-response.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { VerifyResetPasswordDTO } from './dtos/verify-reset-password.dto';
import { VerifyConfirmationDTO } from './dtos/verify-conformation.dto';
import { SuccessResponseDTO } from './dtos/success-response.dto';
import { UnlockDTO } from './dtos/unlock.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Auth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

      
  @Post('api/users_registrations')
  @HttpCode(HttpStatus.OK)
    

  async signUpUser(@Body() body: SignUpDto.AuthRegistrationUserRequestDto): Promise<{id: number}> {
    return this.oauthService.signUpUser(body);
  }
    

  
    

    @Post('api/users_verify_confirmation_token')
  @HttpCode(HttpStatus.OK)
  async verifyUserConfirmationEmail(@Body() body: VerifyConfirmationDTO): Promise<TokenResponseDTO> {
    return this.oauthService.verifyUserConfirmationEmail(body.confirmation_token);
  }
   

    @Post('api/users_reset_password_requests')
  @HttpCode(HttpStatus.OK)
  async resetUserPassword(@Body() body: ResetPasswordDTO): Promise<SuccessResponseDTO> {
    return this.oauthService.resetUserPassword(body.email);
  }
   

    @Post('api/users_verify_reset_password_requests')
  @HttpCode(HttpStatus.OK)
  async verifyUserResetPassword(@Body() body: VerifyResetPasswordDTO): Promise<SuccessResponseDTO> {
    return this.oauthService.verifyUserResetPassword(body);
  }
   

    @Post('api/users_unlock')
  @HttpCode(HttpStatus.OK)
  async unlockUser(@Body() body: UnlockDTO): Promise<SuccessResponseDTO> {
    return this.oauthService.unlockUserByToken(body.unlock_token);
  }
   
  
  
   



  @Post('oauth/token')
  @HttpCode(HttpStatus.OK)
  async grantToken(@Body() body: GrantTokenDto): Promise<TokenResponseDTO> {
    return this.oauthService.login(body);
  }

  @Post('oauth/revoke')
  @HttpCode(HttpStatus.OK)
  async revoke(@Body() body: RevokeTokenDto): Promise<SuccessResponseDTO> {
    return this.oauthService.revokeToken(body.token, body.token_type_hint);
  }
}
