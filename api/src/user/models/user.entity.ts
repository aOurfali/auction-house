import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.interface";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    username: string;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
    
    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;
    
    /*
    constructor(uId:    number,
                name:   string,
                uName:  string,
                pass:   string,
                role:   UserRole) {
    this.id = uId;
    this.name = name;
    this.username = uName;
    this.password = pass;
    this.role = role;
    }*/
}