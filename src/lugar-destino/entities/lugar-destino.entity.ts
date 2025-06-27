import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('LugarDestino')
export class LugarDestino {

    @PrimaryGeneratedColumn({ name: 'idLugarDestino' })
    idLugarDestino: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;
}
