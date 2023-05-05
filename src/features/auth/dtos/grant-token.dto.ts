import { ValidateIf } from 'class-validator';
import { EnumField, StringField, StringFieldOptional } from 'decorators/field.decorator';
import { OAUTH_GRANT_TYPE } from 'src/constants';
import { ScopeEnum } from './scope.dto';

export class GrantTokenDto {
  
    @StringField({"email":true,"maxLength":255,"minLength":0})
  @ValidateIf((data: GrantTokenDto) => {
    return data.grant_type === OAUTH_GRANT_TYPE.PASSWORD && ["users"].includes(data.scope)
  })
  email?: string;

  @StringField({"maxLength":255,"minLength":0,"password":true})
  @ValidateIf((data: GrantTokenDto) => {
    return data.grant_type === OAUTH_GRANT_TYPE.PASSWORD && ["users"].includes(data.scope)
  })
  password?: string;

  @StringFieldOptional({ allowEmpty: true })
  client_id?: string;

  @StringFieldOptional({ allowEmpty: true })
  client_secret?: string;
  
  @EnumField(() => OAUTH_GRANT_TYPE)
  grant_type: OAUTH_GRANT_TYPE;

  @ValidateIf((o: GrantTokenDto) => o.grant_type === OAUTH_GRANT_TYPE.REFRESH_TOKEN)
  @StringFieldOptional()
  refresh_token?: string;

  @ValidateIf((o: GrantTokenDto) => o.grant_type === OAUTH_GRANT_TYPE.PASSWORD)
  @EnumField(() => ScopeEnum)
  scope?: ScopeEnum;

}
