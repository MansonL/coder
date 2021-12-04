import { createContext } from "react";
import { IMongoUser } from "../../../../server/src/interfaces/interfaces";

const UserContext = createContext<IMongoUser>();