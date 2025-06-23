import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('rol')
export class Rol{
    @PrimaryColumn({
        name: 'IdRol',
        type: 'int',
    })
    idRol: number

    @Column({ name: 'NombreRol', type: 'varchar', length: 100 })
    nombreRol: string;

    @Column({ name: 'IdTipoRol', type: 'int' })
    idTipoRol: number;  // Aun no esta mapeado con la realcion (tablaTipoRol)--solo como campo numérico

    @Column({ name: 'IndicadorVerTodasVentas', type: 'char', length: 1, default: '0' })
    indicadorVerTodasVentas: string;

    @Column({ name: 'IndicadorVerComboVentas', type: 'char', length: 1, default: '0' })
    indicadorVerComboVentas: string;

    @Column({ name: 'IndicadorEstado', type: 'char', length: 1, default: 'A' })
    indicadorEstado: string;

    @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50, nullable: true })
    usuarioRegistro: string;

    @Column({ name: 'FechaRegistro', type: 'datetime', nullable: true })
    fechaRegistro: Date;

    @Column({ name: 'UsuarioModificacion', type: 'varchar', length: 50, nullable: true })
    usuarioModificacion: string;

    @Column({ name: 'FechaModificacion', type: 'datetime', nullable: true })
    fechaModificacion: Date;
}