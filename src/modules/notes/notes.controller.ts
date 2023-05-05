
import { Controller, Query, Get as MethodGet, Param, Body, Post as MethodPost, Put as MethodPut, Delete as MethodDelete } from "@nestjs/common";
import { NoteService } from "./notes.service";
import { ApiTags } from "@nestjs/swagger";
import { FilterNoteResponseDTO, FilterNoteRequestDTO, FilterNoteRequest, ShowNoteResponseDTO, ShowNoteParamsDTO, CreateNoteResponseDTO, CreateNoteRequestDTO, UpdateNoteResponseDTO, UpdateNoteParamsDTO, UpdateNoteRequestDTO, DeleteNoteResponseDTO, DeleteNoteParamsDTO } from "./dto";
import { ApiNestedQuery } from "decorators/api-nested-query.decorator";

@Controller()
@ApiTags('Note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {} 
  
  @MethodGet('/api/notes')
  @ApiNestedQuery('notes', FilterNoteRequest)
  filter(@Query() queries: FilterNoteRequestDTO): Promise<FilterNoteResponseDTO> {
    return this.noteService.filter(queries);
  }   

  @MethodGet('/api/notes/:id')
  show(@Param() params: ShowNoteParamsDTO): Promise<ShowNoteResponseDTO> {
    return this.noteService.show(params);
  }   

  @MethodPost('/api/notes')
  create(@Body() request: CreateNoteRequestDTO): Promise<CreateNoteResponseDTO> {
    return this.noteService.create(request);
  }   

  @MethodPut('/api/notes/:id')
  update(@Param() params: UpdateNoteParamsDTO, @Body() request: UpdateNoteRequestDTO): Promise<UpdateNoteResponseDTO> {
    return this.noteService.update(params, request);
  }   

  @MethodDelete('/api/notes/:id')
  delete(@Param() params: DeleteNoteParamsDTO): Promise<DeleteNoteResponseDTO> {
    return this.noteService.delete(params);
  }   
}
