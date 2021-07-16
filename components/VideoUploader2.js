import { css } from '@emotion/react';
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
  const handleVideoUpload = (event) => {
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
        setVideoUrl(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleVideoUpload} enctype="multipart/form-data">
        {/* <label htmlFor="files" class="btn">
          Select Video
        </label> */}
        <input id="myFile" type="file" accept="video/*" />
        <br />
        <br />
        Result:
        <br />
        <pre>{JSON.stringify(videoUrl, null, 2)}</pre>
        <div>
          <input type="submit" />
          {/* <button css={coloredButtonStyles} type="submit">
            Save
          </button> */}
        </div>
      </form>
    </div>
  );
}
