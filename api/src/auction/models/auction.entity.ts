import { Duration } from 'ts-duration';

import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class AuctionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    userId: number;

    @Column()
    picture: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    duration: number;

    @Column()
    startPrice: number;

}