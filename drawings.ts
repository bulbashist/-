import { Point } from "./types.js";
import { objects, cores, HTMLObjects, HTMLCores } from "./index.js";

export const CreateAndDrawObjects = (count: number) => {
  const body = document.querySelector("body")!;
  const fragment = new DocumentFragment();

  for (let i = 0; i < count; i++) {
    const left = Math.floor(Math.random() * (window.innerWidth - 2));
    const top = Math.floor(Math.random() * (window.innerHeight - 2));

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

export const CreateAndDrawCores = (count: number): void => {
  const body = document.querySelector("body")!;
  const fragment = new DocumentFragment();

  for (let i = 0; i < count; i++) {
    const left = Math.floor(Math.random() * (window.innerWidth - 10));
    const top = Math.floor(Math.random() * (window.innerHeight - 10));

    const elem = document.createElement("div");
    elem.style.position = "absolute";
    elem.style.left = left + "px";
    elem.style.top = top + "px";
    elem.style.width = "10px";
    elem.style.height = "10px";
    elem.style.backgroundColor = "black";

    cores.push(new Point(left, top));
    HTMLCores.push(elem);
    fragment.append(elem);
  }
  body.append(fragment);
};
