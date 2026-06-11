const { getFlowScreens, setCorsHeaders } = require("../_lib/screen-flows");

const LEGACY_FLOW = "example";

function resolveRequest(slug) {
  if (!Array.isArray(slug) || slug.length === 0) {
    return null;
  }

  if (slug.length === 1) {
    const legacyNumber = Number.parseInt(slug[0], 10);

    if (!Number.isInteger(legacyNumber) || legacyNumber < 0) {
      return null;
    }

    return {
      flow: LEGACY_FLOW,
      rawId: slug[0],
      screenNumber: legacyNumber + 1,
      isLegacy: true,
    };
  }

  if (slug.length === 2) {
    const screenNumber = Number.parseInt(slug[1], 10);

    if (!Number.isInteger(screenNumber) || screenNumber < 1) {
      return null;
    }

    return {
      flow: slug[0],
      rawId: slug[1],
      screenNumber,
      isLegacy: false,
    };
  }

  return null;
}

function buildPath(flow, screenNumber, isLegacy) {
  if (isLegacy) {
    return `/screen/${screenNumber - 1}`;
  }

  return `/screen/${flow}/${screenNumber}`;
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

  const resolved = resolveRequest(req.query.slug);

  if (!resolved) {
    return res.status(404).send(
      JSON.stringify({
        error: "Screen not found",
        requested: req.query.slug,
      }),
    );
  }

  const { flow, rawId, screenNumber, isLegacy } = resolved;
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

  const screenIndex = screenNumber - 1;

  if (screenIndex >= screens.length) {
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
            path: buildPath(flow, screenNumber, isLegacy),
          },
        }),
      );
    }

    return res.status(200).send(JSON.stringify(screens[nextScreenIndex].payload));
  }

  return res.status(200).send(JSON.stringify(screens[screenIndex].payload));
};
