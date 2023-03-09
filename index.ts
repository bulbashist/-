import { ConfigData, Point } from "./types.js";

function tt(ptCount: number, p1: number, p2: number): void {
  const configData = new ConfigData(ptCount, p1, p2);

  document.querySelector(".info")!.innerHTML = "";

  const calculateExpVal = (j: number) => {
    const data = configData.data[j];
    return (
      data.points.reduce((acc, curr) => (acc += curr), 0) / data.points.length
    );
  };

  const expVals = [] as number[];
  expVals[0] = calculateExpVal(0);
  expVals[1] = calculateExpVal(1);

  const calculateStdDev = (j: number) => {
    const data = configData.data[j];
    return Math.sqrt(
      data.points.reduce(
        (acc, curr) => (acc += Math.pow(curr - expVals[j], 2)),
        0
      ) / data.points.length
    );
  };

  const stdDevs = [] as number[];
  stdDevs[0] = calculateStdDev(0);
  stdDevs[1] = calculateStdDev(1);

  let Pxk = (x: number, j: number) => {
    return (
      (1 / (stdDevs[j] * Math.sqrt(2 * Math.PI))) *
      Math.pow(Math.E, (-1 / 2) * Math.pow((x - expVals[j]) / stdDevs[j], 2))
    );
  };

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = 1000;
  canvas.height = 400;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "rgb(0, 255, 0)";
  for (let i = 0; i < 1000; i++) {
    const y1 = configData.data[0].probability * Pxk(i, 0) * 1000 * 100;
    ctx.fillRect(i, canvas.height - y1 + 1, 1, 1);
  }

  ctx.fillStyle = "rgb(255, 0, 0)";
  for (let i = 0; i < 1000; i++) {
    const y2 = configData.data[1].probability * Pxk(i, 1) * 1000 * 100;
    ctx.fillRect(i, canvas.height - y2 + 1, 1, 1);
  }

  let zlt1 = 0;
  let zpo1 = 0;
  let zlt2 = 0;
  let zpo2 = 0;
  for (let i = 0; i < 1000; i++) {
    const t1 = configData.data[0].probability * Pxk(i, 0);
    const t2 = configData.data[1].probability * Pxk(i, 1);

    if (t1 > t2) {
      zlt1 += t2;
      zpo2 += t2;
    }

    if (t2 > t1) {
      zpo1 += t1;
      zlt2 += t1;
    }
  }

  const dataC1 = `
  <h2>Для класса 1:</h2>
  <p>Зона ложной тревоги: ${zlt1}</p>
  <p>Зона пропуска обнаружения: ${zpo1}</p>
  <p>Суммарная ошибка классификации: ${zlt1 + zpo1}</p>
`;

  const dataBlockC1 = document.createElement("div");
  dataBlockC1.innerHTML = dataC1;
  document.querySelector(".info")!.append(dataBlockC1);

  //   const dataC2 = `
  //   <h2>Для класса 2:</h2>
  //   <p>Зона ложной тревоги: ${zlt2}</p>
  //   <p>Зона пропуска обнаружения: ${zpo2}</p>
  //   <p>Суммарная ошибка классификации: ${zlt2 + zpo2}</p>
  // `;

  //   const dataBlockC2 = document.createElement("div");
  //   dataBlockC2.innerHTML = dataC2;
  //   document.querySelector(".info")!.append(dataBlockC2);
}

tt(100, 0.3, 0.7);

document.querySelector("#btn")!.addEventListener("click", () => {
  const vals = [] as number[];
  const inputs = document.querySelectorAll(".input")!;

  inputs.forEach((input, index) => {
    vals[index] = Number((input as HTMLInputElement).value);
  });
  tt(10, vals[0], vals[1]);
});
