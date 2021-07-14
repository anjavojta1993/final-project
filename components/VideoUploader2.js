export default function VideoUploader(file) {
  return (
    <>
      <div>
        <button onClick={handleVideoUpload} type="button">
          Browse
        </button>
      </div>
      <input
        type="file"
        id="upload-video"
        name="upload-video"
        accept="video/*"
        onChange={(event) =>
          event.target.files && event.target.files[0]
            ? handleMediaUpload(event.target.files[0])
            : null
        }
      />
      ;
    </>
  );
}
