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

console.log(import.meta.env);
const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
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
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };
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
          src="http://localhost:4000/static/video-stream/3c6d0b9b8bbac29a5f9e42800.mp4"
          // video tren s3
          // src="http://localhost:4000/static/video-stream/https://nextjs-e-01.s3.ap-southeast-2.amazonaws.com/videos%2F153946e7-a123-4f5d-98c9-9ef75aab664c.mp4.mp4"
          type="video/mp4"
        />
      </video>
      <h2>HLS Streaming</h2>
      <MediaPlayer
        title="Sprite Fight"
        src="http://localhost:4000/static/video-hls/0f12bc45-91c9-43e0-8442-0dfed11eb0c8/master.m3u8"
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

      <h1>Google OAuth 2.0</h1>
      <p className="read-the-docs">
        {isAuthenticated ? (
          <>
            <span>Hello my friend, you are logged in.</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleOAuthUrl}>Login with Google</Link>
        )}
      </p>
    </>
  );
}
