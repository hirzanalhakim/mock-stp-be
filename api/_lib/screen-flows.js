const exampleScreens = [
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

const applyKtaScreens = [
  {
    name: "apply_kta_ektp_flow",
    payload: require("../../apply-kta/apply_kta_ektp_flow.json"),
  },
  {
    name: "apply_kta_calculate_loan",
    payload: require("../../apply-kta/apply_kta_calculate_loan.json"),
  },
  {
    name: "apply_kta_npwp",
    payload: require("../../apply-kta/apply_kta_npwp.json"),
  },
  {
    name: "apply_kta_credit_card_details",
    payload: require("../../apply-kta/apply_kta_credit_card_details.json"),
  },
  {
    name: "apply_kta_emergency_contact_details",
    payload: require("../../apply-kta/apply_kta_emergency_contact_details.json"),
  },
  {
    name: "apply_kta_correspondence_address",
    payload: require("../../apply-kta/apply_kta_correspondence_address.json"),
  },
  {
    name: "apply_kta_select_disbursement_account",
    payload: require("../../apply-kta/apply_kta_select_disbursement_account.json"),
  },
  {
    name: "apply_kta_terms_conditions",
    payload: require("../../apply-kta/apply_kta_terms_conditions.json"),
  },
  {
    name: "apply_kta_confirmation",
    payload: require("../../apply-kta/apply_kta_confirmation.json"),
  },
  {
    name: "apply_kta_success",
    payload: require("../../apply-kta/apply_kta_success.json"),
  },
];

const flows = {
  example: exampleScreens,
  "apply-kta": applyKtaScreens,
};

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
}

function getFlowScreens(flow) {
  return flows[flow] ?? null;
}

module.exports = {
  flows,
  getFlowScreens,
  setCorsHeaders,
};
