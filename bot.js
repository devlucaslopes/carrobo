const axios = require("axios");
const cheerio = require("cheerio");

const INITIAL_URL =
  "https://mg.olx.com.br/belo-horizonte-e-regiao/autos-e-pecas/carros-vans-e-utilitarios";

async function run() {
  const { data } = await axios.get(INITIAL_URL);

  const $ = cheerio.load(data);

  const items = $("li.sc-1fcmfeb-2");

  const cars = [];

  items.each(function () {
    const title = $(this).find("h2").text();
    const price = $(this).find("span.eoKYee").text();
    const description = $(this).find("span.sc-1j5op1p-0").text().split(" | ");

    if (!title || !price) return;

    cars.push({ title, price, description });
  });

  console.log(`Foram encontrados ${cars.length}`);
}

setInterval(() => {
  run();
}, 1000 * 3);
