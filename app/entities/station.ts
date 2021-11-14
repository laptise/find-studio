import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Station {
  @PrimaryColumn("int")
  stationCd: number;
  // @Column()
  // stationGCd: number;
  // @Column()
  // stationName: string;
  // @Column()
  // stationNameK: string;
  // @Column()
  // stationNameR: string;
  // @Column()
  // lineCd: number;
  // @Column()
  // prefCd: number;
  // @Column()
  // post: string;
  // @Column()
  // address: string;
  // @Column()
  // lon: number;
  // @Column()
  // lat: number;
  // @Column()
  // openYmd: string;
  // @Column()
  // closeYmd: string;
  // @Column()
  // eStatus: number;
  // @Column()
  // eSort: number;
  constructor(key: number) {
    this.stationCd = key;
  }
}
