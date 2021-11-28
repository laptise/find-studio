import { format } from "date-fns";
import { GetServerSidePropsContext } from "next";
import { getRepository } from "typeorm";
import Page from "../../components/page";
import { Dao } from "../../dao";
import { getDb, restoreObject, restoreObjects, server, toObject } from "../../db";
import { Booth } from "../../entities/booth";
import { Studio } from "../../entities/studio";
import Link from "next/link";
import Image from "next/image";
export interface StudioInfoProps {
  studio: Studio;
  boothes: Booth[];
}

export function AdminBox(id: number) {
  return (
    <div>
      <Link passHref href={`/studio/edit/${id}`}>
        <button>編集画面へ</button>
      </Link>
    </div>
  );
}

export default function StudioInfo({ studio, boothes }: StudioInfoProps) {
  restoreObject(studio);
  restoreObjects(boothes);
  const isAdmin = true;
  return (
    <Page title={studio.name} isAdmin={isAdmin} AdminBox={() => AdminBox(studio.id)}>
      <div id="studioInfo">
        <h1 className="title">{studio.name}</h1>
        <div className="meta">
          <span>作成日 : {format(studio.createdAt, "yyyy年MM月dd日 h時m分")}</span>
          <span>更新日 : {format(studio.updatedAt, "yyyy年MM月dd日 h時m分")}</span>
        </div>
        <p>{studio.comment}</p>
        <div id="boothes">
          <h2> ブース</h2>
          <div className="items">
            {boothes.map((booth) => (
              <div className="single" key={booth.id}>
                <h3>{booth.name}</h3>
                {booth.topImage && <Image width={300} height={300} alt={booth.name} className="mainPicture" src={booth.topImage} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = Number(context.query?.id);
  const [studio, boothes] = await Promise.all([
    Dao.Studio.getStudioFromId(id).then(toObject), //
    Dao.Booth.getBoothFromStudioId(id).then(toObject),
  ]);

  return {
    props: { studio, boothes }, // will be passed to the page component as props
  };
}
