import { StringField } from 'decorators/field.decorator';

export class UnlockDTO {
  @StringField()
  unlock_token: string;
}
