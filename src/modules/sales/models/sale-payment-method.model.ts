import { Sale } from "./sale.model";

export class SalePaymentMethod {
    Id!: number;
    Created_at!: Date;
    SaleId!: number;
    Sale!: Sale;
    PaymentMethodId!: number;
    Amount!: number;
}