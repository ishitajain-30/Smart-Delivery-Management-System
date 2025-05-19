# Smart Delivery Management System

A modern delivery management dashboard focusing on partner management and smart order assignments.

## Features

### Partner Management

- Partner registration form
- Partner list view
- Profile editing
- Area management
- Shift scheduling

### Order Processing

- Orders dashboard
- Status tracking
- Assignment history
- Performance metrics

### Assignment System

- Smart assignment algorithm
- Assignment metrics
- Real-time tracking

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: Redux Toolkit
- **API**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/ishitajain-30/Smart-Delivery-Management-System.git
   <!-- cd smart-delivery-management -->

   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

smart-delivery-management/
├── app/ # Next.js App Router
│ ├── api/ # API Routes
│ ├── assignments/ # Assignments page
│ ├── orders/ # Orders page
│ ├── partners/ # Partners page
│ └── page.tsx # Dashboard page
├── components/ # React components
├── lib/ # Utility functions and Redux store
│ ├── redux/ # Redux store and slices
│ └── assignment-algorithm.ts # Smart assignment algorithm
├── types/ # TypeScript type definitions
└── public/ # Static assets

## API Routes

### Partner Routes

- `GET /api/partners` - Get all partners
- `POST /api/partners` - Create a new partner
- `PUT /api/partners/[id]` - Update a partner
- `DELETE /api/partners/[id]` - Delete a partner

### Order Routes

- `GET /api/orders` - Get all orders
- `POST /api/orders/assign` - Assign an order to a partner
- `PUT /api/orders/[id]/status` - Update order status

### Assignment Routes

- `GET /api/assignments/metrics` - Get assignment metrics
- `POST /api/assignments/run` - Run the assignment algorithm

## Assignment Algorithm

The smart assignment algorithm takes into account:

1. Partner availability (status and current load)
2. Area coverage
3. Partner shift times
4. Partner performance metrics

## License

This project is licensed under the MIT License - see the LICENSE file for details.
