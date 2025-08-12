Client:

- [ ] Make required input fields more visually effective
- [ ] Sucessful checkout page
- [ ] Failed checkout page
- [ ] Send email about successful payment and retreat info
- [ ] Implement QR code for each user that includes in that email

Sever:

- [ ] Make fulfillCheckout function safe to run mult. items concurrently with the same session ID
- [ ] Check fulfillment for checkout sessions
- [ ] Backup Database
- [ ] Store paid or unpaid results in both database
- [ ] Check and account for other payment status: server.js line 47

General Questions:
How do I deploy my client app, server, and stripe ws?
Look into turborepo
How can we mantain the state of the form if they hit checkout but then cancel

What are atomic and idempotceny? These seem to be key features that i'm missing
