import React from "react";

interface EduCardProps {
  education: {
    name: string;
    school: string;
    start: string;
    end: string;
    cgpa: string;
    group: string;
  };
}

const EduCard: React.FC<EduCardProps> = ({ education }) => {
  return (
    <div className=" mt-5  ">

      <h2 className="text-2xl font-bold">{education.name}</h2>

      <div className="flex gap-3">
        <p className="eduColor">{education.school} </p>
      <p className="eduColor">
        {education.start} - {education.end}
      </p>
      </div>

      <div className="flex gap-3">
            <p className="eduColor">CGPA: {education.cgpa}</p>
             <span className="eduColor">| </span>
        <p className="eduColor">Group: {education.group}</p>
  
      </div>

    </div>
  );
};

export default EduCard;
