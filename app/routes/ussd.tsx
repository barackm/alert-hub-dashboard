import { useRef, useState } from "react";
import ActionButtons from "~/components/ussd-simulator/action-buttons";
import Keypad from "~/components/ussd-simulator/keypad";
import LoadingScreen from "~/components/ussd-simulator/loading-screen";
import ResponseMessage from "~/components/ussd-simulator/response-message";
import StatusBar from "~/components/ussd-simulator/status-bar";
import UssdInput from "~/components/ussd-simulator/ussd-input";

const supportedUssdCodes: { serviceCode: string; networkCode: string }[] = [
  {
    serviceCode: "*456#",
    networkCode: "Airtel",
  },
  {
    serviceCode: "*789#",
    networkCode: "Tigo",
  },
];

const Ussd = () => {
  const [ussdCode, setUssdCode] = useState("*123#");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [initialDial, setInitialDial] = useState(false);

  const ussdInputRef = useRef<HTMLInputElement>(null);

  const appendToUssdCode = (value: string) => {
    setUssdCode((prev) => prev + value);
    keepFocus();
  };

  const keepFocus = () => {
    ussdInputRef.current?.focus();
  };

  const sendUssd = () => {
    if (ussdCode.trim() === "") {
      setResponseMessage("Please enter a USSD code.");
      return;
    }

    if (initialDial && !/^\*[\d*#]+#$/.test(ussdCode)) {
      setResponseMessage("Invalid USSD code format. It should start and end with * and #.");
      return;
    }

    if (!initialDial && !/^[\d*#]+$/.test(ussdCode)) {
      setResponseMessage("Invalid input. Please enter only numbers, * and #.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setResponseMessage(`
CON Please select an option:
1. Report Suspicious Activity
2. Follow-up on an Alert
3. Confirm an Alert
4. Change Language
        `);
      setUssdCode("");
      setInitialDial(false);
      setLoading(false);
    }, 1000);
  };

  const handleDelete = () => {
    setUssdCode((prev) => prev.slice(0, -1));
  };

  const clearMessage = () => {
    setResponseMessage("");
    setUssdCode("");
    keepFocus();
  };

  return (
    <div className='screen relative overflow-hidden flex justify-center items-center h-screen'>
      <div className='relative flex justify-center items-center h-[700px] w-[350px] overflow-hidden '>
        <img
          src='phone-frame.png'
          alt='Phone Frame'
          className='absolute w-full h-full z-10 pointer-events-none top-0 bottom-0'
        />
        <div className='absolute top-0 w-full bottom-0 bg-white rounded-[60px] z-0 overflow-hidden'>
          <div className='relative overflow-hidden flex h-full pb-10 flex-col'>
            <StatusBar />
            <div className='h-full relative pt-10 flex flex-col'>
              <div className='flex flex-col flex-grow justify-end'>
                <UssdInput ussdCode={ussdCode} setUssdCode={setUssdCode} />
                <Keypad appendToUssdCode={appendToUssdCode} />
                <ActionButtons ussdCode={ussdCode} sendUssd={sendUssd} handleDelete={handleDelete} />
              </div>
            </div>
          </div>
          {loading && <LoadingScreen />}
          {responseMessage && (
            <ResponseMessage
              responseMessage={responseMessage}
              clearMessage={clearMessage}
              sendUssd={sendUssd}
              setUssdCode={setUssdCode}
              ussdCode={ussdCode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ussd;
