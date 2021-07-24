import { css } from '@emotion/react';
import { useState } from 'react';
import { normalText } from '../styles/sharedStyles';

const coloredButtonStyles = css`
  display: block;
  background: linear-gradient(to left, #faffd1, #a1ffce);
  font-size: ${normalText};
  text-align: center;
  font-weight: 800;
  border: none;
  width: 250px;
  padding: 20px 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-right: 5px;
  margin-bottom: 10px;
  margin-top: 20px;
  border-radius: 8px;

  :hover {
    transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    -moz-transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;

export default function VideoUploader({ videoUrl, setVideoUrl }) {
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log('event', event);
    console.log('event current target', event.currentTarget);
    console.log(
      'event currenttarget files 0',
      event.currentTarget['myFile'].files[0],
    );
    const file = event.currentTarget['myFile'].files[0];

    const formData = new FormData();
    formData.append('myFile', file);

    console.log('formdata', formData);

    fetch('/api/video-upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setVideoUrl(data.secure_url);
        console.log('data for video', data);
        console.log('data secure url', data.secure_url);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleVideoUpload}>
        <label htmlFor="files" class="btn">
          Select Video
        </label>
        <div>
          <input id="myFile" type="file" accept="video/*" />
        </div>
        <div>
          {!loading ? (
            <div />
          ) : videoUrl ? (
            <video
              alt="preview of your uploaded video"
              src={videoUrl}
              controls
              style={{ height: 300, width: 500 }}
            >
              <track
                src="captions_en.vtt"
                kind="captions"
                srcLang="en"
                label="english_captions"
              />
            </video>
          ) : (
            <img src="/images/spinner.svg" alt="video loading" />
          )}
        </div>
        <br />

        <button css={coloredButtonStyles} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}
