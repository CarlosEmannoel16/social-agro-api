import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity({ name: "breed_animal" })
export class BreedAnimalEntity {
  @Column()
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  animalType!: string;

  @ManyToOne(() => AnimalEntity, (animal) => animal.breed)
  animal!: AnimalEntity;
}
