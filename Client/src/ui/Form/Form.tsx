import { useState } from "react";
import Container from "../Container";
import { MdPhotoLibrary } from "react-icons/md";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../../lib/firebase"
import { doc ,setDoc } from "firebase/firestore";
import upload from "../../lib/upload";
import Loading from "../Loading";



const Form = () => {
  const [SingIn, setSingIn] = useState("SIGN IN");
  const [SingUp, setSingUP] = useState("REGISTRATION FORM");

  const [value, SetValue] = useState("SIGN IN");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleRegistration = async(e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {
      firstName,
      lastName,
      email,
      password}:any= Object.fromEntries(formData);

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      let imageUrl = null;

      if (avatar && avatar?.file) {
        imageUrl = await upload(avatar?.file);

      }
      await setDoc(doc(db, "users", res.user.uid), {
        firstName,
        lastName,
        email,
        avatar: imageUrl,
        id: res.user.uid,
      });

      SetValue(SingIn)
  
      


    }catch (error:  unknown) {
  let errorMessage;
  switch (error.code  as unknown | string) {
    case "auth/invalid-email":
      errorMessage = "Please enter a valid email.";
      break;
    case "auth/missing-password":
      errorMessage = "Please enter a password.";
      break;
    case "auth/email-already-in-use":
      errorMessage = "This email is already in use. Try another email.";
      break;
    // Add more cases as needed
    default:
      errorMessage = "An error occurred. Please try again.";
  } console.log("Error", error);
  setErrMsg(errorMessage);
} finally {
  setLoading(false);
}



  };


  
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.target);
      const { email, password } = Object.fromEntries(formData);

      await signInWithEmailAndPassword(auth,email, password);
    } catch (error:any) {
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Email or Password not matched";
          break;
        // Add more cases as needed
        default:
          errorMessage = "An error occurred. Please try again.";
      }
      console.log("Error", error);
      setErrMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container>
      {value === SingIn ? (
        <form onSubmit={handleLogin}  className="bg-[#030712] rounded-md p-10 text-white">
          <h1 className=" text-xl font-bold">{SingIn}</h1>
          <p className=" text-gray-500 text-sm">Please sign in to continue</p>

          <div className=" w-full  h-[1px] bg-gray-700 my-4 " />

          <div className=" flex  justify-between items-center  gap-5">
            <div className=" space-y-4  w-full  ">
              <label htmlFor="email" className=" block">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="  rounded-md py-1 w-full
                      text-black
                       font-normal
                       px-1
                       outline-none
                        duration-100
                       focus:border-[#4338ca] focus:border-2 
                      "
              />
            </div>

            <div className=" space-y-4 w-full  ">
              <label htmlFor="password" className=" block">
                Password
              </label>
              <input
                type="password"
                className="rounded-md py-1 w-full
                      text-black
                       font-normal
                       px-1
                       outline-none
                        duration-100
                       focus:border-[#4338ca] focus:border-2 
                      "
                name="password"
              />
            </div>
          </div>
          <div className=" w-full  h-[1px] bg-gray-700 my-5 " />

             
          {errMsg ?
              
              <p className=" bg-white text-red-600 w-full up    text-center font-semibold py-3  rounded-md">
                {errMsg}
          </p>
            
            
            : ""}

          
          <button
            type="submit"
            className={`mt-5 w-full py-2 uppercase text-base font-bold tracking-wide text-gray-300 rounded-md hover:text-white hover:bg-indigo-600 duration-200 ${"bg-indigo-700"}`}
          >
            {SingIn}
          </button>

          <p className=" text-sm text-gray-400 text-center my-5">
            Does not have an Account{" "}
            <span
              className="font-bold 
                           cursor-pointer
                          underline text-white"
              onClick={() => SetValue("REGISTRATION FORM")}
            >
              Register
            </span>
          </p>
        </form>
      ) : (
        <form
          onSubmit={handleRegistration}
          className=" bg-[#030712] rounded-md p-10 text-white"
        >
          <h1 className=" text-xl font-bold">{SingUp}</h1>
          <p className=" text-gray-500 text-sm">
            You need provide required information to get register with us.
          </p>

          <div className=" w-full  h-[1px] bg-gray-700 my-4 " />

          <div className=" flex  justify-between items-center  gap-5">
            <div className=" space-y-4  w-full  ">
              <label htmlFor="firstName" className=" block cursor-pointer">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="  rounded-md py-1 w-full
                      text-black
                       font-normal
                       px-1
                       outline-none
                        duration-100
                       focus:border-[#4338ca] focus:border-2 
                      "
              />
            </div>

            <div className=" space-y-4 w-full  ">
              <label htmlFor="lastName" className=" cursor-pointer block">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="rounded-md py-1 w-full
                      text-black
                       font-normal
                       px-1
                       outline-none
                        duration-100
                       focus:border-[#4338ca] focus:border-2 
                      "
              />
            </div>
          </div>

          <div className=" space-y-4 w-full my-3 ">
            <label htmlFor="email" className=" block">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="rounded-md py-1 w-full
                      text-black
                       font-normal
                       px-1
                       outline-none
                        duration-100
                       focus:border-[#4338ca] focus:border-2 
                      "
            />
          </div>

          <div className=" space-y-4 w-full my-3 ">
            <label htmlFor="password" className=" block">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="rounded-md py-1 w-full
                      text-black
                       font-normal
                       px-1
                       outline-none
                        duration-100
                       focus:border-[#4338ca] focus:border-2 
                      "
            />
          </div>

          <div className=" space-y-4 w-full my-3 ">
            <p className="text-white font-semibold"> Cover photo</p>
            <div className=" w-full flex flex-col gap-6 justify-center items-center p-11 border-dashed border-gray-500 border-[1px]">
              <div className="w-14 h-14 border border-gray-600 rounded-full p-1">
                {avatar?.url ? (
                  <img
                    src={avatar?.url}
                    alt="user images"
                    className=" w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <MdPhotoLibrary className="mx-auto h-full w-full text-gray-500" />
                )}
              </div>

              <div className="mt-4 flex items-center mb-1 text-sm leading-6 text-gray-400">
                <label htmlFor="file-upload">
                  <span className="relative cursor-pointer rounded-md px-2 py-1 bg-gray-900 font-semibold text-gray-200 hover:bg-gray-800">
                    Upload a file
                  </span>
                  <input
                    type="file"
                    name="file-upload"
                    id="file-upload"
                    className="sr-only"
                    onChange={handleAvatar}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>

              <p className="text-xs leading-5 text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
              </div>
              
              {errMsg ?
              
                <p className=" bg-white text-red-600 w-full up    text-center font-semibold py-3  rounded-md">
                  {errMsg}
            </p>
              
              
              : ""}

            

            <button
              type="submit"
              className={`mt-5 w-full py-2 uppercase text-base font-bold tracking-wide text-gray-300 rounded-md hover:text-white hover:bg-indigo-600 duration-200 
                bg-indigo-700
              `}
            >
              {loading?"loading....":"Send"}
            </button>
          </div>

          <div className=" w-full  h-[1px] bg-gray-700 my-5 " />

          <p className=" text-sm text-gray-400 text-center my-5">
            Does not have an Account{" "}
            <span
              className="font-bold 
                           cursor-pointer
                          underline text-white"
              onClick={() => SetValue("SIGN IN")}
            >
              Login
            </span>
            </p>
            {loading && <Loading/>}
        </form>
      )}
    </Container>
  );
}

export default Form;
