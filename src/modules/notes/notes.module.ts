
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/utils/repository';
import { NoteService } from "./notes.service";
import { NoteController } from "./notes.controller";
import { NoteRepository } from "./notes.repository";
import { Note } from "entities/notes";

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [provideCustomRepository(Note, NoteRepository), NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
