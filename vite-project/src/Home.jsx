import { Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from "@vidstack/react";
import { useEffect, useRef } from "react";
import { S3 } from "@aws-sdk/client-s3";
import { encode } from "./utils/s3";

const getGoogleAuthUrl = () => {
  const {
    VITE_GOOGLE_CLIENT_ID,
    VITE_GOOGLE_REDIRECT_URI,
    VITE_AWS_ACCESS_KEY_ID,
    VITE_AWS_SECRET_ACCESS_KEY,
    VITE_S3_REGION,
    VITE_S3_BUCKET,
  } = import.meta.env;
  const url = `https://accounts.google.com/o/oauth2/v2/auth`;
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    prompt: "consent",
    access_type: "offline",
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};
const googleOAuthUrl = getGoogleAuthUrl();

export default function Home() {
  const {
    VITE_AWS_ACCESS_KEY_ID,
    VITE_AWS_SECRET_ACCESS_KEY,
    VITE_S3_REGION,
    VITE_S3_BUCKET,
  } = import.meta.env;
  const s3 = new S3({
    region: VITE_S3_REGION,
    credentials: {
      secretAccessKey: VITE_AWS_SECRET_ACCESS_KEY,
      accessKeyId: VITE_AWS_ACCESS_KEY_ID,
    },
  });
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));
  const profile = JSON.parse(localStorage.getItem("profile")) || {};

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };

  // useEffect(() => {
  //   let imageTest = document.getElementById("image-test");
  //   s3.getObject(
  //     {
  //       Bucket: VITE_S3_BUCKET,
  //       Key: "images/087e647131cd0be55dde49e00.jpg",
  //     },
  //     function (errtxt, file) {
  //       if (errtxt) {
  //         console.Log("lireFic", "ERR " + errtxt);
  //       } else {
  //         console.log("lecture OK");
  //         console.log(imageTest);

  //         imageTest.src = "data:image/jpeg;base64," + encode(file.Body);

  //         console.log("data:image/jpeg;base64," + encode(file.Body));
  //       }
  //     }
  //   );
  // }, []);

  const host = import.meta.env.VITE_API_URL;
  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </span>
        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>
      <h2>Video Streaming</h2>
      <video controls width={500}>
        <source
          // video tren server code
          // src={`${host}/static/video-stream/3c6d0b9b8bbac29a5f9e42800.mp4`}
          // video tren s3
          src="https://nextjs-e-01.s3.ap-southeast-2.amazonaws.com/videos%2F3480c22f-789a-4c8e-9606-e0aebeb0ad5e.mp4"
          type="video/mp4"
        />
      </video>
      <h2>HLS Streaming</h2>

      <MediaPlayer
        title="Sprite Fight"
        src={`${host}/static/video-hls/0f12bc45-91c9-43e0-8442-0dfed11eb0c8/master.m3u8`}
        // src="http://localhost:4000/static/video-hls/90db0081-bb2f-4620-8b11-df9a8f0b5a43/master.m3u8"
        // poster='https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980'
        // thumbnails='https://media-files.vidstack.io/sprite-fight/thumbnails.vtt'
        aspectRatio={16 / 9}
        crossorigin=""
      >
        <MediaOutlet>
          <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" />
          {/* <track
            src='https://media-files.vidstack.io/sprite-fight/subs/english.vtt'
            label='English'
            srcLang='en-US'
            kind='subtitles'
            default
          /> */}
          {/* <track
            src='https://media-files.vidstack.io/sprite-fight/chapters.vtt'
            srcLang='en-US'
            kind='chapters'
            default
          /> */}
        </MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer>
      <h2>Imagemage</h2>
      <img
        src={`${host}/static/xem-image/087e647131cd0be55dde49e00.jpg`}
        alt=""
        id="image-test"
        // ref={ref}
      />
      <h1>Google oAuth 2.0</h1>
      <p className="read-the-docs">
        {isAuthenticated ? (
          <>
            <span>
              Hello my <strong>{profile.email}</strong>, you are logged in.
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleOAuthUrl}>Login with Google</Link>
        )}
      </p>
    </>
  );
}
