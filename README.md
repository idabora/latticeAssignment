## Libraries/Frameworks Used

- **Node.js**: Server-side runtime for JavaScript.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database used for data storage.
- **Multer**: Middleware for handling file uploads.
- **Validator**: Library for string validation.

## API Endpoints
1. POST /api/registerPatients
Description: Register new patients.
Request:
name: Name of the patient.
address: Address of the patient.
email: Email of the patient.
phone: Phone number of the patient.
password: Password for the patient.
photo: Photo file (JPEG) of the patient.
Response:
patient: Created patient object.
Error Response:
400 Bad Request: Missing required fields.
2. GET /api/hospitals
Description: Retrieve hospital details.
Request:
hospitalId: Id of the hospital.
Response:
hospital: Hospital details.
Error Response:
400 Bad Request: Missing hospitalId.
Add other API endpoints with details

## File Upload
File upload is handled using Multer middleware.
The uploaded photo is stored with a filename based on the current date.
## POSTMAN URL LINK
https://api.postman.com/collections/19430201-af27a969-de64-4323-b23f-ac55e38732c4?access_key=PMAT-01HNB2YNZN8J9J5CGN051BPJKE
