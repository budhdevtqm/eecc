"use client";
import React, { useEffect } from "react";
import useFetch from "../custom-hooks/useFetch";
import { Profile, getMyDetails } from "../redux/profileSlice";
import { useAppSelector } from "../redux/hooks";
import UpdateProfile from "../my-profile/UpdateProfile";

const Profile: React.FC = () => {
  const { handleFetch } = useFetch();

  const profile = useAppSelector(
    (state) => state.profile.user
  ) as Profile | null;

  useEffect(() => {
    handleFetch(getMyDetails);
  }, []);
  return (
    <>
      {profile && (
        <div className="w-full h-full ">
          <div className="w-full">
            <div className=" flex items-center justify-center">
              <h1 className="font-bold text-xl text-gray-600 hover:text-primary">
                {`Hii, ${profile.name}`}
              </h1>
            </div>
          </div>
          <UpdateProfile />
        </div>
      )}
    </>
  );
};

export default Profile;
