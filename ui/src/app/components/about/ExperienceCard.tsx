



import React from 'react'

interface IExperienceCard{
    title:string,
    role:string,
    company:string,
    start:string,
    end:string,
    whatIDo:string[]
}

function ExperienceCard({title,role,company,start,end,whatIDo}:IExperienceCard) {
  return (
    <div>

        <div className='flex items-center gap-4'>
            <p className='text-black text-2xl font-medium'>{title}</p>

            <p className='border text-white p-1 rounded ' style={{backgroundColor:"#4876EA"}}>{role}</p>
        </div>
        <div>
            <p className='companyColor'>{company} | {start} - {end}</p>
        </div>
        <div className='mt-3'>
            {
                whatIDo.map((item,key)=> (
                    <div key={key}>
                        <li>  {item}</li>
                    </div>
                ))
                
            }
        </div>
      
    </div>
  )
}

export default ExperienceCard
