import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity ({name:"tb_tema"})
export class Tema{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: 100, nullable:false})
    titulo: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string

    @IsNotEmpty()
    @UpdateDateColumn()
    data: Date

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]
    static id:any
    

}