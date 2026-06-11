const { flows, setCorsHeaders } = require("./_lib/screen-flows");

function buildFlowSummary(flowName, screens) {
  return {
    totalScreens: screens.length,
    screens: screens.map((screen, index) => ({
      id: index + 1,
      name: screen.name,
      get: `/screen/${flowName}/${index + 1}`,
      post: `/screen/${flowName}/${index + 1}`,
    })),
  };
}

module.exports = (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).send(
      JSON.stringify({
        error: "Method not allowed",
      }),
    );
  }

  return res.status(200).send(
    JSON.stringify({
      name: "mock-stp-be",
      message: "Mock API is running",
      endpoints: {
        health: "/",
        exampleLegacy: "/screen/0",
        example: "/screen/example/1",
        applyKta: "/screen/apply-kta/1",
      },
      flows: {
        example: buildFlowSummary("example", flows.example),
        "apply-kta": buildFlowSummary("apply-kta", flows["apply-kta"]),
      },
    }),
  );
};
