
import { Note } from "entities/notes";
import { NumberField } from "src/decorators/field.decorator";

export class ShowNoteParamsDTO {
  @NumberField({ int: true})
  id: number;

}
export class UserShowNoteResponse {
  id: number;
created_at: Date;
updated_at: Date;
full_name: string;

}
export class ShowNoteResponse {
  id: number;
created_at: Date;
updated_at: Date;
contents: string;
user: UserShowNoteResponse;
user_id: number;
title: string;

}
export class ShowMessageResponse {
  
}

export class ShowNoteResponseDTO {
  
  note: ShowNoteResponse
    message: Object;
  
  
  constructor(
    note: Note,
    message?: Object  ) {
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
        this.message = message;
      }
  }
