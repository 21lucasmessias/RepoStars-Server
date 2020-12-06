import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('language')
export default class Language {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  searched: number;
}