import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

/**都道府県マスタ */
@Entity()
export class Booth extends BaseEntity {
  /**駅コード */
  @PrimaryColumn("int")
  id: number;
  @PrimaryColumn("int")
  studioId: number;
  @Column("text")
  name: string;
  @Column("text")
  topImage: string;
  @Column("datetime")
  createdAt: Date;
  @Column("datetime")
  updatedAt: Date;
}
