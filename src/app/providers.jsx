"use client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import LenisWrapper from "../components/lenis/leniswrapper";

export default function Providers({ children }) {
  return  <Provider store={store}>
      <LenisWrapper>{children}</LenisWrapper>
    </Provider>;
}


