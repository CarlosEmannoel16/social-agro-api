import * as yup from "yup";

class ValidationAddWeightUseCase {
  validateInput(data: any) {
    yup
      .object()
      .shape({
        idAnimal: yup.string().required(),
        idUser: yup.string().required(),
        weight: yup.number().required(),
        date: yup.date().required(),
      })
      .validateSync(data, {
        abortEarly: false,
      });
  }
}

export const validationAddWeightUseCase = new ValidationAddWeightUseCase();
