import { Point } from "./types.js";
import { objects, cores, HTMLObjects, HTMLCores } from "./index.js";

export const CreateAndDrawObjects = (count: number) => {
  const body = document.querySelector("body")!;
  const fragment = new DocumentFragment();

  for (let i = 0; i < count; i++) {
    const left = Math.floor(Math.random() * (window.innerWidth - 10));
    const top = Math.floor(Math.random() * (window.innerHeight - 10));

    const elem = document.createElement("div");
    elem.style.position = "absolute";
    elem.style.left = left + "px";
    elem.style.top = top + "px";
    elem.style.width = "2px";
    elem.style.height = "2px";
    elem.style.backgroundColor = "black";

    objects.push(new Point(left, top));
    HTMLObjects.push(elem);
    fragment.appendChild(elem);
  }

  body.append(fragment);
};

export const CreateAndDrawCore = (point: Point): void => {
  const body = document.querySelector("body")!;

  const elem = document.createElement("div");
  elem.style.position = "absolute";
  elem.style.left = point.left + "px";
  elem.style.top = point.top + "px";
  elem.style.width = "10px";
  elem.style.height = "10px";
  elem.style.backgroundColor = "black";

  point.setIndex(cores.length - 1);
  cores.push(point);
  HTMLCores.push(elem);
  body.append(elem);
};
