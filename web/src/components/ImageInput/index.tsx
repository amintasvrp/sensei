import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";

import "./styles.css";

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  getValue: (a: string | ArrayBuffer | null) => void;
}

const Input: React.FC<ImageInputProps> = ({
  label,
  name,
  getValue,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputAreaRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    getValue?: (a: string | ArrayBuffer | null) => void
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
        if (getValue) getValue(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageInputAreaClick = () => {
    inputRef.current?.click();
    if (inputAreaRef.current) inputAreaRef.current.value = "";
  };

  return (
    <div className="image-input-block">
      <label htmlFor={name}>{label}</label>
      <div
        className="image-input-area"
        ref={inputAreaRef}
        onClick={handleImageInputAreaClick}
      >
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          id={name}
          onChange={(event) => handleImageChange(event, getValue)}
          {...rest}
        />
        {!previewImage && <span>Clique aqui para escolher o avatar</span>}
        {previewImage && (
          <div>
            <span>Clique aqui para alterar o avatar</span> <br />
            <img
              src={typeof previewImage === "string" ? previewImage : ""}
              alt="Imagem selecionada"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
