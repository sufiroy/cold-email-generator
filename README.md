# Cold Email Generator 🚀

An AI-powered cold email generator built with Next.js 14, OpenAI's GPT-4o-mini, and Tailwind CSS.

## Features

✨ **Generate 3 Email Variations** in seconds:
- Short (80-100 words) - Quick & punchy
- Medium (180-200 words) - Balanced
- Professional (280-300 words) - Detailed

🎯 **Highly Personalized** based on:
- Your name and service
- Prospect's name, company, and job title
- Specific pain point to address

🔐 **Secure & Private** - Your data stays on your device

⚡ **Fast** - Get results in under 10 seconds

📋 **Easy to Use** - Just 6 form fields

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (gpt-4o-mini)
- **Database**: Supabase (coming soon)
- **Payment**: Lemon Squeezy (coming soon)
- **Auth**: Supabase Auth (coming soon)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sufiroy/cold-email-generator.git
cd cold-email-generator
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment template:
```bash
cp .env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Go to the dashboard: `/dashboard`
2. Fill in the form:
   - Your name
   - Your service/product
   - Prospect's name, company, and job title
   - The pain point you want to address
3. Click "Generate Email Variations"
4. Copy any of the 3 variations and customize as needed

## Project Structure

```
.
├── app/
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── email-form.tsx    # Email generation form
│   └── email-display.tsx # Email display component
├── lib/
│   ├── api/              # API integration
│   ├── prompts/          # AI prompts
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── public/               # Static assets
├── .env.example          # Environment variables template
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## API Endpoints

### POST `/api/generate`
Generates 3 cold email variations.

**Request:**
```json
{
  "senderName": "John Smith",
  "senderService": "Cloud migration consulting",
  "prospectName": "Sarah Johnson",
  "prospectCompany": "TechCorp Inc",
  "prospectJobTitle": "CTO",
  "painPoint": "Struggling with slow database queries and need modern cloud infrastructure"
}
```

**Response:**
```json
{
  "success": true,
  "emails": {
    "short": "...",
    "medium": "...",
    "professional": "..."
  },
  "usage": {
    "prompt_tokens": 500,
    "completion_tokens": 300,
    "total_tokens": 800
  }
}
```

## Prompt Engineering

The AI uses a sophisticated prompt system:

1. **System Prompt** - Defines the AI's role and 10 core email writing principles
2. **User Prompt** - Creates specific instructions based on user input
3. **Email Parser** - Extracts 3 variations from AI response
4. **Input Validation** - Ensures data quality before API calls

See `lib/prompts/email-generator.ts` for details.

## Pricing (Future)

- **Free Plan**: 3 emails/day
- **Pro Plan**: Unlimited emails ($9/month)

## Coming Soon

- [ ] Supabase database integration
- [ ] Email history and analytics
- [ ] Lemon Squeezy payment integration
- [ ] Supabase Auth with Google login
- [ ] Advanced email customization
- [ ] A/B testing suggestions
- [ ] Email performance tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please create a GitHub issue.

## Author

Created by [sufiroy](https://github.com/sufiroy)
