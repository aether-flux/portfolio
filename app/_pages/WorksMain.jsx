import Link from "next/link";
import { WorkBlock } from "../_components/WorkBlock";

export const WorksMain = () => {
  return (
    <section id="work">
      <div className="flex flex-col gap-8 mt-16 mb-20 md:mb-40">
        <h1 className="uppercase text-3xl md:text-5xl font-extrabold px-10 md:px-20 tracking-[2px]">
          Projects
        </h1>
        <div className="flex flex-col gap">
          <Link href="/project/inked">
            <WorkBlock
              title="Inked"
              desc="A rich note-taking tool for inking down your thoughts."
              img="/inked/inkedLanding.jpg"
            />
          </Link>
          <Link href="/project/reqy">
            <WorkBlock
              title="Reqy"
              desc="A command-line tool to smoothly make GET and POST requests."
              img="/reqy/reqySS.png"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
