
import { Note } from "entities/notes";
import { NumberField, StringFieldOptional, NumberFieldOptional, ObjectFieldOptional } from "src/decorators/field.decorator";

export class UpdateNoteParamsDTO {
  @NumberField({ int: true})
  id: number;

}
export class UpdateNoteRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0})
  contents?: string;
@NumberFieldOptional({ int: true})
  user_id?: number;
@StringFieldOptional({ maxLength: 255, minLength: 0})
  title?: string;

}
export class UpdateNoteRequestDTO {
  @ObjectFieldOptional(UpdateNoteRequest)
  notes?: UpdateNoteRequest;

}
export class UserUpdateNoteResponse {
  id: number;
created_at: Date;
updated_at: Date;
full_name: string;

}
export class UpdateNoteResponse {
  id: number;
created_at: Date;
updated_at: Date;
contents: string;
user: UserUpdateNoteResponse;
user_id: number;
title: string;

}
export class UpdateErrorObjectResponse {
  
}

export class UpdateNoteResponseDTO {
  
  note: UpdateNoteResponse
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
