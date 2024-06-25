import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity()
export class ImagesAnimalEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  url!: string;

  @ManyToOne(() => AnimalEntity, (animal) => animal.images)
  animal!: AnimalEntity;
}
