import { paymentDetailsProps } from "../entities/paymentEntity";

export interface IgetPaymentUseCase {
  execute(data: {
    studentId: string;
    role: string;
    page?: number;
    limit?: number;
  }): Promise<{
    payments: paymentDetailsProps[];
    totalCount: number;
    totalAmount: number;
    totalCourses: number
  }>;
}
