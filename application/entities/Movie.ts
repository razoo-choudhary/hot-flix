import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_MOVIE} from "../../helpers/constants/constants";

@Entity(T_MOVIE)
export class Movie extends BaseEntity{
    @PrimaryGeneratedColumn()
    movie_id !: number

    @Column({
        type : "text"
    })
    movie_name !: string

    @Column({
        type : "date"
    })
    release_date !: Date

    @Column({
        type : "text"
    })
    movie_duration !: string

    @Column({
        type : "text"
    })
    movie_origin !: string

    @Column({
        type : "text"
    })
    trailer !: string

    @Column({
        type : "text"
    })
    genre !: string

    @Column({
        type : "text"
    })
    cast !: string

    @Column({
        type : "text"
    })
    director !: string

    @Column({
        type : "text"
    })
    thumbnail !: string

    @Column({
        type : "text"
    })
    description !: string

    @Column({
        type : "date",
        nullable : true,
        default : null
    })
    expected_date !: Date

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}