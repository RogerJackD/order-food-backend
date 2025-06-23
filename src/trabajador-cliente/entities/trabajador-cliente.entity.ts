import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('trabajadorcliente')
export class TrabajadorCliente {
    @PrimaryColumn({ name: 'IdTrabajador', type: 'int' })
    idTrabajador: number;

     @PrimaryColumn({ name: 'IdCliente', type: 'int' })
    idCliente: number;


    @ManyToOne(() => Persona)
    @JoinColumn({ name: 'IdTrabajador' })
    trabajador: Persona;

    @ManyToOne(() => Persona)
    @JoinColumn({ name: 'IdCliente' })
    cliente: Persona;

    @Column({ name: 'IndicadorEstado', type: 'varchar', length: 1, default: 'A' })
    indicadorEstado: string;

    @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50, nullable: true })
    usuarioRegistro: string;

    @Column({ name: 'FechaRegistro', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;

    @Column({ name: 'UsuarioModificacion', type: 'varchar', length: 50, nullable: true })
    usuarioModificacion: string;

    @Column({ name: 'FechaModificacion', type: 'datetime', nullable: true })
    fechaModificacion: Date;
}