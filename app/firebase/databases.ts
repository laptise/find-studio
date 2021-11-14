import { FirebaseApp } from "@firebase/app";
import { collection, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "@firebase/firestore";
import { db } from ".";

export const studiosRef = collection(db, "studios");
export class Station {
  station_cd!: number;
  station_g_cd!: number;
  station_name!: string;
  station_name_k!: string;
  station_name_r!: string;
  line_cd!: number;
  pref_cd!: number;
  post!: string;
  address!: string;
  lon!: number;
  lat!: number;
  open_ymd!: string;
  close_ymd!: string;
  e_status!: number;
  e_sort!: number;
  constructor(data: object) {
    for (const [key, value] of Object.entries(data)) {
      (this as any)[key] = value;
    }
  }
}
export class Line {
  line_cd!: number;
  company_cd!: number;
  line_name!: string;
  line_name_k!: string;
  line_name_h!: string;
  line_color_c!: string;
  line_color_t!: string;
  line_type!: string;
  lon!: number;
  lat!: number;
  zoom!: number;
  e_status!: number;
  e_sort!: number;
  constructor(data: object) {
    for (const [key, value] of Object.entries(data)) {
      (this as any)[key] = value;
    }
  }
}
const stationCOnverter = {
  toFirestore(post: Station): DocumentData {
    return {};
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Station {
    const data = snapshot.data(options)!;
    return new Station(data);
  },
};
const lineCOnverter = {
  toFirestore(post: Line): DocumentData {
    return {};
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Line {
    const data = snapshot.data(options)!;
    return new Line(data);
  },
};

export const stationsRef = collection(db, "stations").withConverter(stationCOnverter);
export const linesRef = collection(db, "lines").withConverter(lineCOnverter);
