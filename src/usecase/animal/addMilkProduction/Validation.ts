import * as yup from "yup";

export class AddMilkProductionUseCaseValidation {
  validate(input: any): void {
    yup
      .object()
      .shape({
        animalId: yup.string().required(),
        userId: yup.string().required(),
        dateOfProduction: yup.date().required(),
        quantityOfMilk: yup.number().required(),
      })
      .validateSync(input, { abortEarly: false });
  }
}
