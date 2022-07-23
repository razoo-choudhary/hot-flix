import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_VIDEO} from "../../helpers/constants/constants";

@Entity(T_VIDEO)
export class Video extends BaseEntity{
    @PrimaryGeneratedColumn()
    video_id !: number

    @Column( {
        type : "integer"
    })
    movie_id !: number

    @Column( {
        type : "text"
    })
    series_id !: string

    @Column( {
        type : "text"
    })
    quality !: string

    @Column( {
        type : "text"
    })
    video_hash !: string

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}