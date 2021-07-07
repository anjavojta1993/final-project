import { useRef, useState } from 'react';

export default function VideoUploader({ videoUrl, setVideoUrl }) {
  const fileSelect = useRef(null);
  const [progress, setProgress] = useState(0);

  async function handleVideoUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/video/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener('progress', (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        setVideoUrl(response.secure_url);
        console.log('response secure url', response.secure_url);
      }
    };

    fd.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET,
    );
    fd.append('tags', 'browser_upload');
    fd.append('file', file);
    fd.append('ablak', 'ablak');
    xhr.send(fd);
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      uploadFile(files[i]);
    }
  }

  return (
    <div>
      {videoUrl ? (
        <video
          alt={'preview of upload '}
          src={videoUrl.replace('upload/', 'upload/w_600/')}
          style={{ height: 200, width: 400 }}
        >
          <track
            src="captions_en.vtt"
            kind="captions"
            srcLang="en"
            label="english_captions"
          />
        </video>
      ) : (
        <div style={{ height: 200, width: 400 }}>
          {progress === 0 ? (
            <div>
              <button onClick={handleVideoUpload} type="button">
                Browse
              </button>
            </div>
          ) : (
            <span>{progress}%</span>
          )}

          <input
            ref={fileSelect}
            type="file"
            accept="video/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}
    </div>
  );
}
