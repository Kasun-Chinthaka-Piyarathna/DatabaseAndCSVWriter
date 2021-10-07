import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class VCode {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 10 })
    code?: string;

    @Column()
    is_used?: boolean;

    @Column()
    expire_date?: Date;
}
