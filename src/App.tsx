import { useState } from "react";
import WelcomeLayout from "./layouts/welcom_page/layout";
import { dataType } from "./types/types";
import GenerateCardLayout from "./layouts/card_template/layout";
import Label from "./components/label/component";

function App() {
  const [data, setData] = useState<dataType>({
    name: "",
    number: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const [isViewLoading, setIsViewLoading] = useState<boolean>(false);

  return (
    <>
      <div className="hidden md:flex flex-col items-center justify-center w-screen h-screen">
        <Label>
          This is a mobile first design, please view on mobile or resize your
          browser
        </Label>
      </div>
      <div className="md:hidden w-screen h-screen flex flex-col justify-center items-center">
        {isView ? (
          <GenerateCardLayout data={data} onClose={() => setIsView(false)} />
        ) : (
          <WelcomeLayout
            data={data as dataType}
            setData={setData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsView={setIsView}
            isViewLoading={isViewLoading}
            setIsViewLoading={setIsViewLoading}
          />
        )}
      </div>
    </>
  );
}

export default App;
