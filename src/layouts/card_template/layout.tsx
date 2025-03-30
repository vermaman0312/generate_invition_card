import { useRef } from "react";
import blank_card from "../../assets/blank_card.png";
import Label from "../../components/label/component";
import Button from "../../components/button/component";
import { dataType } from "../../types/types";
import { staticData } from "../../locales/static_data";
import domToImage from "dom-to-image";

type props = {
  data?: dataType;
  onClose?: () => void;
};

const GenerateCardLayout = ({ ...props }: props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (cardRef.current) {
      domToImage
        .toPng(cardRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${props.data?.name}_invitation.png`;
          link.click();
          if (props.onClose) props.onClose();
        })
        .catch((error) => console.error("Error generating image:", error));
    }
  };

  const sendToWhatsApp = (imageUrl: string) => {
    if (!props.data?.number) {
      alert("No WhatsApp number provided!");
      return;
    }
    const whatsappNumber = props.data.number.replace("+", "").trim();
    const message = encodeURIComponent("Here is your invitation card 📩");
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.open(whatsappUrl, "_blank");
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `${props?.data?.name}_invitation.png`, {
          type: "image/png",
        });
        console.log("Generated Image File:", file);
      })
      .catch((error) => console.error("Error converting image:", error));
  };

  const generateImage = async () => {
    if (cardRef.current) {
      domToImage
        .toPng(cardRef.current)
        .then((dataUrl) => {
          sendToWhatsApp(dataUrl);
        })
        .catch((error) => console.error("Error generating image:", error));
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <div
        ref={cardRef}
        className="w-full h-[46rem] relative flex-shrink-0"
        style={{
          backgroundImage: `url(${blank_card})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "start",
        }}
      >
        <div className="absolute w-full flex items-center justify-center top-[7rem]">
          <Label className="text-4xl font-extrabold text-green-700">
            {staticData["hi-IN"].title}
          </Label>
        </div>
        <div className="absolute w-full flex items-center justify-center top-[9.8rem]">
          <Label className="text-3xl font-normal text-green-600">
            {staticData["hi-IN"].subTitle}
          </Label>
        </div>
        <div className="absolute w-full flex items-center justify-center top-[12.5rem]">
          <Label className="text-xl font-normal text-gray-600">
            {staticData["hi-IN"].description}
          </Label>
        </div>
        <div className="absolute w-full flex items-center justify-center top-[14.5rem]">
          <Label className="text-xl font-extrabold text-gray-700 text-center px-8">
            {staticData["hi-IN"].subDescription}
          </Label>
        </div>
        <div className="absolute w-full flex items-center justify-center top-[18.5rem]">
          <Label className="text-xl font-normal text-gray-600 text-center px-8">
            {staticData["hi-IN"].subDescription2}
          </Label>
        </div>

        <div className="absolute w-full h-36 flex flex-col items-center justify-center top-[25.5rem]">
          {staticData["hi-IN"].events.map((event, index) => {
            return (
              <div key={index} className="w-full flex flex-col items-center justify-center">
                <Label className="text-md font-normal underline text-green-600 text-center px-8">
                  {`${event.day} - ${event.date}`}
                </Label>
                <Label className="text-md font-normal text-gray-700 text-center px-8">
                  {`${
                    event.title
                  } ---------- ${`${event.subTime} ${event.time}`}`}
                </Label>
              </div>
            );
          })}
        </div>

        <div className="absolute w-full flex items-center justify-center top-[35.5rem]">
          <Label className="text-xl font-bold text-gray-600 text-start px-8">
            {`${staticData["hi-IN"].name}: ${props.data?.name}`}
          </Label>
        </div>

        <div className="absolute w-full flex items-center justify-center top-[38.5rem]">
          <Label className="text-xl font-bold text-gray-600 text-start px-8">
            {staticData["hi-IN"].place}
          </Label>
        </div>
        <div className="absolute w-full flex items-center justify-center top-[40rem]">
          <Label className="text-xl font-normal text-gray-600 text-start px-8">
            {staticData["hi-IN"].address}
          </Label>
        </div>
        <div className="absolute w-full flex items-center justify-center top-[42rem]">
          <Label className="text-xl font-bold text-gray-600 text-start px-8">
            {staticData["hi-IN"].execute}
          </Label>
        </div>
        <div className="absolute w-full flex items-center justify-center top-[43.5rem]">
          <Label className="text-xl font-normal text-gray-600 text-start px-8">
            {staticData["hi-IN"].naam}
          </Label>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
        <Button onClick={downloadImage}>Save & Close</Button>
        <Button onClick={generateImage}>Send</Button>
      </div>
    </div>
  );
};

export default GenerateCardLayout;
