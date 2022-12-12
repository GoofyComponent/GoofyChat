import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";
import {
  incrementFastLoginStep,
  resetFastLoginStep,
  toggleFastLoginModal,
} from "../../helpers/redux/slices/AppSlice";

export const LoginModal = () => {
  const fastloginsteps = useSelector((state: any) => state.app.FASTLOGINSTEP);
  const UserJWT = useSelector((state: any) => state.user.JWT_API);
  const dispatch = useDispatch();

  return (
    <div className="flex absolute w-[100vw] h-[100vh] bg-black/50 z-30 top-0 left-0">
      {fastloginsteps === 0 && (
        <div className="m-auto w-1/2 h-[70vh] bg-[#3B4D54] flex flex-col rounded-2xl">
          <div className="m-auto text-center">
            <h1 className="text-3xl m-auto mt-8 text-primary">FastLogin</h1>
            <p className="text-xl m-auto mt-8 text-primary">
              Launch your app and click on the
            </p>
            <p className="text-2xl m-auto mt-8 text-primary font-bold">
              "FastLogin"
            </p>
            <p className="text-xl m-auto mt-8 text-primary">button</p>
          </div>
          <button
            className="w-32 h-10 p-auto m-auto mb-8 rounded-2xl text-center bg-secondary text-tertiary font-bold hover:bg-primary hover:text-primary transition-all border-2 border-transparent hover:border-primary"
            onClick={(e) => {
              e.preventDefault();
              dispatch(incrementFastLoginStep());
            }}
          >
            Next
          </button>
        </div>
      )}
      {fastloginsteps === 1 && (
        <div className="m-auto w-1/2 h-[70vh] bg-[#3B4D54] flex justify-center items-center flex-col rounded-2xl text-center">
          <h3 className="text-3xl m-auto mt-8 text-primary">
            Scan this qr code with your app
          </h3>
          <div className="m-auto  flex justify-center bg-white p-6 rounded-xl">
            <QRCode value={UserJWT} />
          </div>
          <button
            className="w-32 h-10 p-auto mx-auto mb-8 rounded-2xl text-center bg-secondary text-tertiary font-bold hover:bg-primary hover:text-primary transition-all border-2 border-transparent hover:border-primary"
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleFastLoginModal());
              dispatch(resetFastLoginStep());
            }}
          >
            FINISH
          </button>
        </div>
      )}
    </div>
  );
};
