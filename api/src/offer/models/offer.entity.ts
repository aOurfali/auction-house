import { AuctionEntity } from "src/auction/models/auction.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OfferEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id)
    userId: number;

    @ManyToOne(() => AuctionEntity, (auction) => auction.id)
    auctionId: number;

}