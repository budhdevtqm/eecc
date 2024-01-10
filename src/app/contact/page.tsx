"use client";
import React from "react";
import Wrapper from "../components/Wrapper";
import ContactUs from "../components/ContactUs";
import { bussinesHours } from "../common-utils/common-vars";

const Contact: React.FC = () => {

  return (
    <Wrapper>
      <div className="bg-white rounded shadow">
        <h1 className="text-center font-bold text-[25px] py-4">Contact Us</h1>
        <div className="px-8 py-4">
          <h4 className="font-semibold my-2  text-left">Welcome to TQM Mart - Your One-Stop Shopping Destination!</h4>
          <p className="text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quidem dignissimos vitae error cumque nemo excepturi ipsam voluptates harum! Non nemo magnam aperiam facilis quis? Quas vel assumenda dolorem eaque. Fuga at voluptatum qui suscipit error cum commodi facere iste, natus nisi? Similique porro nulla quasi consectetur! Optio quaerat neque voluptatum ipsum magni! Magnam quae, sed excepturi laboriosam ex exercitationem, a architecto aliquid nesciunt nulla hic aspernatur dolore in voluptates ipsam nostrum tempore. Dicta recusandae iste nulla doloribus et rem reprehenderit, sint nemo. Obcaecati sit ut odit voluptate magni at doloribus itaque dolore optio corporis officia labore impedit, explicabo nemo.
          </p>
        </div>
        <div className="px-8 py-4">
          <h4 className="font-semibold my-2 ">Customer Service</h4>
          <p className="text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quidem dignissimos vitae error cumque nemo excepturi ipsam voluptates harum! Non nemo magnam aperiam facilis quis? Quas vel assumenda dolorem eaque. Fuga at voluptatum qui suscipit error cum commodi facere iste, natus nisi? Similique porro nulla quasi consectetur! Optio quaerat neque voluptatum ipsum magni! Magnam quae, sed excepturi laboriosam ex exercitationem, a architecto aliquid nesciunt nulla hic aspernatur dolore in voluptates ipsam nostrum tempore. Dicta recusandae iste nulla doloribus et rem reprehenderit, sint nemo. Obcaecati sit ut odit voluptate magni at doloribus itaque dolore optio corporis officia labore impedit, explicabo nemo.
          </p>
        </div>
        <div className="px-8 py-4">
          <h4 className="font-semibold my-2 ">Visit Us</h4>
          <p className="text-left">
            If you prefer face-to-face interactions, feel free to visit our physical store at 123 Shopping Street, Cityville, State, Zip Code. Our knowledgeable staff will be delighted to assist you in person.
          </p>
        </div>
        <div className="px-8 py-4">
          <h4 className="font-semibold my-2 ">Technical Support</h4>
          <p className="text-left">
            Encountering technical issues? Our tech support team is here to help you navigate any challenges. Drop us an email at techsupport@tqmmart.com or contact us through our app for real-time assistance.
          </p>
        </div>

        <div className="px-8 py-4">
          <h4 className="font-semibold my-2 ">Feedback and Suggestions</h4>
          <p className="text-left">
            We value your feedback and suggestions. Share your thoughts with us by sending an email to feedback@tqmmart.com. Your input helps us improve and tailor our services to meet your needs.
          </p>
        </div>
        <div className="px-8 py-4">
          <h4 className="font-semibold my-2 ">Business Hours</h4>
          {bussinesHours.map((b) => <div className="flex items-center gap-8">
            <h5 className="w-[200px] text-center font-semibold text-[14px]">{b.day}</h5>
            <p className="text-[14px]">{b.time}</p>
          </div>)}
        </div>
        <ContactUs />
      </div>
    </Wrapper>
  );
};

export default Contact;
