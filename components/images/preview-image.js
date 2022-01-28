import Image from "next/image";

const PreviewImage = ({ image }) => {
  return (
    <div className="margin-16">
      <Image
        src={URL.createObjectURL(image)}
        alt="Preview Image"
        priority={true}
        height="106"
        width="172"
      />
    </div>
  );
};

export default PreviewImage;
