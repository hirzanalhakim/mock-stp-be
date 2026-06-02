const screens = [
  {
    name: "email_form",
    payload: require("../../email_form.json"),
  },
  {
    name: "e-ktp_details_form",
    payload: require("../../e-ktp_details_form.json"),
  },
  {
    name: "employment",
    payload: require("../../employment_details_form.json"),
  },
  {
    name: "confirmation",
    payload: require("../../confirmation.json"),
  },
  {
    name: "submitted",
    payload: require("../../submitted.json"),
  },
];

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
}

module.exports = (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).send(
      JSON.stringify({
        error: "Method not allowed",
      }),
    );
  }

  const rawId = req.query.id;
  const screenIndex = Number.parseInt(rawId, 10);

  if (!Number.isInteger(screenIndex) || screenIndex < 0 || screenIndex >= screens.length) {
    return res.status(404).send(
      JSON.stringify({
        error: "Screen not found",
        requested: rawId,
        availableScreens: screens.map((screen, index) => ({
          id: index,
          name: screen.name,
          path: `/screen/${index}`,
        })),
      }),
    );
  }

  const payload = screens[screenIndex].payload;

  if (req.method === "POST") {
    const nextScreenIndex = screenIndex + 1;

    if (nextScreenIndex >= screens.length) {
      return res.status(409).send(
        JSON.stringify({
          error: "No next screen available",
          currentScreen: {
            id: screenIndex,
            name: screens[screenIndex].name,
            path: `/screen/${screenIndex}`,
          },
        }),
      );
    }

    return res.status(200).send(JSON.stringify(screens[nextScreenIndex].payload));
  }

  return res.status(200).send(JSON.stringify(payload));
};
