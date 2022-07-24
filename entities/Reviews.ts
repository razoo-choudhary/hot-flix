import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_REVIEWS} from "../helpers/constants/constants";

@Entity(T_REVIEWS)
export class Reviews extends BaseEntity{
    @PrimaryGeneratedColumn()
    review_id !: number

    @Column({
        type : "integer"
    })
    user_id !: number

    @Column({
        type : "integer"
    })
    movie_id !: number

    @Column({
        type : "integer"
    })
    review_count !: number

    @Column({
        type : "text"
    })
    review_title !: string

    @Column({
        type : "text"
    })
    review_description !: string


    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}