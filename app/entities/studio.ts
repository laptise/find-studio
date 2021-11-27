import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

/**都道府県マスタ */
@Entity()
export class Studio extends BaseEntity {
  /**駅コード */
  @PrimaryColumn("int")
  id: number;
  @Column("text")
  name: string;
  @Column("text")
  comment: string;
  @Column("datetime")
  createdAt: Date;
  @Column("tinyint")
  isWorkAll: number;
  @Column("datetime")
  updatedAt: Date;
}
