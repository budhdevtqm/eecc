// "use client";
// import React from "react";
// import Wrapper from "./Wrapper";
// import { FormHeader } from "./FormHeader";
// import Button from "./Button";
// import { OrderFormValues } from "../product/place-order/[id]/page";

// interface FormCardInterface {
//   title: string;
//   navigate: string;
//   children: React.ReactNode;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
//   formValues: OrderFormValues;
// }

// const OrderForm: React.FC<FormCardInterface> = ({
//   title,
//   navigate,
//   handleSubmit,
//   handleChange,
//   handleTextareaChange,
//   formValues,
// }) => {
//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="w-[45%] p-2 border-t-4 border-primary rounded-lg shadow-lg bg-white">
//         <FormHeader title={title} navigate={navigate} />
//         <div className="w-[70%] mx-auto my-4">
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-1 my-3">
//               <label className="ml-1 text-gray-500 ">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="name!"
//                 className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
//                 onChange={handleChange}
//                 value={formValues.name}
//               />
//               <p className="text-red-500 text-[12px] ml-2">Error</p>
//             </div>
//             <div className="flex flex-col gap-1 my-3">
//               <label className="ml-1 text-gray-500 ">Email</label>
//               <input
//                 type="number"
//                 name="mobile"
//                 placeholder="mobile number!"
//                 className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
//                 onChange={handleChange}
//                 value={formValues.mobile}
//               />
//               <p className="text-red-500 text-[12px] ml-2">Error</p>
//             </div>
//             <div className="flex flex-col gap-1 my-3">
//               <label className="ml-1 text-gray-500 ">PIN Code</label>
//               <input
//                 type="number"
//                 name="pin"
//                 placeholder="PIN Code!"
//                 className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
//                 onChange={handleChange}
//                 value={formValues.pin}
//               />
//               <p className="text-red-500 text-[12px] ml-2">Error</p>
//             </div>
//             <div className="flex flex-col gap-1 my-3">
//               <label className="ml-1 text-gray-500 ">Address</label>
//               <textarea
//                 onChange={handleTextareaChange}
//                 className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
//                 name="address"
//                 cols={30}
//                 rows={2}
//               ></textarea>
//               <p className="text-red-500 text-[12px] ml-2">Error</p>
//             </div>
//             <div className="my-4 flex items-center justify-center">
//               <Button variant="primary" type="submit">
//                 Confirm
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderForm;
