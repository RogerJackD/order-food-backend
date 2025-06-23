import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('persona')
export class Persona {
    @PrimaryGeneratedColumn({ name: 'IdPersona' })
    idPersona: number;

    @Column({ name: 'ApellidoCompleto', type: 'varchar', length: 255 })
    apellidoCompleto: string;

    @Column({ name: 'NombreCompleto', type: 'varchar', length: 255, nullable: true })
    nombreCompleto: string;

    @Column({ name: 'RazonSocial', type: 'varchar', length: 255, nullable: true })
    razonSocial: string;

    @Column({ name: 'NumeroDocumentoIdentidad', type: 'varchar', length: 20, unique: true })
    numeroDocumentoIdentidad: string;

    @Column({ name: 'IdTipoDocumentoIdentidad', type: 'int' })
    idTipoDocumentoIdentidad: number;

    @Column({ name: 'IdTipoPersona', type: 'int' })
    idTipoPersona: number;

    @ManyToOne(() => Rol)  // Relación Muchos a Uno hacia Rol
    @JoinColumn({ name: 'IdRol' }) 
    rol: Rol;

    @Column({ name: 'IndicadorEstado', type: 'char', length: 1, default: 'A' })
    indicadorEstado: string;

    @Column({ name: 'FechaRegistro', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;

    @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50, nullable: true })
    usuarioRegistro: string;

    @Column({ name: 'Direccion', type: 'varchar', length: 255, nullable: true })
    direccion: string;

    @Column({ name: 'CondicionContribuyente', type: 'varchar', length: 100, nullable: true })
    condicionContribuyente: string;

    @Column({ name: 'EstadoContribuyente', type: 'varchar', length: 100, nullable: true })
    estadoContribuyente: string;
}
