import { StringField } from "decorators/field.decorator";

export class ResetPasswordDTO {
  @StringField({"email":true,"maxLength":255,"minLength":0})
  email: string
}