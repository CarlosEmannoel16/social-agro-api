import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity({ name: "images_animal" })
export class ImagesAnimalEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  url!: string;

  @ManyToOne(() => AnimalEntity, (animal) => animal.images)
  animal!: AnimalEntity;
}
