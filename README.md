# Shiksha Main

## Project Overview

Shiksha Main is a comprehensive educational management platform designed to streamline administrative processes, facilitate secure transactions, and enhance user experience for both educators and learners. The system features an intuitive admin dashboard, robust authentication mechanisms, seamless payment integration, and scalable data management powered by MongoDB and Stripe.

## Features

- Modern admin dashboard for efficient management
- Secure user authentication and authorization
- Integrated Stripe payment gateway for transactions
- Scalable MongoDB database backend
- Modular and maintainable codebase

## Setup Instructions

To configure the project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/sodhruv28/shiksha-main.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**

   Create a `.env` file in the root directory and include the following variables:
   ```
   ADMIN_URL=your_admin_url
   SECRET_KEY=your_secret_key
   MONGO_URL=your_mongo_db_url
   EMAIL=your_email_id
   PASSWORD=your_email_password
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISH_KEY=your_stripe_publish_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## Usage

- Access the platform via the configured `ADMIN_URL`.
- Use the admin dashboard to manage users, courses, transactions, and settings.
- All payment transactions are securely processed through Stripe.

## Contribution Guidelines

We welcome contributions from the community! To contribute:

1. Fork this repository to your GitHub account.
2. Create a new branch for your feature or bugfix.
3. Write clear, well-documented code and commit your changes.
4. Open a pull request detailing the changes and their purpose.

Please ensure contributions adhere to the existing code style and include relevant documentation or tests where applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For support, feature requests, or to report issues, please open an issue in this repository.
