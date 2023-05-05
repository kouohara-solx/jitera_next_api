
import { ObjectField, StringField } from "decorators/field.decorator";

export class AuthRegistrationUserRequest {
  
  @StringField({"maxLength":255,"minLength":0,"password":true} )
  password: string;
  
  @StringField({"maxLength":255,"minLength":0,"equalTo":"password"} )
  password_confirmation: string;
  
  @StringField({"email":true,"maxLength":255,"minLength":0} )
  email: string;
  
}

export class AuthRegistrationUserRequestDto {
  
  @ObjectField(AuthRegistrationUserRequest )
  user: AuthRegistrationUserRequest;
  
}

