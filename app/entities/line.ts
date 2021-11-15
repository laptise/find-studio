import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Line {
  /**路線コード */
  @PrimaryColumn("int")
  lineCd: number;
  /**会社コード */
  @Column("int")
  companyCd: number;
  /**路線名 */
  @Column("text")
  lineName: string;
  @Column("text")
  lineNameK: string;
  @Column("text")
  lineNameH: string;
  @Column("text")
  lineColorC: string;
  @Column("text")
  lineColorT: string;
  @Column("text")
  lineType: string;
  @Column("decimal")
  lng: number;
  @Column("decimal")
  lat: number;
  @Column("int")
  zoom: number;
  @Column("int")
  eStatus: number;
  @Column("int")
  eSort: number;
  constructor(id: number) {
    this.lineCd = id;
  }
}
