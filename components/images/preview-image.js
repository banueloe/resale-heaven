import Image from "next/image";

const PreviewImage = ({ image, index, setImages }) => {
  const handleClick = () => {
    setImages((prevImages) => {
      let tempImages = [...prevImages];
      tempImages[index] = null;
      return tempImages;
    });
  };

  return (
    <div className="margin-16 cursor-pointer">
      <Image
        src={URL.createObjectURL(image)}
        alt="Preview Image"
        priority={true}
        height="106"
        width="172"
        onClick={handleClick}
      />
    </div>
  );
};

export default PreviewImage;
