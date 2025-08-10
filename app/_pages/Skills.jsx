export const Skills = () => {
  return (
    <section id="skills">
      <div className="my-20">
        <h1 className="uppercase text-3xl md:text-5xl font-extrabold px-10 md:px-20 tracking-[2px] mb-6 md:mb-14">
          Skillset
        </h1>
        <div className="flex flex-col md:flex-row gap-y-12 md:gap-x-[350px] px-10 md:px-20">
          <div>
            <h3 className="uppercase text-xl md:text-3xl font-semibold mb-6 tracking-[2px]">
              Languages
            </h3>
            <ul className="list-disc pl-5 gap-y-2 flex flex-col">
              <li>Rust</li>
              <li>Javascript</li>
              <li>Shell Script (Linux)</li>
            </ul>
          </div>
          <div>
            <h3 className="uppercase text-xl md:text-3xl font-semibold mb-6 tracking-[2px]">
              Technologies
            </h3>
            <ul className="list-disc pl-5 gap-y-2 flex flex-col">
              <li>Node.js</li>
              <li>Express</li>
              <li>React.js</li>
              <li>Next.js</li>
              <li>Figma</li>
              <li>Convex</li>
              <li>Firebase</li>
              <li>Supabase</li>
              <li>PostgreSQL</li>
              <li>MongoDB/Mongoose</li>
              <li>Networking</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
