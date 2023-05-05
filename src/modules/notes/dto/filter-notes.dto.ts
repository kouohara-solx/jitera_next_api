
import { Note } from "entities/notes";
import { StringFieldOptional, NumberFieldOptional, ObjectFieldOptional } from "src/decorators/field.decorator";

export class FilterNoteRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0})
  contents?: string;
@NumberFieldOptional({ int: true})
  user_id?: number;
@StringFieldOptional({ maxLength: 255, minLength: 0})
  title?: string;

}
export class FilterNoteRequestDTO {
  @NumberFieldOptional({ int: true})
  pagination_page?: number;
@NumberFieldOptional({ int: true})
  pagination_limit?: number;
@ObjectFieldOptional(FilterNoteRequest)
  notes?: FilterNoteRequest;

}
export class UserFilterNoteResponse {
  id: number;
created_at: Date;
updated_at: Date;
full_name: string;

}
export class FilterNoteResponse {
  id: number;
created_at: Date;
updated_at: Date;
contents: string;
user: UserFilterNoteResponse;
user_id: number;
title: string;

}
export class FilterMessageResponse {
  
}


export class FilterNoteResponseDTO {
  notes: FilterNoteResponse[];
    total_pages?: number;
    message?: Object;
    total_count: number;
  
  constructor(
    notes: (Note)[],
    total_count: number,
    total_pages?: number,message?: Object  ) {
    this.notes = notes.map((note) => ({
          ...note,
          id: note?.id,
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
title: note?.title
        }));
        this.total_pages = total_pages;
        this.message = message;
        this.total_count = total_count;
  }
}
