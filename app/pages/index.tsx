import { doc, getDoc, collection, setDoc, getDocs, query, where, orderBy, startAt, endAt } from "@firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { db } from "../firebase";
import { Line, linesRef, Station, stationsRef, studiosRef } from "../firebase/databases";
import styles from "../styles/Home.module.css";

interface StatonWithLines {
  station: Station;
  lines: Line[];
}
const StationSeracher = () => {
  const [results, setResults] = useState<StatonWithLines[]>([]);
  const [composing, setComposing] = useState(false);
  const keyInput = async (value: string) => {
    if (value.length < 2 || composing) setResults([]);
    else search(value);
  };

  const search = async (value: string) => {
    const q = query(stationsRef, orderBy("station_name"), startAt(value), endAt(value + "\uf8ff"));
    const stations = await getDocs(q).then((x) => x.docs.map((x) => x.data()));
    const datas = await Promise.all(
      stations.map(async (station) => {
        const docRef = doc(linesRef, String(station.line_cd));
        const line = (await getDoc(docRef).then((x) => x.data())) as Line;
        return { station, line };
      })
    );
    const filters = datas.reduce<StatonWithLines[]>((res, set) => {
      const exist = res.find((x) => x.station.station_g_cd === set.station.station_g_cd);
      if (exist) {
        exist.lines = [...exist.lines, set.line];
        return res;
      } else {
        return [...res, { station: set.station, lines: [set.line] }];
      }
    }, [] as StatonWithLines[]);
    setResults(filters);
  };

  const compositionEnd = (value: string) => {
    setComposing(false);
    search(value);
  };
  return (
    <div id="stationSearcher" className="flex-col">
      <label>駅名</label>
      <input
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={(e) => compositionEnd(e.currentTarget.value)}
        onInput={(e) => keyInput(e.currentTarget.value)}
      ></input>
      {results?.length > 0 && (
        <div className="resultBox flex-col">
          {results.map((res) => (
            <div className="station flex-col" key={res.station.station_cd}>
              {res.lines.map((line, lineKey) => (
                <span key={lineKey} className="line">
                  {line.line_name}
                </span>
              ))}

              {res.station.station_name}
            </div>
          ))}
        </div>
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
          駅名を中心に検索
        </label>
        <label data-is-active={!isNormalSearchMode} htmlFor="userSeach">
          利用者条件で検索
        </label>
      </div>
      <div className="body">
        <input id="normalSeach" className={`hide`} type="radio" name="searchType" onChange={() => setIsNormalSearchMode(true)} />
        <input id="userSeach" className={`hide`} type="radio" name="searchType" onChange={() => setIsNormalSearchMode(false)} />
        {isNormalSearchMode ? (
          <div className={"normal"}>
            <StationSeracher />
          </div>
        ) : (
          <div className="user">利用者で</div>
        )}
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const test = async () => {
    const res: any[] = await window.fetch("/api/hello").then((res) => res.ok && res.json());
    console.log(res);
  };

  return (
    <div id="container">
      <Head>
        <title>リハスタナビ｜バンドマンのためのリハサールスタジオ情報サイト</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Searcher />
        <button onClick={test}>test</button>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
