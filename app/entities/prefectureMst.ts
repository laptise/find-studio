import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

/**都道府県マスタ */
@Entity()
export class PrefectureMst extends BaseEntity {
  /**駅コード */
  @PrimaryColumn("int")
  code: number;
  @Column("text")
  name: string;
  @Column("text")
  kanaNm: string;
}
