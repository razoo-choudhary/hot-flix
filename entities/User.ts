import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_USERS} from "../helpers/constants/constants";

@Entity(T_USERS)
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    user_id !: number

    @Column( {
        type    :   "text"
    })
    email !: string

    @Column( {
        type    :   "text"
    })
    username !: string

    @Column( {
        type    :   "text"
    })
    password !: string

    @Column({
        type : "text"
    })
    avatar !: string

    @Column( {
        type : "integer",
        default : 0
    })
    is_premium !: number

    @Column( {
        type : "integer",
        default : 0
    })
    premium_type !: number

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}