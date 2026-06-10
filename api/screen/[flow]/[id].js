const { getFlowScreens, setCorsHeaders } = require("../../_lib/screen-flows");

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

  const flow = req.query.flow;
  const screens = getFlowScreens(flow);

  if (!screens) {
    return res.status(404).send(
      JSON.stringify({
        error: "Flow not found",
        requested: flow,
        availableFlows: ["example", "apply-kta"],
      }),
    );
  }

  const rawId = req.query.id;
  const screenNumber = Number.parseInt(rawId, 10);
  const screenIndex = screenNumber - 1;

  if (
    !Number.isInteger(screenNumber) ||
    screenNumber < 1 ||
    screenIndex >= screens.length
  ) {
    return res.status(404).send(
      JSON.stringify({
        error: "Screen not found",
        requested: rawId,
        flow,
        availableScreens: screens.map((screen, index) => ({
          id: index + 1,
          name: screen.name,
          path: `/screen/${flow}/${index + 1}`,
        })),
      }),
    );
  }

  if (req.method === "POST") {
    const nextScreenIndex = screenIndex + 1;

    if (nextScreenIndex >= screens.length) {
      return res.status(409).send(
        JSON.stringify({
          error: "No next screen available",
          currentScreen: {
            id: screenNumber,
            name: screens[screenIndex].name,
            path: `/screen/${flow}/${screenNumber}`,
          },
        }),
      );
    }

    return res.status(200).send(JSON.stringify(screens[nextScreenIndex].payload));
  }

  return res.status(200).send(JSON.stringify(screens[screenIndex].payload));
};
