import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

type MyDropzoneProps = {
  register: any;
  handleFileChange: any;
};

export function MyDropzone({ register, handleFileChange }: MyDropzoneProps) {
  const [fileName, setFileName] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length) {
      handleFileChange(acceptedFiles);
      setFileName(acceptedFiles[0].name);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} {...register} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="upload-photo-input">
          <DriveFolderUploadIcon />
          <span
            style={{
              fontSize: fileName && fileName.length > 15 ? ".5em" : "1em",
              marginRight: "4px",
            }}
          >
            {fileName ? fileName : "Upload Photo"}
          </span>
        </p>
      )}
    </div>
  );
}
