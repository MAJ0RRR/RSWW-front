import { ReactNode, createContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export interface WebsocketContextType {
  lastJsonMessageTours: any;
  readyStateTours: ReadyState;
  lastJsonMessageDiscounts: any;
  readyStateDiscounts: ReadyState;
}

const WebsocketContext = createContext<WebsocketContextType | null>(null);

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const { lastJsonMessage: lastJsonMessageTours, readyState: readyStateTours } =
    useWebSocket(`${window.location.origin}/ws/tours`, {
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
        lastJsonMessageTours,
        readyStateTours,
        lastJsonMessageDiscounts,
        readyStateDiscounts,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketContext;
