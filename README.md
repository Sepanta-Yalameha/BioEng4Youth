# BioEng4Youth

A React + Tailwind CSS website for BioEng4Youth, empowering the next generation of biomedical leaders.

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server (runs on http://localhost:5173)
npm run dev
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
BioEng4Youth/
├── public/
│   └── images/          # Static images and assets
│       ├── icons/       # Feature icons (Research, Outreach, Innovation)
│       └── favicon.png
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles and Tailwind imports
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind configuration (custom colors)
└── vite.config.js      # Vite configuration

```

## Pages

- **Home** (`/`) - Hero, Features (Research, Outreach, Innovation), Donation Banner, Volunteers/Partners with Contact Form
- **Programs** (`/programs`) - Bio-Innovators Lab, Medical Mentorship Circle, Global Biotech Outreach
- **Research Hub** (`/research-hub`) - Search, filter chips, Featured Projects with progress bars, Recent Publications, Sidebar
- **Get Involved** (`/get-involved`) - Hero, Volunteers/Partners, Testimonials carousel

## Color Palette

- **Navy:** `#0E1F40` (Header, footer, dark sections)
- **Teal:** `#1D969C` (Buttons, accents, highlights)
- **Text Primary:** `#333333`
- **Text Muted:** `#6C757D`

## Branding

The organization name "BioEng4Youth" features the "4" in teal (`#1D969C`) throughout the site for brand recognition.

## License

All rights reserved © 2024 BioEng4Youth
