
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Note } from 'entities/notes';

@Injectable()
export class NoteRepository extends BaseRepository<Note> {}
