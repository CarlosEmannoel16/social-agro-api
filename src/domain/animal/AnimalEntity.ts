import { AnimalTable, GenderAnimal } from "@/infra/types/Animal";
import { MilkProduction } from "./valueObjects/MilkProduction";
import { WeightAnimal } from "./valueObjects/WeightAnimal";
import { AnimalDTO } from "./types/AnimalDTO";

export class Animal {
  constructor(
    public id: string,
    public fastId: string,
    public ownerId: string,
    public name: string,
    public gender: GenderAnimal,
    public breed: string,
    public dateOfUpdate: Date,
    public dateOfCreation: Date,
    public dateOfBirth?: Date,
    public fatherId?: string,
    public motherId?: string,
    public images?: string[],
    public lastProductionDate?: Date,
    public dateOfAcquisition?: Date,
    public acquisitionAmount?: number,
    public financiallyAcquired?: Boolean,
    public milkProduction?: MilkProduction[],
    public weight?: WeightAnimal[]
  ) {}

  static create(data: {
    id: string;
    fastId: string;
    ownerId: string;
    name: string;
    gender: GenderAnimal;
    breed: string;
    dateOfBirth?: Date;
    fatherId?: string;
    motherId?: string;
    images?: string[] | [];
    lastProductionDate?: Date;
    dateOfAcquisition?: Date;
    acquisitionAmount?: number;
    financiallyAcquired?: Boolean;
    milkProduction?: MilkProduction[];
    weight?: WeightAnimal[];
    dateOfUpdate: Date;
    dateOfCreation: Date;
  }) {
    return new Animal(
      data.id,
      data.fastId,
      data.ownerId,
      data.name,
      data.gender,
      data.breed,
      data.dateOfUpdate,
      data.dateOfCreation,
      data.dateOfBirth,
      data.fatherId,
      data.motherId,
      data.images ?? [],
      data.lastProductionDate,
      data.dateOfAcquisition,
      data.acquisitionAmount,
      data.financiallyAcquired,
      data.milkProduction,
      data.weight
    );
  }

  static createByDb(
    data: AnimalTable & {
      images?: string[];
      milkProduction?: MilkProduction[];
      weight?: WeightAnimal[];
    }
  ) {
    return new Animal(
      data.id,
      data.fast_id ?? "",
      data.user_id,
      data.surname,
      data.gender,
      data.breed ?? "Generic",
      data.updated_at ?? new Date(),
      data.created_at ?? new Date(),
      data.date_of_birth,
      data.fast_id,
      data.mother_id ?? undefined,
      data.images ?? [],
      data.last_production_date,
      data.acquisition_date ?? undefined,
      data.acquisition_amount,
      data.financially_acquired,
      data.milkProduction,
      data.weight
    );
  }

  formatToReturn(): AnimalDTO {
    return {
      id: this.id,
      fastId: this.fastId,
      ownerId: this.ownerId,
      name: this.name,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      breed: this.breed,
      fatherId: this.fatherId,
      motherId: this.motherId,
      images: this.images,
      lastProductionDate: this.lastProductionDate,
      yearOfLife: this.ageAnimal,
      dateOfAcquisition: this.dateOfAcquisition,
      acquisitionAmount: this.acquisitionAmount,
      financiallyAcquired: this.financiallyAcquired,
      historyMilkProduction: this.milkProductionsFormatted,
      weightHistory: this.weightFormatted,
      dateOfUpdate: this.dateOfUpdate,
      dateOfCreation: this.dateOfCreation,
      averageProductionByMonth: this.averageProductionByMonth,
    };
  }

  get averageProductionByMonth(): number {
    if (!this.milkProduction?.length) return 0;
    let totalProduction = 0;
    const months = new Set<number>();
    for (const milk of this.milkProduction) {
      totalProduction += milk.quantityOfMilk ?? 0;
      if (milk.month) months.add(milk.month);
    }
    return months.size ? totalProduction / months.size : 0;
  }

  get ageAnimal(): string {
    if (!this.dateOfBirth) return "";
    const now = new Date();
    const birth = new Date(this.dateOfBirth);
    let months =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months--;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years} anos e ${remainingMonths} meses`;
  }

  get weightFormatted(): {
    weight: number;
    dateOfRegister: string;
    createdAt: Date;
  }[] {
    return (
      this.weight?.map((weight) => ({
        weight: weight.weight,
        dateOfRegister: weight.dateOfRegisterPTBR,
        createdAt: weight.dateOfRegister,
      })) ?? []
    );
  }

  get milkProductionsFormatted(): any[] {
    return (
      this.milkProduction?.map((milk) => ({
        dateOfRegister: milk.dateOfProduction.toLocaleDateString(),
        quantity: milk.quantityOfMilk,
        amount: `R$ ${milk.amount.toFixed(2)}`,
      })) ?? []
    );
  }
}
