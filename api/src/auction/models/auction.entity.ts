import { Duration } from 'ts-duration';

import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { OfferEntity } from 'src/offer/models/offer.entity';

@Entity()
export class AuctionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    userId: number;

    @OneToMany(() => OfferEntity, offer => offer.auctionId)
    offers: OfferEntity[];

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