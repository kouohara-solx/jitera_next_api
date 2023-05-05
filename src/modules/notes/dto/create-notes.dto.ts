
import { Note } from "entities/notes";
import { StringField, NumberField, StringFieldOptional, ObjectField } from "src/decorators/field.decorator";

export class CreateNoteRequest {
  @StringField({ maxLength: 255, minLength: 0})
  contents: string;
@NumberField({ int: true})
  user_id: number;
@StringFieldOptional({ maxLength: 255, minLength: 0})
  title?: string;

}
export class CreateNoteRequestDTO {
  @ObjectField(CreateNoteRequest)
  notes: CreateNoteRequest;

}
export class UserCreateNoteResponse {
  id: number;
created_at: Date;
updated_at: Date;
full_name: string;

}
export class CreateNoteResponse {
  id: number;
created_at: Date;
updated_at: Date;
contents: string;
user: UserCreateNoteResponse;
user_id: number;
title: string;

}
export class CreateErrorObjectResponse {
  
}

export class CreateNoteResponseDTO {
  
  note: CreateNoteResponse
    error_object: Object;
  
  
  constructor(
    note: Note,
    error_object?: Object  ) {
    this.note = { ...note, id: note?.id,
created_at: note?.created_at,
updated_at: note?.updated_at,
contents: note?.contents,
user: {
            id: note?.user?.id,
created_at: note?.user?.created_at,
updated_at: note?.user?.updated_at,
full_name: note?.user?.full_name
          },
user_id: note?.user_id,
title: note?.title };
        this.error_object = error_object;
      }
  }
