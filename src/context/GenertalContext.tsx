import { createContext } from "react";
import AuthContext from "./AuthContext";
import { ReactReduxContext } from "react-redux";

const GeneralContext = createContext({ AuthContext, ReactReduxContext });

export default GeneralContext;
