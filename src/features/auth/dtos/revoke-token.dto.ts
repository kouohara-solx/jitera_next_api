import { StringField, StringFieldOptional } from 'decorators/field.decorator';

export class RevokeTokenDto {
  @StringField()
  token: string;

  @StringFieldOptional()
  token_type_hint?: 'refresh_token';
}
