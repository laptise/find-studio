import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import Page from "../../../components/page";
import { Dao } from "../../../dao";
import { toObject } from "../../../db";
import { StudioInfoProps } from "../[id]";
import Image from "next/image";

const EditStudio = ({ studio, boothes }: StudioInfoProps) => {
  const [name, setName] = useState(studio.name);
  const [comment, setComment] = useState(studio.comment);
  const submit = () => {
    console.log({ name, comment });
  };
  return (
    <Page title="スタジオ編集">
      <div id="studioInfo">
        <input className="title" value={name} onInput={(e) => setName(e.currentTarget.value)} />
        <textarea value={comment} onInput={(e) => setComment(e.currentTarget.value)} />
        <button onClick={submit}>登録</button>
        <div id="boothes">
          <h2> ブース</h2>
          <div className="items">
            {boothes.map((booth) => (
              <div className="single" key={booth.id}>
                <h3>{booth.name}</h3>
                {booth.topImage && <Image width={300} height={300} alt={booth.name} className="mainPicture" src={booth.topImage} />}
              </div>
            ))}
            <div className="single">
              <input />
              <div className="mainPicture">1</div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default EditStudio;

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
