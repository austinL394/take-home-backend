import Dropzone from 'react-dropzone';
import FileTag from './FileTag';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface ImageUploadProps {
  value?: File | null;
  error?: ReactNode;
  fileIconColor?: string;
  className?: string;
  fileUploadStyle?: string;
  onChange?: (file: File | null) => void;
}

const ImageUpload = ({
  value = null,
  className = 'bg-[#F4F4F4] text-xs  py-1.5',
  fileUploadStyle = 'text-teal',
  fileIconColor = '#1F6C99',
  error,
  onChange,
}: ImageUploadProps) => {
  const handleDrop = (files: File[]) => {
    if (files?.length && onChange) onChange(files[0]);
  };

  return (
    <>
      {!value ? (
        <>
          <Dropzone
            onDrop={handleDrop}
            multiple={false}
            accept={{
              'image/jpeg': ['.jpeg', '.jpg'],
              'image/png': ['.png'],
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className={classNames(
                  `w-full border-dashed  border-[1px] rounded-[10px] flex flex-col gap-[25px] ${className}`,
                  {
                    'border-red-500': error,
                    'border-neutral-6': !error,
                  },
                )}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col gap-[5px]  font-bold">
                  <div className="flex gap-[9px] w-full justify-center  font-bold items-center">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        id="Vector"
                        d="M7 17H9V12.825L10.6 14.425L12 13L8 9L4 13L5.425 14.4L7 12.825V17ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM9 7H14L9 2V7Z"
                        fill={fileIconColor}
                      />
                    </svg>
                    <div>
                      <p className="">Drag and drop file(s) here or</p>
                      <p className={fileUploadStyle}>Upload a .JPG or .PNG file</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col  text-neutral-7">
                    {value && <div className="italic  font-extralight">1 file selected</div>}
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
          <div className="relative w-full">
            <div className="absolute text-left text-[8px]">{error}</div>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-wrap gap-[7px] mt-2 text-sm font-medium text-neutral-7">
          <FileTag name={value.name} onClick={() => onChange && onChange(null)} />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
