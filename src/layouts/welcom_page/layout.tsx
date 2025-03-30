import Button from "../../components/button/component";
import Input from "../../components/input_field/component";
import Label from "../../components/label/component";
import logo from "../../assets/logo_theverma.png";
import { dataType } from "../../types/types";
import { useCallback } from "react";

type props = {
  data: dataType;
  setData: (data: dataType) => void;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
  setIsView?: (value: boolean) => void;
  isViewLoading?: boolean;
  setIsViewLoading?: (value: boolean) => void;
};

const WelcomeLayout = ({ ...props }: props) => {
  const onChangeName = useCallback(
    (value: string) => {
      props.setData({
        ...props.data,
        name: value,
      });
    },
    [props.data, props.setData]
  );
  const onChangeNumber = useCallback(
    (value: string) => {
      if (!Number.isNaN(Number(value)) && /^\d*$/.test(value)) {
        props.setData({
          ...props.data,
          number: value,
        });
      }
    },
    [props.data, props.setData]
  );
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center gap-2">
        <div className="w-full flex items-center justify-center">
          <img src={logo} className="w-1/2" />
        </div>
        <div className="w-full flex items-center justify-center">
          <Label className="text-3xl">Generate Invition Card</Label>
        </div>
        <div className="w-full mt-5">
          <Input
            placeholder="Enter the name..."
            onChange={(event) => onChangeName(event.target.value)}
            disabled={props.isLoading}
          />
        </div>
        <div className="w-full">
          <Input
            placeholder="Enter the whatsapp number"
            onChange={(event) => onChangeNumber(event.target.value)}
            disabled={props.isLoading}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-4 mt-5">
          <Button
            isLoading={props.isViewLoading}
            onClick={() => {
              props.setIsViewLoading && props.setIsViewLoading(true);
              if (props.data.name.trim() === "" || props.data.number.trim() === "") {
                alert("Please fill the name and number");
                props.setIsViewLoading && props.setIsViewLoading(false);
                return;
              }
              setTimeout(() => {
                props.setIsView && props.setIsView(true);
                props.setIsViewLoading && props.setIsViewLoading(false);
              }, 2000);
            }}
          >
            View
          </Button>
          <Button>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeLayout;
