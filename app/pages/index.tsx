import { format } from "date-fns";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useState } from "react";
import { Dao } from "../dao";
import { restoreObjects, toObject } from "../db";
import { Studio } from "../entities/studio";
import Link from "next/link";
import Page from "../components/page";

interface StationSearcherProp {
  stationPicker(station: StationLines): void;
}
const StationSearcher = ({ stationPicker }: StationSearcherProp) => {
  const [results, setResults] = useState<StationLines[]>([]);
  const [composing, setComposing] = useState(false);

  const keyInput = async (value: string) => {
    if (value.length < 2 || composing) setResults([]);
    else search(value);
  };

  const search = async (value: string) => {
    const res = (await fetch(`/api/stations?name=${value}`).then((res) => res.ok && res.json())) as StationLines[];
    res.sort((a, b) => a.stationName.length - b.stationName.length);
    console.log(res);
    setResults(res);
  };

  const compositionEnd = (value: string) => {
    setComposing(false);
    value.length > 1 && search(value);
  };
  return (
    <>
      <input
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={(e) => compositionEnd(e.currentTarget.value)}
        onInput={(e) => keyInput(e.currentTarget.value)}
      ></input>
      {results?.length > 0 && (
        <div className="resultBox flex-col">
          {results.map((res: StationLines, index) => (
            <div className="station flex-col" key={index} onClick={() => stationPicker(res)}>
              <span className="line">
                {res.lines[0].lineName}
                {res.lines.length > 1 ? <span className="badge">{res.lines.length}</span> : ""}
              </span>
              {res.stationName}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Station = () => {
  const [pickedStation, setPickedStation] = useState<StationLines | null>(null);

  return (
    <div id="stationSearcher" className="flex-col">
      <label>??????</label>
      {pickedStation ? (
        <div onClick={() => setPickedStation(null)}>{pickedStation.stationName}</div>
      ) : (
        <StationSearcher stationPicker={setPickedStation} />
      )}
    </div>
  );
};

const Searcher = () => {
  const [isNormalSearchMode, setIsNormalSearchMode] = useState(true);
  return (
    <div id="searcher">
      <div className="tabs">
        <label data-is-active={isNormalSearchMode} htmlFor="normalSeach">
          ????????????????????????
        </label>
        <label data-is-active={!isNormalSearchMode} htmlFor="userSeach">
          ????????????????????????
        </label>
      </div>
      <div className="body">
        <input id="normalSeach" className={`hide`} type="radio" name="searchType" onChange={() => setIsNormalSearchMode(true)} />
        <input id="userSeach" className={`hide`} type="radio" name="searchType" onChange={() => setIsNormalSearchMode(false)} />
        {isNormalSearchMode ? (
          <div className={"normal"}>
            <Station />
          </div>
        ) : (
          <div className="user">????????????</div>
        )}
      </div>
    </div>
  );
};

const NewestStudio = () => {
  return;
};

interface Props {
  newStudios: Studio[];
}

const NewStudios = ({ newStudios }: Props) => {
  restoreObjects(newStudios);
  return (
    <div id="newStudio">
      <h1>??????????????????</h1>
      <Link href="/studio/new" passHref>
        <caption>???????????????</caption>
      </Link>
      {newStudios.map((studio) => (
        <Link href={`/studio/${studio.id}`} key={studio.id} passHref>
          <div className="single-studio">
            <div className="header">
              <h3>{studio.name}</h3>
              <caption>{format(studio.updatedAt, "y-M-d h:m")}</caption>
            </div>
            <p>{studio.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const Home = ({ newStudios }: Props) => {
  return (
    <Page title="?????????">
      <Searcher />
      <NewStudios newStudios={newStudios} />
    </Page>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const newStudios = await Dao.Studio.getNewestStudio().then(toObject);
  return {
    props: { newStudios }, // will be passed to the page component as props
  };
}
