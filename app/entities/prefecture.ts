import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("PREF_MST")
export class Prefecture extends BaseEntity {
  /**駅コード */
  @PrimaryColumn("int")
  code: number;
  @Column("text")
  name: string;
  @Column("text")
  kanaNm: string;
}
