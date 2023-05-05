import { StringField } from "decorators/field.decorator"

export class VerifyResetPasswordDTO {
  @StringField()
  reset_token: string;

  @StringField({"maxLength":255,"minLength":0,"password":true})
  password: string;

  @StringField({ equalTo: 'password'})
  password_confirmation: string;
}