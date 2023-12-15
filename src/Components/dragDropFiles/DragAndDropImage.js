import React, { useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DragAndDropImage(props) {
  const { file, setFile } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files["0"]);
    handleUpload(e.dataTransfer.files["0"]);
  };

  const handleUpload = (checkFile) => {
    if (checkFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageData = event.target.result;
        setSelectedFile(imageData);
      };

      reader.readAsDataURL(checkFile);
    }
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          minHeight: "100px",
          border: "1px #ccc solid",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
        }}
      >
        <div>
          <CloudUploadIcon style={{ margin: "0 auto" }} />
        </div>

        <div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={inputRef}
            hidden
            onChange={async (e) => {
              await setFile(e.target.files[0]);
              await handleUpload(e.target.files[0]);
            }}
          />
          <button
            onClick={() => inputRef.current.click()}
            style={{
              backgroundColor: "transparent",
              color: "green",
              border: "none",
              cursor: "pointer",
            }}
          >
            Click to upload
          </button>
          <span> or drag and drop SVG, PNG, or GIF (max.800x400px) </span>
        </div>
      </div>

      {selectedFile && (
        <div
          style={{
            border: "1px #ccc solid",
            borderRadius: "15px",
            marginTop: "5px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p> {file.name} </p>
            <p> {Math.floor(file.size / 1000)} KB </p>
          </div>

          <div
            style={{
              position: "relative",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "-10px",
                top: "-10px",
                height: "40px",
                border: "1px #ccc solid",
                borderRadius: "15px",
                padding: "5px",
                backgroundColor: "#eee",
              }}
            >
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "grey",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedFile(null)}
              >
                <DeleteIcon style={{ margin: "auto" }} />
              </button>
            </div>
            <img
              src={selectedFile}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
