import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Line from "./line";
import Station from "./station";

@Entity()
export default class StationByLines extends Station {
  @OneToMany((type) => Line, (line) => line.lineCd) // note: we will create author property in the Photo class below
  lines: Line[];
}
