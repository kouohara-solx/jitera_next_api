
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "entities/users";

@Entity('notes')
export class Note  {
  
    @Column({ type: "integer", primary: true})
@PrimaryGeneratedColumn()
    id:number 
  
    @Column({ nullable: true, type: "timestamp"})
@CreateDateColumn()
    created_at:Date 
  
    @Column({ nullable: true, type: "timestamp"})
@UpdateDateColumn()
    updated_at:Date 
  
    @Column({ nullable: false, type: "varchar"})
    contents:string 
  
    @Column({ nullable: false, type: "integer"})
    user_id:number 
  
    @Column({ nullable: true, type: "varchar"})
    title:string 
  
    @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
@JoinColumn( { name: 'user_id' } )
    user:User 
    }
