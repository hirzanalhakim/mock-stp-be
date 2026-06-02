# Mock STP API

Mock API untuk Vercel dengan sumber data dari file JSON di root project.

## Endpoint

- `GET /screen/0` -> `email_form.json`
- `GET /screen/1` -> `e-ktp_details_form.json`
- `GET /screen/2` -> `employment_details_form.json`
- `GET /screen/3` -> `confirmation.json`
- `GET /screen/4` -> `submitted.json`
- `POST /screen/0` -> return payload `e-ktp_details_form.json`
- `POST /screen/1` -> return payload `employment_details_form.json`
- `POST /screen/2` -> return payload `confirmation.json`
- `POST /screen/3` -> return payload `submitted.json`
- `POST /screen/4` -> return `409` karena tidak ada next screen

## Screen Order

1. `email_form`
2. `e-ktp_details_form`
3. `employment`
4. `confirmation`
5. `submitted`

## Notes

- CORS dibuka untuk semua origin (`Access-Control-Allow-Origin: *`)
- Mendukung `GET`, `POST`, dan `OPTIONS`
- Body `POST` diterima untuk kebutuhan mock submit, tetapi saat ini tidak diproses
- Jika screen tidak ada, API mengembalikan `404`
