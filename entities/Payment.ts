import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_PAYMENT} from "../helpers/constants/constants";

@Entity(T_PAYMENT)
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    payment_id !: number

    @Column( {
        type : "integer"
    })
    user_id !: number

    @Column( {
        type : "text"
    })
    transaction_id !: string

    @Column( {
        type : "integer"
    })
    payment_amount !: number

    @Column( {
        type : "integer"
    })
    payment_cashback !: number

    @Column( {
        type : "integer"
    })
    payment_fee !: number

    @Column( {
        type : "text"
    })
    paid_by !: string

    @Column( {
        type : "text"
    })
    status !: string

    @Column( {
        type : "boolean",
        default : false
    })
    refunded !: boolean

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}