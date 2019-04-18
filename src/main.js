///// My Top 3 Lacks /////////////
// lack of structure            //
// lack of coaching/mentorship  //
// lack of resources            //
//////////////////////////////////

import "./stage";
import loop from "./loop";
import commandStream$ from "./command$";
import commandStore from "./commandStore";
import commandDisplay from "./commandDisplay";
import "./sass/controller.scss";

commandStore(commandStream$);
commandDisplay(commandStream$);

loop();