
import { NumberField } from "src/decorators/field.decorator";

export class DeleteNoteParamsDTO {
  @NumberField({ int: true})
  id: number;

}
export class DeleteMessageResponse {
  
}

export class DeleteNoteResponseDTO {
  }
