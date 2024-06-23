import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  FaceSmileIcon,
  CameraIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

type FormOrMouseEvent =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLButtonElement>
  | React.ChangeEvent<HTMLInputElement>;

const InputBox = () => {
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  const sendPost = async (e: FormOrMouseEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        message: inputRef.current?.value,
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        timestamp: serverTimestamp(),
      });

      if (imageToPost) {
        const imageRef = ref(storage, `posts/${docRef.id}`);
        await uploadString(imageRef, imageToPost as string, "data_url");

        const downloadURL = await getDownloadURL(imageRef);

        await setDoc(
          doc(db, "posts", docRef.id),
          { postImage: downloadURL },
          { merge: true }
        );
        removeImage();
      }

      inputRef.current.value = "";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const addImageToPost = (e: FormOrMouseEvent) => {
    const reader = new FileReader();
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      reader.readAsDataURL(target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target?.result || null);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          alt="Profile Image"
          src={session?.user?.image || "An image should be here"}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session?.user?.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img
              className="h-10 object-contain"
              src={imageToPost}
              alt="Image"
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filepickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filepickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>
        <div className="inputIcon">
          <FaceSmileIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
