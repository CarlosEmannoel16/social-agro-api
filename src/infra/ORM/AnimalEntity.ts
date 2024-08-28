import { Vaccination } from "@prisma/client";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { VaccinationEntity } from "./VaccinationEntity";
import { WeightHistoryEntity } from "./WeightHistoryEntity";
import { ImagesAnimalEntity } from "./ImagesAnimalEntity";
import { DailyAmountOfMilkEntity } from "./DailyAmountOfMilk";
import { AnimalExpensesEntity } from "./AnimalExpensesEntity";
import { AnimalNotesEntity } from "./AnimalNotesEntity";
import { BreedAnimalEntity } from "./BreedAnimalEntity";
import { UserEntity } from "./UserEntity";

enum TypeAnimal {
  OX = "OX",
  COW = "COW",
}

@Entity({name: "animal"})
export class AnimalEntity {
  @Column()
  @PrimaryColumn()
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

  @Column()
  fatherId!: string;

  @Column()
  motherId!: string;

  @Column()
  userId!: string;

  @OneToOne(() => AnimalEntity, (animal) => animal.fatherId)
  father!: AnimalEntity;

  @OneToOne(() => AnimalEntity, (animal) => animal.motherId)
  mother!: AnimalEntity;

  @OneToMany(() => VaccinationEntity, (vaccination) => vaccination.animal)
  vaccination!: Vaccination[];

  @OneToMany(() => WeightHistoryEntity, (weight) => weight.animal)
  weightHistory!: WeightHistoryEntity[];

  @OneToMany(() => ImagesAnimalEntity, (image) => image.animal)
  images!: ImagesAnimalEntity[];

  @OneToMany(
    () => DailyAmountOfMilkEntity,
    (dailyAmountOfMilk) => dailyAmountOfMilk.animal
  )
  dailyAmountOfMilk!: DailyAmountOfMilkEntity[];

  @OneToMany(
    () => AnimalExpensesEntity,
    (animalExpense) => animalExpense.animal
  )
  expenses!: AnimalExpensesEntity[];

  @OneToMany(() => AnimalNotesEntity, (animalNote) => animalNote.animal)
  notes!: AnimalExpensesEntity[];

  @ManyToOne(() => BreedAnimalEntity, (breed) => breed.animal)
  breed!: BreedAnimalEntity;


  @ManyToOne(() => UserEntity, (user) => user.animals)
  user!: string;
}
