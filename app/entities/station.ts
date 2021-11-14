import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Station {
  @PrimaryColumn("int")
  stationCd: number;
  @Column("int")
  stationGCd: number;
  @Column("text")
  stationName: string;
  @Column("text")
  stationNameK: string;
  @Column("text")
  stationNameR: string;
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
  constructor(id: number) {
    this.stationCd = id;
  }
}
