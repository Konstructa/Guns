import { Customer } from '../../domain/Customer';

export type CreateCustomerParams = Customer;

export interface CreateCustomerInterface {
    id?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    gems: number;
    created_at?: Date;
    update_at?:Date
}
