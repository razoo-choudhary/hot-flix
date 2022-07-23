import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {T_SCREENSHOTS} from "../../helpers/constants/constants";

@Entity(T_SCREENSHOTS)
export class Screenshots extends BaseEntity{

    @PrimaryGeneratedColumn()
    ss_id !: number

    @Column({
        type : "integer"
    })
    movie_id !: number

    @Column({
        type : "text"
    })
    image_name !: string

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}