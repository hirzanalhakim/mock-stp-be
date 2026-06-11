# Mock STP API

Mock API untuk Vercel dengan sumber data dari file JSON di root project.

## Endpoint

### Root

- `GET /` -> status mock API dan daftar flow yang tersedia

### Example Flow

- `GET /screen/example/1` -> `email_form.json`
- `GET /screen/example/2` -> `e-ktp_details_form.json`
- `GET /screen/example/3` -> `employment_details_form.json`
- `GET /screen/example/4` -> `confirmation.json`
- `GET /screen/example/5` -> `submitted.json`
- `POST /screen/example/1` -> return payload `e-ktp_details_form.json`
- `POST /screen/example/2` -> return payload `employment_details_form.json`
- `POST /screen/example/3` -> return payload `confirmation.json`
- `POST /screen/example/4` -> return payload `submitted.json`
- `POST /screen/example/5` -> return `409` karena tidak ada next screen

### Apply KTA Flow

- `GET /screen/apply-kta/1` -> `apply_kta_ektp_flow.json`
- `GET /screen/apply-kta/2` -> `apply_kta_calculate_loan.json`
- `GET /screen/apply-kta/3` -> `apply_kta_npwp.json`
- `GET /screen/apply-kta/4` -> `apply_kta_credit_card_details.json`
- `GET /screen/apply-kta/5` -> `apply_kta_emergency_contact_details.json`
- `GET /screen/apply-kta/6` -> `apply_kta_correspondence_address.json`
- `GET /screen/apply-kta/7` -> `apply_kta_select_disbursement_account.json`
- `GET /screen/apply-kta/8` -> `apply_kta_terms_conditions.json`
- `GET /screen/apply-kta/9` -> `apply_kta_confirmation.json`
- `GET /screen/apply-kta/10` -> `apply_kta_success.json`
- `POST /screen/apply-kta/1` -> return payload `apply_kta_calculate_loan.json`
- `POST /screen/apply-kta/2` -> return payload `apply_kta_npwp.json`
- `POST /screen/apply-kta/3` -> return payload `apply_kta_credit_card_details.json`
- `POST /screen/apply-kta/4` -> return payload `apply_kta_emergency_contact_details.json`
- `POST /screen/apply-kta/5` -> return payload `apply_kta_correspondence_address.json`
- `POST /screen/apply-kta/6` -> return payload `apply_kta_select_disbursement_account.json`
- `POST /screen/apply-kta/7` -> return payload `apply_kta_terms_conditions.json`
- `POST /screen/apply-kta/8` -> return payload `apply_kta_confirmation.json`
- `POST /screen/apply-kta/9` -> return payload `apply_kta_success.json`
- `POST /screen/apply-kta/10` -> return `409` karena tidak ada next screen

## Screen Order

1. `email_form`
2. `e-ktp_details_form`
3. `employment`
4. `confirmation`
5. `submitted`

### Apply KTA

1. `apply_kta_ektp_flow`
2. `apply_kta_calculate_loan`
3. `apply_kta_npwp`
4. `apply_kta_credit_card_details`
5. `apply_kta_emergency_contact_details`
6. `apply_kta_correspondence_address`
7. `apply_kta_select_disbursement_account`
8. `apply_kta_terms_conditions`
9. `apply_kta_confirmation`
10. `apply_kta_success`

## Notes

- CORS dibuka untuk semua origin (`Access-Control-Allow-Origin: *`)
- Mendukung `GET`, `POST`, dan `OPTIONS`
- Body `POST` diterima untuk kebutuhan mock submit, tetapi saat ini tidak diproses
- Jika screen tidak ada, API mengembalikan `404`
