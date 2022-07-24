import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_RESET_TOKEN} from "../helpers/constants/constants";

@Entity(T_RESET_TOKEN)

export class ResetToken extends BaseEntity{
    @PrimaryGeneratedColumn()
    token_id !: number

    @Column( {
        type : "integer"
    })
    user_id !: number

    @Column( {
        type : "text"
    })
    token !: string

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}