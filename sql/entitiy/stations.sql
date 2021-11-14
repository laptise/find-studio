DROP TABLE IF EXISTS station;

CREATE TABLE station (
    stationCd int,
    stationGCd int,
    stationName varchar(10),
    stationNameK varchar(10),
    stationNameR varchar(10),
    lineCd int,
    prefCd int,
    post varchar(10),
    address varchar(40),
    lng decimal,
    lat decimal,
    openYmd varchar(8),
    closeYmd varchar(8),
    eStatus int,
    eSort int
)