import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_PAYMENT} from "../../helpers/constants/constants";

@Entity(T_PAYMENT)
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    payment_id !: number

    @Column( {
        type : "integer"
    })
    user_id !: number

    @Column( {
        type : "integer"
    })
    transaction_id !: number

    @Column( {
        type : "integer"
    })
    payment_amount !: number

    @Column( {
        type : "integer"
    })
    payment_refund !: number

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}