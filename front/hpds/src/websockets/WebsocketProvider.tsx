import { ReactNode, createContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export interface WebsocketContextType {
  lastJsonMessageToursReserved: any;
  lastJsonMessageToursBought: any;
  lastJsonMessageDiscounts: any;
  readyStateToursReserved: ReadyState;
  readyStateToursBought: ReadyState;
  readyStateDiscounts: ReadyState;
}

const WebsocketContext = createContext<WebsocketContextType | null>(null);

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const {
    lastJsonMessage: lastJsonMessageToursReserved,
    readyState: readyStateToursReserved,
  } = useWebSocket(`${window.location.origin}/ws/tours/reserved`, {
    share: false,
    shouldReconnect: () => true,
  });

  const {
    lastJsonMessage: lastJsonMessageToursBought,
    readyState: readyStateToursBought,
  } = useWebSocket(`${window.location.origin}/ws/tours/bought`, {
    share: false,
    shouldReconnect: () => true,
  });

  const {
    lastJsonMessage: lastJsonMessageDiscounts,
    readyState: readyStateDiscounts,
  } = useWebSocket(`${window.location.origin}/ws/discounts`, {
    share: false,
    shouldReconnect: () => true,
  });

  // Pass the required values to the provider
  return (
    <WebsocketContext.Provider
      value={{
        lastJsonMessageToursReserved,
        lastJsonMessageToursBought,
        lastJsonMessageDiscounts,
        readyStateToursReserved,
        readyStateToursBought,
        readyStateDiscounts,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketContext;
