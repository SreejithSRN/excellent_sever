import { paymentDetailsProps } from "../../domain/entities/paymentEntity";

export interface IRepositories {
  getPayments: (data: {
    studentId: string;
    role: string;
  }) => Promise<paymentDetailsProps[] | []>;
}
