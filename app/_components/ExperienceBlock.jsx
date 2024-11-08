export const ExperienceBlock = ({ date, post, company, desc }) => {
  return (
    <div className="relative flex items-start space-x-4">
      <div className="flex flex-col items-center">
        <div
          className="w-3.5 h-3.5 border-2 border-red-500 rounded-full z-10 mt-5"
          style={{ backgroundColor: "#FFF5F2" }}
        ></div>
        <div className="absolute top-0 left-[8px] w-[2px] bg-red-500 h-full"></div>
      </div>

      <div className="flex flex-col gap-1 py-3">
        <p className="text-sm md:text-md text-gray-500">{date}</p>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          {post} - <span className="font-normal">{company}</span>
        </h3>
        <p className="text-md md:text-lg text-gray-600 w-3/4 md:w-1/2 mt-4">
          {desc}
        </p>
      </div>
    </div>
  );
};
