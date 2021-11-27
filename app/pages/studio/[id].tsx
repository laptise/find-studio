import { format } from "date-fns";
import { GetServerSidePropsContext } from "next";
import { getRepository } from "typeorm";
import Layout from "../../components/layout";
import { Dao } from "../../dao";
import { getDb, restoreObject, restoreObjects, server, toObject } from "../../db";
import { Booth } from "../../entities/booth";
import { Studio } from "../../entities/studio";

interface StudioInfoProps {
  studio: Studio;
  boothes: Booth[];
}

export default function StudioInfo({ studio, boothes }: StudioInfoProps) {
  restoreObject(studio);
  restoreObjects(boothes);
  return (
    <Layout title={studio.name}>
      <div>
        <h1>{studio.name}</h1>
        <div>作成日 : {format(studio.createdAt, "yyyy年MM月dd日 h時m分")}</div>
        <div>更新日 : {format(studio.updatedAt, "yyyy年MM月dd日 h時m分")}</div>
        <div>
          ブース
          {boothes.map((booth) => (
            <div key={booth.id}>{booth.name}</div>
          ))}
        </div>
      </div>
    </Layout>
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
