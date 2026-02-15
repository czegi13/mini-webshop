import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm'
import * as bcrypt from 'bcrypt'

export enum UserRole{
    ADMIN = 'admin',
    CUSTOMER = 'customer'
}


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    fullName: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CUSTOMER
    })
    role: UserRole

    @BeforeInsert()
    async hashPassword(){
        if (this.password){
            //generate salt 
            const salt = await bcrypt.genSalt();

            //mix salt with the password
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}

