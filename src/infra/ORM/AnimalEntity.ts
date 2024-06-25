import { Vaccination } from "@prisma/client";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { VaccinationEntityEntity } from "./VaccinationEntity";
import { WeightHistoryEntity } from "./WeightHistoryEntity";
import { ImagesAnimalEntity } from "./ImagesAnimalEntity";
import { DailyAmountOfMilkEntity } from "./DailyAmountOfMilk";
import { AnimalExpensesEntity } from "./AnimalExpensesEntity";
import { AnimalNotesEntity } from "./AnimalNotesEntity";
import { BreedAnimalEntity } from "./BreedAnimalEntity";

enum TypeAnimal {
  OX = "OX",
  COW = "COW",
}

@Entity()
export class AnimalEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  surname!: string;

  @Column()
  type!: TypeAnimal;

  @Column()
  dateOfBirth!: Date;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @OneToMany(() => VaccinationEntityEntity, (vaccination) => vaccination.animal)
  vaccination!: Vaccination;

  @OneToMany(() => WeightHistoryEntity, (weight) => weight.animal)
  weightHistory!: WeightHistoryEntity;

  @OneToMany(() => ImagesAnimalEntity, (image) => image.animal)
  images!: ImagesAnimalEntity;

  @OneToMany(
    () => DailyAmountOfMilkEntity,
    (dailyAmountOfMilk) => dailyAmountOfMilk.animal
  )
  dailyAmountOfMilk!: DailyAmountOfMilkEntity;

  @OneToMany(
    () => AnimalExpensesEntity,
    (animalExpense) => animalExpense.animal
  )
  expenses!: AnimalExpensesEntity;

  @OneToMany(() => AnimalNotesEntity, (animalNote) => animalNote.animal)
  notes!: AnimalExpensesEntity;

  @ManyToOne(() => BreedAnimalEntity, (breed) => breed.animal)
  breed!: BreedAnimalEntity;
}
