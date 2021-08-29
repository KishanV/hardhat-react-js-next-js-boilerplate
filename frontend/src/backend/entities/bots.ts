import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";
import { PairDetail } from "../../network/crypto-watch";

@Entity("bots")
export class Bot {
  @PrimaryGeneratedColumn()
  id: number = undefined as any;

  @Column()
  @Generated("uuid")
  uuid: string = undefined as any;

  @Column({ type: "varchar", unique: true })
  name: string = undefined as any;

  @Column({ type: "text" })
  description: string = undefined as any;

  @Column({ type: "jsonb" })
  details: PairDetail = undefined as any;
}
