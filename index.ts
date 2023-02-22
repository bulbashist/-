import { CreateAndDrawCores, CreateAndDrawObjects } from "./drawings.js";
import { Point } from "./types.js";

export const OBJECT_COUNT = 40000;
export const CLUSTER_COUNT = 9;

export const objects = [] as Point[];
export const cores = [] as Point[];
export const HTMLObjects = [] as HTMLDivElement[];
export const HTMLCores = [] as HTMLDivElement[];

CreateAndDrawCores(9);
CreateAndDrawObjects(40000);

const iteration = () => {
  // Определяем принадлежность кластеру
  objects.map((point, i) => {
    let initDistance = Number.MAX_VALUE;

    cores.map((center, j) => {
      const distance = Math.sqrt(
        (center.left - point.left) ** 2 + (center.top - point.top) ** 2
      );
      if (distance < initDistance) {
        point.setIndex(j);
        initDistance = distance;
        HTMLObjects[i].style.backgroundColor = point.color;
      }
    });
  });

  // Прекратить итерации при оптимальных кластерах
  let shouldContinue = CLUSTER_COUNT;

  // Перерасчет позиций ядер кластеров
  cores.map((center, index) => {
    const cluster = objects.filter((point) => point.getIndex() === index);

    const newLeft = Math.floor(
      cluster.reduce((acc, curr) => acc + curr.left, 0) / cluster.length
    );
    const newTop = Math.floor(
      cluster.reduce((acc, curr) => acc + curr.top, 0) / cluster.length
    );

    if (center.left === newLeft && center.top === newTop) shouldContinue--;

    center.left = newLeft;
    center.top = newTop;
    HTMLCores[index].style.top = newTop + "px";
    HTMLCores[index].style.left = newLeft + "px";
  });

  if (!shouldContinue) clearInterval(handler);
};

// Вызов для изначальной окраски
iteration();

// Дальнейшие итерации
const handler = setInterval(iteration, 500);
