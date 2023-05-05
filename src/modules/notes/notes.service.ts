
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterNoteResponseDTO, FilterNoteRequestDTO, ShowNoteResponseDTO, ShowNoteParamsDTO, CreateNoteResponseDTO, CreateNoteRequestDTO, UpdateNoteResponseDTO, UpdateNoteParamsDTO, UpdateNoteRequestDTO, DeleteNoteResponseDTO, DeleteNoteParamsDTO } from "./dto";
import { QueryCondition, QueryOperators, QueryWhereType, QueryRelation, QueryPagination, QueryOrder, QueryOrderDir } from "src/shared/base.repository";
import { Note } from "entities/notes";
import { NoteRepository } from "./notes.repository";

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    readonly repository: NoteRepository,
    
  ) {}

  async filter(queries: FilterNoteRequestDTO) {
        const conditions: QueryCondition[] = [
            { column: 'contents', value: queries?.notes?.contents, operator: QueryOperators.START_WITH, whereType: QueryWhereType.WHERE },
            { column: 'user_id', value: queries?.notes?.user_id, operator: QueryOperators.EQUAL, whereType: QueryWhereType.WHERE_OR },
            { column: 'title', value: queries?.notes?.title, operator: QueryOperators.START_WITH, whereType: QueryWhereType.WHERE_OR },      
    ]
        
    const relations: QueryRelation[] = [
        { column: 'user', alias: 'users'},    
    ]
        
    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit
    }
        
    const orders: QueryOrder[] = [{ orderBy: 'notes.created_at', orderDir: QueryOrderDir.DESC }]
        
        const [notes, totalCount, totalPages] = await this.repository.findMany({ conditions, relations, pagination, orders })
    
    return new FilterNoteResponseDTO(notes, totalCount, totalPages)
  }
  async show(params: ShowNoteParamsDTO) {
        const conditions: QueryCondition[] = [
            { column: 'notes.id', value: params.id, operator: QueryOperators.EQUAL, whereType: QueryWhereType.WHERE },      
    ]
        
    const relations: QueryRelation[] = [
        { column: 'user', alias: 'users'},    
    ]
                
        const entity = await this.repository.getOne({ conditions })
        const show = await this.repository.getRelations(entity, { relations })
        
    return new ShowNoteResponseDTO(show)
  }
  async create(request: CreateNoteRequestDTO) {
        
    const relations: QueryRelation[] = [
        { column: 'user', alias: 'users'},    
    ]
                
    const data = {
            contents: request?.notes?.contents,
            user_id: request?.notes?.user_id,
            title: request?.notes?.title,          }
    
        const entity = await this.repository.createOne({ data })
        const create = await this.repository.getRelations(entity, { relations })
        
    return new CreateNoteResponseDTO(create)
  }
  async update(params: UpdateNoteParamsDTO,request: UpdateNoteRequestDTO) {
        const conditions: QueryCondition[] = [
            { column: 'notes.id', value: params.id, operator: QueryOperators.EQUAL, whereType: QueryWhereType.WHERE_AND },      
    ]
        
    const relations: QueryRelation[] = [
        { column: 'user', alias: 'users'},    
    ]
                
    const data = {
            contents: request?.notes?.contents,
            user_id: request?.notes?.user_id,
            title: request?.notes?.title,          }
    
        const entity = await this.repository.updateOne({ conditions, data })
        const update = await this.repository.getRelations(entity, { relations })
        
    return new UpdateNoteResponseDTO(update)
  }
  async delete(params: DeleteNoteParamsDTO) {
        const conditions: QueryCondition[] = [
            { column: 'notes.id', value: params.id, operator: QueryOperators.EQUAL, whereType: QueryWhereType.WHERE },      
    ]
                    
        await this.repository.removeOne({ conditions })
    
    return new DeleteNoteResponseDTO()
  }
}
