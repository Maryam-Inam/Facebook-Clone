/* eslint-disable @next/next/no-img-element */
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import {
  VideoCameraIcon,
  CameraIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { db, storage } from "../../firebase";
import firebase from "firebase/compat/app";

function InputBox() {
  const { data: session } = useSession();
  const imageUrl = session?.user?.image;
  const username = session?.user?.name;
  const inputRef = useRef();
  const filePickerRef = useRef();
  const [imageToPost, setImageToPost] = useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    // db.collection("posts")
    //   .add({
    //     message: inputRef.current.value,
    //     name: session.user.name,
    //     email: session.user.email,
    //     image: session.user.image,
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   })
    //   .then((doc) => {
    //     if (imageToPost) {
    //       const uploadTask = storage.ref(
    //         `posts/${doc.id}`.putString(imageToPost, "data_url")
    //       );
    //       removeImage;
    //       uploadTask.on(
    //         "state_change",
    //         null,
    //         (error) => console.log(error),
    //         () => {
    //           //when the upload completes
    //           storage
    //             .ref("posts")
    //             .child(doc.id)
    //             .getDownloadURL()
    //             .then((url) => {
    //               db.collection("posts").doc(doc.id).set(
    //                 {
    //                   postImage: url,
    //                 },
    //                 { merge: true }
    //               );
    //             });
    //         }
    //       );
    //     }
    //   });

    const postsCollection = collection(db, "posts");

    addDoc(postsCollection, {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    })
      .then((docRef) => {
        if (imageToPost) {
          const storageRef = ref(storage, `posts/${docRef.id}`);
          const uploadTask = uploadString(storageRef, imageToPost, "data_url");

          uploadTask.then(() => {
            getDownloadURL(storageRef)
              .then((url) => {
                setDoc(
                  doc(db, "posts", docRef.id),
                  { postImage: url },
                  { merge: true }
                );
              })
              .catch((error) => {
                console.log("Error getting download URL:", error);
              });
          });
        }
      })
      .catch((error) => {
        console.log("Error adding document:", error);
      });

    inputRef.current.value = "";
  };
  const addImagetoPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
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
          src={imageUrl}
          alt=""
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${username}?`}
          />
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110
            transition duration-150 hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
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
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImagetoPost}
            type="file"
            hidden
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yello-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
