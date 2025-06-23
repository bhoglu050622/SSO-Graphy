import React from 'react'
import { assets } from '../../assets/assets'
import bghome from '../../assets/images/bg_gradient.png'

const Hero = () => {
    return (
        <>
            {/* <div className='absolute top-0  z-[-1]  w-full'>
                <img src={bghome} alt="#"  className="w-full h-full object-cover"/>
            </div> */}

            {/* <div className="">
                <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-hero-pattern "></div>
            </div> */}



            <div className='pt-10 sm:pt-20'>

                {/* side padding for modile */}
                <div className=' text-center px-3'>
                    <div className='flex justify-center'>
                        <div className='flex gap-2 p-2 border border-[#FFFFFF] rounded-lg'>
                            <img src={assets.icon} alt="" />
                            <img src={assets.kid_star} alt="" className='w-6 h-6' />
                            <p className='text-[#DBDBDB] font-inter'>4.9 (2949 reviews)</p>
                        </div>
                    </div>
                    <h1 className='text-[#ffff] text-[40px] sm:text-[64px] md:text-[84px] font-semibold font-clash py-3 sm:py-1 leading-tight sm:leading-snug'>TOP <span className='text-[#FFF200]'>CREATOR</span> MENTORS</h1>
                    <p className='text-[#ffff] font-inter font-normal text-[16px] md:text-[20px]  tracking-[0%] text-center pb-8 leading-tight'>Our vision is to turn friendly YouTubers and creators into mentors, bringing <span className='md:block'>real education to life.</span></p>

                    <div className='flex justify-center'>
                        <div className='sm:flex gap-10 items-center py-6 px-10 rounded-lg mb-10 border border-[#5E5400] bg-gradient-to-r from-[rgba(2,2,2,0.4)] to-[rgba(44,35,0,0.4)]'>
                            <div className='hidden sm:block'>
                                <h2 className='text-[24px] sm:text-[26px] md:text-[36px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF200] to-[#FFFAA2] font-inter font-bold  leading-[100%] tracking-[0] text-center'>1,00,000+</h2>
                                <p className='text-[#BDBDBD] mt-1'>Impacted students</p>
                            </div>

                            <div className='flex gap-10 items-center'>
                                <div>
                                    <h2 className='text-[24px] sm:text-[26px] md:text-[36px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF200] to-[#FFFAA2] font-inter font-bold  leading-[100%] tracking-[0] text-center'>50+</h2>
                                    <p className='text-[#BDBDBD] mt-1'>Creators</p>
                                </div>
                                <div>
                                    <h2 className='text-[24px] sm:text-[26px] md:text-[36px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF200] to-[#FFFAA2] font-inter font-bold  leading-[100%] tracking-[0] text-center'>15+</h2>
                                    <p className='text-[#BDBDBD] mt-1'>Courses</p>
                                </div>
                                <div>
                                    <h2 className='text-[24px] sm:text-[26px] md:text-[36px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF200] to-[#FFFAA2] font-inter font-bold  leading-[100%] tracking-[0] text-center'>10M+</h2>
                                    <p className='text-[#BDBDBD] mt-1'>Followers</p>
                                </div>
                            </div>

                            <div className='block sm:hidden mt-6'>
                                <h2 className='text-[24px] sm:text-[26px] md:text-[36px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF200] to-[#FFFAA2] font-inter font-bold  leading-[100%] tracking-[0] text-center'>1,00,000+</h2>
                                <p className='text-[#BDBDBD] mt-1'>Impacted students</p>
                            </div>

                        </div>
                    </div>
                </div>


                <div className='hidden sm:block'>
                    <img width={"100%"} src={assets.creators} alt="" />
                </div>

                <div className='block sm:hidden'>
                    <img width={"100%"} src={assets.m_creators} alt="" />
                </div>

                <div
                    className="border-[4px] border-solid"
                    style={{
                        borderImageSource: 'radial-gradient(48.58% 104146.22% at 51.42% 0%, #FFFFFF 0%, #FFE100 36.54%, #786A00 66.83%, #271800 100%)',
                        borderImageSlice: 1,
                    }}
                ></div>

            </div>
        </>
    )
}

export default Hero