DROP TABLE IF EXISTS line;

CREATE TABLE line (
    lineCd int,
    companyCd int,
    lineName varchar(40),
    lineNameK varchar(40),
    lineNameH varchar(40),
    lineColorC varchar(40),
    lineColorT varchar(40),
    lineType varchar(10),
    lng decimal,
    lat decimal,
    zoom int,
    eStatus int,
    eSort int
)