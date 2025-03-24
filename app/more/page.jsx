'use client'

import React from 'react';
import { stacks } from '@/utils/stacks';
import Image from 'next/image';
import Link from 'next/link';
import { contacts } from '@/utils/contacts';
import Button from '@/components/Button';

const Page = () => {
  const handleClick = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 mx-6 mt-6 pt-16 md:pt-24">
      {/* Section for Tech Stack Images with title inside */}
      <div className="backdrop-blur-lg bg-white/40 rounded-3xl px-4 py-2 sm:max-w-[75vw] mx-auto flex flex-col justify-center items-center">
        <div className='text-2xl text-center font-extrabold my-4 from-blue-700 via-indigo-600 to-blue-800 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50'>
          About This App
        </div>
        <div className='text-lg font-semibold max-w-[65vw] mt-4 mx-6 mb-8'>
          This app allows users (mainly myself) to share, explore, and manage movie reviews, complete with ratings and images. Built with Next.js for a seamless and responsive frontend, and powered by AWS for a scalable backend, it’s designed to deliver a smooth user experience. It’s not just a platform for movie discussions—it’s also a showcase of my skills in full-stack development, cloud integration, and API management. Let’s dive in and give it a try!
        </div>

        {/* Title inside the same background div */}
        <div className=' flex flex-col justify-center items-center'>
        <div className="text-center pt-4 text-md">Stacks</div>

        {/* Tech Stack Images */}
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-9 gap-6 py-4 h-auto flex-wrap justify-evenly items-center md:pl-6">
          {stacks.map((stack) => (
            <div
              key={stack.name}
              className="flex justify-center items-center cursor-pointer relative group"
              onClick={() => handleClick(stack.link)}
            >
              {/* Image */}
              <div className="relative w-24 h-auto sm:w-32 sm:h-auto group-hover:scale-110 transition-transform duration-300 ease-in-out">
                <Image
                  src={`/${stack.img}`}
                  alt={stack.name}
                  width={65}
                  height={65}
                  className="rounded-full object-contain transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-50"
                />
              </div>

              {/* Centered Span */}
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="backdrop-blur-md py-1 px-2 rounded-lg text-center">
                  <span className="text-sm">{stack.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          {/* Contact Me Button */}
          <div className="text-xl font-extrabold duration-300 text-center mt-4 block">
            <span
              onClick={() => handleClick('contact')} 
              className='group hover:text-transparent hover:bg-gradient-to-r hover:from-[#1d4ed8] hover:via-[#1e40af] hover:to-[#1e3a8a] bg-clip-text cursor-pointer duration-300'>
              Contact Me
            </span>
          </div>

          {/* Down Arrow under "Contact Me" */}
          <div className="flex justify-center my-6">
            <div onClick={() => handleClick('section1')} className='font-bold text-3xl cursor-pointer hover:scale-105 duration-300'>
              <Image src="/downarrow.svg" alt="arrow" width={35} height={19} />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1 */}
      <section id='section1' className='min-h-screen flex items-center justify-center flex-col w-full'>
        <div className='flex flex-col w-full max-w-5xl gap-4 items-center justify-center'>
          {/* React + Next.js Logos (2/10 columns) */}
          <div className='flex justify-center items-center mr-6 gap-12 mb-6'>
            <Image src="/javascript.png" alt="Javascaript" width={80} height={80} className='rounded-full ' />
            <Image src="/react.svg" alt="React" width={80} height={80} className='rounded-full' />
            <Image src="/nextjs.svg" alt="Next.js" width={80} height={80} className='rounded-full' />
          </div>

          {/* Code Image + Text (8/10 columns) */}
          <div className='col-span-8 flex items-center gap-6 justify-start max-w-[75vw]'>
            <Image src="/code.svg" alt="Code" width={75} height={75} className="" />
            <p className='md:text-lg text-md font-semibold'>
              Building the frontend with JavaScript, React, and Next.js from scratch makes web development feel smooth and intuitive.
              <br /><br />React’s component-based structure keeps things organized, while Next.js enhances performance and flexibility. Together, they create fast, dynamic, and user-friendly experiences, making coding both efficient and enjoyable.
              <br /><br />Let’s see next how I’m integrating with AWS!
            </p>
          </div>
        </div>

        {/* Scroll Button */}
        <div onClick={() => handleClick('section2')} className='font-bold text-3xl cursor-pointer mt-24 hover:scale-105 duration-300'>
          <Image src="/downarrow.svg" alt="arrow" width={35} height={19} />
        </div>
      </section>

      {/* SECTION 2 */}
      <section id='section2' className='min-h-screen flex items-center justify-center flex-col w-full'>
        <div className='flex flex-col w-full max-w-5xl gap-4 items-center justify-center'>
          <div className='flex justify-center items-center mr-6 gap-12 mb-6'>
            <Image src="/amplify.png" alt="Amplify" width={80} height={80} className='rounded-full ' />
            <Image src="/route53.jpg" alt="Route 53" width={80} height={80} className='rounded-full ' />
            <Image src="/cloudfront.png" alt="Cloudfront" width={80} height={80} className='rounded-full' />
          </div>

          {/* Code Image + Text (8/10 columns) */}
          <div className='col-span-8 flex items-center gap-6 justify-start max-w-[75vw]'>
            <Image src="/aws.svg" alt="AWS" width={75} height={75} className="hidden sm:block" />
            <p className='md:text-lg text-md font-semibold'>
              After coding the frontend with JavaScript, React, and Next.js, I deployed the app to AWS Amplify, which streamlined hosting and continuous deployment, enabling a smooth connection between my GitHub repository and the live app.
              <br /><br />I used Route 53 to manage the domain, ensuring smooth connections, and CloudFront to speed up content delivery worldwide, reducing load times significantly. This combination optimizes the app’s performance and keeps it secure and scalable. With these tools in place, I ensured a seamless experience for users.
              <br />
              <br />Wait, there’s still the last important part!
            </p>
          </div>
        </div>

        {/* Scroll Button */}
        <div onClick={() => handleClick('section3')} className='font-bold text-3xl cursor-pointer mt-14 hover:scale-105 duration-300'>
          <Image src="/downarrow.svg" alt="arrow" width={35} height={19} />
        </div>
      </section>

      {/* SECTION 3 */}
      <section id='section3' className='min-h-screen flex items-center justify-center flex-col w-full mx-3'>
        <div className='flex flex-col w-full max-w-5xl gap-4 items-center justify-center'>
          <div className='flex justify-center items-center mr-6 sm:gap-12 gap-6 mb-6'>
            <Image src="/apigateway.png" alt="API Gateway" width={80} height={80} className='rounded-full' />
            <Image src="/lambda.png" alt="Lambda" width={80} height={80} className='rounded-full ' />
            <Image src="/dynamodb.svg" alt="dynamo db" width={80} height={80} className='rounded-full' />
            <Image src="/s3.jpg" alt="S3" width={80} height={80} className='rounded-full' />
          </div>

          {/* Code Image + Text (8/10 columns) */}
          <div className='col-span-8 flex items-center gap-6 justify-start max-w-[75vw]'>
            <Image src="/aws.svg" alt="AWS" width={75} height={75} className="hidden sm:block" />
            <p className='md:text-lg text-md font-semibold'>
              And voilà! To power the backend of my app, I used API Gateway and Lambda to create a seamless connection between the frontend and the database.
              <br /><br />API Gateway handles requests, while Lambda processes them, interacting with DynamoDB to store and retrieve movies data efficiently. For image storage, I used S3, ensuring that images are uploaded and served smoothly.
              <br /><br />This serverless setup ensures scalability and reliability while keeping the infrastructure simple and cost-effective, allowing the app to perform efficiently without managing servers.
              <br /><br />In the future, I plan to add more features, such as a search function, integration with AWS Cognito for user authentication, and other enhancements to make the app even more robust and interactive.
              <br /><br /> Final step!
            </p>
          </div>
        </div>

        {/* Scroll Button */}
        <div onClick={() => handleClick('contact')} className='font-bold text-3xl cursor-pointer mt-8 hover:scale-105 duration-300'>
          <Image src="/downarrow.svg" alt="arrow" width={35} height={19} />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className='min-h-screen flex flex-col gap-10 items-center justify-center'>
        <div className='flex flex-col text-center justify-center items-center gap-2'>
          <div className='text-3xl md:text-5xl font-bold'>Hey there, this is <span className='text-5xl md:text-6xl  mx-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-700 to-blue-800'>Jay</span></div>
          <div className='text-lg md:text-2xl font-extralight'>
            Let's get in toup for any opportunities!
          </div>
          <div className="mt-4 flex gap-8">
            {contacts.map((contact) => (
              <Link
                key={contact.name}
                href={contact.link}
                target="_blank"
                className="group text-xl text-indigo-600 font-medium hover:text-white hover:scale-110 duration-300 mt-6"
              >
                <Image
                  src={contact.img}
                  alt={contact.name}
                  width={45}
                  height={45}
                />
              </Link>
            ))}
          </div>
          <a
            href="/Jay-resume-CloudEngineer.pdf"
            download="Jay-Cloud Engineer Resume"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full text-gray-400 bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 hover:text-white hover:from-blue-700 hover:via-indigo-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 hover:scale-105 py-3 px-5 font-extrabold text-2xl mt-10 "
          >
            Resume
          </a>
          <div>

            


          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
