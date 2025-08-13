Client:

- [ ] Make required input fields more visually effective
- [ ] Sucessful checkout page
- [ ] Failed checkout page
- [ ] Send email about successful payment and retreat info
- [ ] Implement QR code for each user that includes in that email

Sever:

- [x] Make fulfillCheckout function safe to run mult. items concurrently with the same session ID
- [x] Check fulfillment for checkout sessions
- [x] Backup Database
- [x] Store paid or unpaid results in both database
- [ ] TypeScript Conversion
- [ ] Test

General Questions:
How do I deploy my client app, server, and stripe ws?
Look into turborepo
How can we mantain the state of the form if they hit checkout but then cancel

What are atomic and idempotceny? These seem to be key features that i'm missing
