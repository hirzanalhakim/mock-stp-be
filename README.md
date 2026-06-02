# Mock STP API

Mock API GET-only untuk Vercel dengan sumber data dari file JSON di root project.

## Endpoint

- `GET /screen/0` -> `email_form.json`
- `GET /screen/1` -> `e-ktp_details_form.json`
- `GET /screen/2` -> `employment_details_form.json`
- `GET /screen/3` -> `confirmation.json`
- `GET /screen/4` -> `submitted.json`

## Screen Order

1. `email_form`
2. `e-ktp_details_form`
3. `employment`
4. `confirmation`
5. `submitted`

## Notes

- CORS dibuka untuk semua origin (`Access-Control-Allow-Origin: *`)
- Hanya mendukung `GET` dan `OPTIONS`
- Jika screen tidak ada, API mengembalikan `404`
