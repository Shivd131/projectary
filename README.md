# projectary

A project management application built with Next.js, TypeScript, and Node.js. Uses RTK queries for sending requests from the client. Uses cognito auth, with frontend deployed on Amplify and backend on Amazon ec2.

## 📁 Directory Structure

```
└── shivd131-projectary/
    ├── README.md
    ├── client/
    │   ├── src/
    │   │   ├── app/
    │   │   ├── lib/
    │   │   └── state/
    └── server/
        ├── prisma/
        └── src/
            ├── controllers/
            └── routes/
```

[Full directory structure at the bottom]

## ✨ Features

- **Multiple Project Views**: Board, List, Table, and Timeline views
- **Priority Management**: Organize tasks by priority (Urgent, High, Medium, Low, Backlog)
- **Team Collaboration**: Manage teams and assign tasks to team members
- **Real-time Search**: Quick access to projects, tasks, and team members
- **Timeline View**: Visualize project progress and deadlines
- **Customizable Dashboard**: Personalized view of your projects and tasks

## 🚀 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL

## 💻 Installation

1. Clone the repository:
```bash
git clone https://github.com/Shivd131/projectary.git
cd projectary
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```


3. Set up the database:
```bash
cd server
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```


4. Set up AWS Cognito and Authentication:

   a. Create a User Pool in AWS Cognito:
   - Go to AWS Cognito Console
   - Create a new User Pool
   - Configure sign-in options (enable email sign-in)
   - Configure security requirements
   - Required attributes: email, username
   - Create an app client (without secret)

   b. Install required auth packages in client:
   ```bash
   cd client
   npm install @aws-amplify/ui-react aws-amplify
   ```

   c. Configure environment variables in client (.env.local):
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
   NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=your-app-client-id
   ```

   d. Required Cognito User Pool Settings:
   - Username attributes: Allow email and username
   - Password policy: Configure as needed
   - MFA: Optional (disabled by default)
   - Email verification: Required
   - Required attributes: 
     - email
     - username

The application uses AWS Amplify's Authenticator component with custom form fields for:
- Username
- Email
- Password
- Password confirmation

5. Set up the database:
```bash
cd server
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### Authentication Resources
- [AWS Amplify UI React Documentation](https://ui.docs.amplify.aws/react/connected-components/authenticator)
- [Amplify JavaScript Configuration](https://docs.amplify.aws/lib/client-configuration/configuring-amplify/q/platform/js/)
- [Cognito User Pool Configuration](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings.html)


## 🏃‍♂️ Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client (in a new terminal):
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:{PROVIDED_PORT}
- Backend: http://localhost:{PROVIDED_PORT}

## 🛠️ Technologies Used

### Frontend
- Next.js 14
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Shadcn UI

### Backend
- Node.js
- Express
- Prisma
- MySQL
- TypeScript

### AWS Cloud Infrastructure
- **Amazon RDS**: MySQL database instance
- **Amazon EC2**: Hosts the Node.js backend server
- **AWS Amplify**: Manages frontend deployment and hosting with CI/CD
- **Amazon Cognito**: Handles user authentication and authorization
- **Amazon VPC**: Provides isolated network infrastructure
- **Amazon API Gateway**: Manages API endpoints and request routing
- **AWS Lambda**: serverless functions cognito

### AWS DIAGRAM
![Projectary Screenshot](./architecture.png)

### VPC RESOURCE MAP
![Projectary Screenshot](./vpc.png)

## 🔄 API Endpoints

- `/api/projects` - Project management
- `/api/tasks` - Task management
- `/api/users` - User management
- `/api/teams` - Team management
- `/api/search` - Search functionality

## 🤝 Contributing
(The UI might have some "features"—aka bugs. Feel free to tame them)

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📂 Complete Directory Structure

```
└── shivd131-projectary/
    ├── README.md
    ├── client/
    │   ├── README.md
    │   ├── eslint.config.mjs
    │   ├── next-env.d.ts
    │   ├── next.config.mjs
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.mjs
    │   ├── tailwind.config.ts
    │   ├── tsconfig.json
    │   ├── .env.local
    │   ├── .prettierrc
    │   ├── public/
    │   └── src/
    │       ├── app/
    │       │   ├── authProvider.tsx
    │       │   ├── dashboardWrapper.tsx
    │       │   ├── globals.css
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   ├── redux.tsx
    │       │   ├── (components)/
    │       │   ├── home/
    │       │   ├── priority/
    │       │   ├── projects/
    │       │   ├── search/
    │       │   ├── settings/
    │       │   ├── teams/
    │       │   ├── timeline/
    │       │   └── users/
    │       ├── lib/
    │       │   └── utils.ts
    │       └── state/
    │           ├── api.ts
    │           └── index.ts
    └── server/
        ├── ecosystem.config.js
        ├── package-lock.json
        ├── package.json
        ├── tsconfig.json
        ├── dist/
        ├── prisma/
        │   ├── schema.prisma
        │   ├── seed.ts
        │   ├── migrations/
        │   └── seedData/
        └── src/
            ├── index.ts
            ├── controllers/
            └── routes/
```
