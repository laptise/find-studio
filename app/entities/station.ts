import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("station")
export class Station extends BaseEntity {
  /**駅コード */
  @PrimaryColumn("int")
  stationCd: number;
  /**駅グループコード */
  @Column("int")
  stationGCd: number;
  /**駅名 */
  @Column("text")
  stationName: string;
  @Column("text")
  stationNameK: string;
  @Column("text")
  stationNameR: string;
  /**路線コード */
  @Column("int")
  lineCd: number;
  @Column("int")
  prefCd: number;
  @Column("text")
  post: string;
  @Column("text")
  address: string;
  @Column("decimal")
  lng: number;
  @Column("decimal")
  lat: number;
  @Column("text")
  openYmd: string;
  @Column("text")
  closeYmd: string;
  @Column("int")
  eStatus: number;
  @Column("int")
  eSort: number;
  constructor();
  constructor(id: number);
  constructor(id?: number) {
    super();
    switch (arguments.length) {
      case 1:
        this.stationCd = id as number;
        break;
    }
  }
}
