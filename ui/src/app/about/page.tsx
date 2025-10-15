import React from "react";

import { experienceData , educationData,skillData,softSkill }  from "../components/about/Data";
import ExperienceCard from "../components/about/ExperienceCard";
import EduCard from "../components/about/EduCard";

async function page() {


 


  return (
    <div className="md:p-36 p-5 ">
      <div>
        {/* intoduce */}

        <div className=" flex flex-col gap-3">

          <h3 className="introduce text-2xl">Introduction</h3>
          <h2 className="text-black font-bold text-4xl">Sakib Fakir</h2>

          <span className="title">Full Stack Developer</span>
          <div className="title flex flex-wrap gap-2">

            <span>Email: </span>{" "}
            <a href="mailto:sakibfakir9966@gmail.com">
              sakibfakir9966@gmail.com
            </a>
          
            <span>Phone: </span> <a href="tel:+8801784745">01784745</a>
           
            <span>Address: </span> Dhaka, Mohammadpur
         
            <span>Portfolio: </span>{" "}
            <a href="https://yourportfolio.com" target="_blank">
              https://yourportfolio.com
            </a>
          </div>
        </div>
        {/* img */}
      </div>


      {/* about me */}

      <div className="mt-20">
        <h2 className="introduce text-3xl font-bold">About My Journey</h2>

        <div className="flex flex-col gap-y-9 mt-8">
            <p>With a passion for crafting robust and intuitive digital experiences, I bring over 7 years of expertise in full-stack development. My journey began with a fascination for elegant code and grew into a dedication to creating seamless user interfaces that delight and engage. I thrive on solving complex problems and transforming ideas into functional, beautiful applications.</p>
            <p>My background spans across various industries, where I've had the privilege of contributing to impactful projects from conception to deployment. I specialize in building scalable web applications, optimizing performance, and ensuring a smooth user journey across all platforms. I believe in continuous learning and adapting to the ever-evolving landscape of technology.</p>
            <p>Outside of coding, I'm an avid enthusiast of open-source contributions, constantly exploring new frameworks, and mentoring aspiring developers. I'm always looking for opportunities to collaborate on innovative projects that push the boundaries of what's possible.</p>
        </div>
      </div>


      {/* work experience */}
      <div className="mt-12">
        <div>
            <h1 className="introduce text-4xl font-bold">Work Experience</h1>
        </div>
        <div className="mt-10">
            {
                experienceData.map((exp)=> <ExperienceCard company={exp.company} title={exp.title}
                end={exp.end}
                start={exp.start}
                role={exp.role}
                key={exp.id}

                whatIDo={exp.whatIDo}
                
                />)
            }

        </div>
      </div>


      {/* education */}

      <div className="mt-12 text-left">
        <div>
            <h2 className="introduce text-4xl font-bold">Education</h2>
        </div>
      <div className="mt-4">
            {educationData.map((edu, index) => (
        <EduCard key={index} education={edu} />
      ))}
      </div>

      </div>


      {/* skills */}


      <div className="mt-12">
        <div>
            <h1 className="introduce text-4xl font-bold">Skills</h1>
            <div className="mt-7">
                <p className="text-black text-xl">Technical Skills</p>
            </div>
            {/* skill */}

          <div className="flex flex-wrap gap-4 mt-4">
  {skillData.map((skill, key) => (
    <div
      key={key}
      className="bg-black text-white rounded h-10 w-32 flex items-center justify-center"
    >
      {skill}
    </div>
  ))}
</div>


           
            {/* soft */}

           <div className="mt-4">
            <h3 className="text-xl text-black">Soft Skills</h3>
              <div className="flex gap-3 mt-3 items-center ">
             {
                softSkill.map((skill,key)=>(<div   key={key}
      className="bg-black text-white rounded h-10 w-32 flex items-center justify-center">
                    {skill}

                </div>))
            }
           </div>

           </div>
        </div>
      </div>



    </div>
  );
}

export default page;
