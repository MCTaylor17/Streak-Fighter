import key$ from "./key$";
// import controllerClick$ from "./controllerClick$";
// TODO: Merge keyStream$ and controllerClick$

key$.subscribe(E => console.log(E.command,E.pressed));

export default key$;