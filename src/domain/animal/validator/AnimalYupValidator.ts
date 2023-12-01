// import { ValidatorInterface } from "../../@shared/validator/ValidatiorInterface";
// import { Animal } from "../entity/Animal";
// import * as yup from "yup";
// export class AnimalYupValidator implements ValidatorInterface<Animal> {
//   validate(data: Animal): Promise<void> {
//     try {
//       yup.object().shape({
//         id: yup.string().required('id is required'),
//         name: yup.string().required(''),
//         age: yup.number().required(),
//         weight: yup.number().required(),
//         type: yup.string().required(),
//         ownerId: yup.string().required(),
//       }).validateSync(data, {
//         abortEarly: false,
//       })
//     } catch (error) {}
//   }
// }
