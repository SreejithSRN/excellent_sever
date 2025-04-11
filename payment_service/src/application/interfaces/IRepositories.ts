import { paymentDetailsProps } from "../../domain/entities/paymentEntity";

export interface IRepositories {
  getPayments: (data: {
    studentId: string;
    role: string;
    page?: number;
    limit?: number;
  }) => Promise<{
    payments: paymentDetailsProps[];
    totalCount: number;
    totalAmount: number;
    totalCourses: number
  }>;
}
