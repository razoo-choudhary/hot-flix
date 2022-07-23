import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_SUBTITLE} from "../../helpers/constants/constants";

@Entity(T_SUBTITLE)
export class SubTitles extends BaseEntity{
    @PrimaryGeneratedColumn()
    subtitle_id !: number

    @Column( {
        type : "text"
    })
    movie_id !: number

    @Column( {
        type : "text"
    })
    language !: string

    @Column( {
        type : "text"
    })
    language_src !: string

    @Column( {
        type : "text"
    })
    subtitle_slug !: string

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}