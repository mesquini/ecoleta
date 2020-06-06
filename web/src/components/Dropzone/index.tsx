import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from 'react-icons/fi'

import './styles.css';

interface IProps {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<IProps> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point" />
      ) : (
        <>
          {isDragActive ? (
            <p>Solte o arquivo aqui...</p>
          ) : (
            <p style={{ textAlign: "center" }}>
              <FiUpload />
              Arraste e solte a imagem do estabelecimento <br /> ou clique para
              selecionar a imagem
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Dropzone;