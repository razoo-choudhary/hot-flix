import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_USERS} from "../../helpers/constants/constants";

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

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}