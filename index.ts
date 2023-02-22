import { CreateAndDrawCore, CreateAndDrawObjects } from "./functions.js";
import { Point } from "./types.js";

export const OBJECT_COUNT = 40000;

const body = document.querySelector("body")!;

export const objects = [] as Point[];
export const cores = [] as Point[];
export const HTMLObjects = [] as HTMLDivElement[];
export const HTMLCores = [] as HTMLDivElement[];

CreateAndDrawObjects(OBJECT_COUNT);

CreateAndDrawCore(
  new Point(
    Math.floor(Math.random() * (window.innerWidth - 10)),
    Math.floor(Math.random() * (window.innerHeight - 10))
  )
);

const iteration = (): void => {
  // Вычисляем позицию нового ядра
  const newCore = cores.reduce(
    (acc, center, index) => {
      const maxPoint = objects
        .filter((point) => point.getIndex() === index)
        .reduce(
          (acc, point) => {
            const distance = Math.sqrt(
              (center.left - point.left) ** 2 + (center.top - point.top) ** 2
            );

            return distance > acc.distance
              ? {
                  distance,
                  point,
                }
              : acc;
          },
          {
            distance: Number.MIN_VALUE,
            point: new Point(0, 0),
          }
        );
      return maxPoint.distance > acc.distance ? maxPoint : acc;
    },
    {
      distance: Number.MIN_VALUE,
      point: new Point(0, 0),
    }
  );

  // Условие появления нового ядра
  let avgDistance = 0;
  for (let i = 0; i < cores.length - 1; i++) {
    for (let j = i + 1; j < cores.length; j++) {
      avgDistance += Math.sqrt(
        (cores[i].left - cores[j].left) ** 2 +
          (cores[i].top - cores[j].top) ** 2
      );
    }
  }
  avgDistance = avgDistance / (cores.length * (cores.length - 1));

  if (newCore.distance < avgDistance) {
    window.alert(`${cores.length} clusters`);
    window.location.reload();
    clearInterval(handler);
    return;
  }

  if (newCore.distance > 0) {
    CreateAndDrawCore(newCore.point);
  }

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
};

const handler = setInterval(iteration, 1000);
