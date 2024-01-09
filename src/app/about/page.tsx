"use client";
import React from "react";
import Wrapper from "../components/Wrapper";
import { about } from "../common-utils/common-vars";
import PageHeader from "../components/PageHeader";

const About: React.FC = () => {
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="bg-white rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-[25px] py-4">About TQM Mart </h1>
          {about.map((i: any) => (
            <div key={i.id} className="my-4 p-4 rounded">
              <h1 className="text-start text-[18px] mb-2 text-gary-200 font-semibold pl-8">
                {i.heading}
              </h1>
              <p className="text-[16px] text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, officiis eaque cupiditate quasi esse autem dolor,
                quo aperiam vero commodi, natus rem explicabo ullam beatae minus
                soluta quos suscipit maiores. Voluptas unde animi repudiandae,
                voluptatem tempore fuga quidem ullam iure nisi molestiae
                laboriosam, eveniet modi possimus commodi doloremque nesciunt
                aliquam atque eligendi pariatur placeat distinctio deleniti.
                Culpa enim perferendis architecto quam, neque omnis? Fugiat
                optio, vel voluptas vero, nisi rerum adipisci asperiores nihil
                quas praesentium laboriosam reprehenderit officia iusto veniam
                saepe! Architecto dicta ea veritatis ab nisi eius eos
                dignissimos asperiores suscipit voluptatem vero distinctio,
                cupiditate voluptate! Est distinctio quas earum quos molestiae,
                eum dicta tempore nemo aperiam aliquam error molestias quisquam
                consectetur! Libero et reprehenderit cupiditate nobis error
                minus quis, eum sint corporis eius distinctio, cumque illo.
                Inventore iusto sint, magni ab illo dicta voluptatum, quaerat
                iste, voluptates exercitationem nulla necessitatibus provident
                laborum quia perspiciatis placeat saepe excepturi perferendis!
                Eius iure est mollitia voluptate nemo quaerat deserunt eveniet
                ex quo, numquam nihil placeat ipsum quam ipsam repellendus
                suscipit ratione tempore a quisquam recusandae! Nisi, voluptas
                suscipit nobis aperiam ipsa quis expedita, dolorem itaque in,
                iste cum minus nam delectus dolores! Voluptates minima eos
                vitae! Magnam quas ab placeat commodi.
              </p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
export default About;
