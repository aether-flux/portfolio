import { ExperienceBlock } from "../_components/ExperienceBlock";

export const Experience = () => {
  return (
    <section id="experience">
      <div className="my-20">
        <h1 className="uppercase text-3xl md:text-5xl font-extrabold px-10 md:px-20 tracking-[2px] mb-6">
          Experience
        </h1>
        <div className="experiences px-10 md:px-20 pt-6">
          <ExperienceBlock
            date="Sep 2024 - Nov 2024"
            post="Full Stack Development Intern"
            company="Digital Guruji"
            desc="I was entrusted with a range of complex backend and frontend tasks during my internship, which pushed me to grow both technically and creatively."
          />
        </div>
      </div>
    </section>
  );
};
