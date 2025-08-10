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
          <Link href="/project/profig">
            <WorkBlock
              title="Profig"
              desc="A config framework (in development) for Rust, with attributes, built-in validation, sample generation and more."
              img="/profig/profig1.png"
            />
          </Link>
          <Link href="/project/cues">
            <WorkBlock
              title="Cues"
              desc="A task and project management platform for developers, with a CLI at your fingertips."
              img="/cues/cues1.png"
            />
          </Link>
          <Link href="/project/decide">
            <WorkBlock
              title="Decide"
              desc="A lightweight permission engine with condition support, written in Rust, available for Rust and JS/TS."
              img="/decide/decide-rs.jpeg"
            />
          </Link>
          <Link href="/project/rensa">
            <WorkBlock
              title="Rensa"
              desc="A minimal and fast backend framework for Node.js."
              img="/rensa/landing.png"
            />
          </Link>
          <Link href="/project/swappjs">
            <WorkBlock
              title="Swapp.js"
              desc="A universal database adapter that provides a single SQL-like query language for both SQL and NoSQL databases."
              img="/swappjs/product_hunt_thumbnail.png"
            />
          </Link>
          <Link href="/project/devflow">
            <WorkBlock
              title="DevFlow"
              desc="A minimalist presentation-making platform for developer meetups and sessions."
              img="/devflow/hero.png"
            />
          </Link>
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
