"use client";
import React from "react";
import Wrapper from "../components/Wrapper";

const About: React.FC = () => {
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="my-4">
          <h1 className="font-bold text-[20px] text-gray-500">About Us</h1>
        </div>
        <div className="w-[50%] bg-white mx-auto flex items-center justify-center flex-col pt-4 pb-8 px-8">
          <p>
            TQM Mart, an exemplary online ecommerce platform, distinguishes
            itself through a commitment to Total Quality Management, ensuring an
            unparalleled shopping experience for customers worldwide. Founded on
            the principles of delivering excellence, TQM Mart boasts an
            extensive product catalog spanning electronics, fashion, home
            essentials, and more, collaborating with reputable brands to
            guarantee authenticity and high standards. The platform's
            user-friendly interface, emphasis on quality assurance, and a
            customer-centric approach prioritize a seamless and secure online
            journey. TQM Mart's global reach, promotions, and loyalty programs
            not only expand its influence but also reward customer loyalty.
            Beyond commerce, the platform engages in social responsibility,
            reflecting a holistic approach that sets TQM Mart apart as a leader
            in the dynamic landscape of e-commerce.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default About;
