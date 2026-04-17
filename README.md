# KoinX Tax Loss Harvesting Tool

A professional-grade crypto tax optimization tool built for KoinX. This application helps investors minimize their tax liability by identifying unrealized losses and offsetting them against realized capital gains.

## 🚀 Key Features

- **Interactive Capital Gains Dashboard**: Real-time visualization of Pre-Harvesting and After-Harvesting gains.
- **Tax Savings Calculator**: Automatically calculates potential tax savings based on the 30% crypto tax rule.
- **Smart Asset Selection**: Interactive holdings table with STCG/LTCG breakdown and "Amount to Sell" indicators.
- **Indian Tax Compliance**: Uses INR (₹) currency and Indian tax terminology (Short-Term/Long-Term Capital Gains).
- **Premium UI/UX**: 
  - 🌗 Full Light/Dark mode support.
  - 🎨 Pixel-perfect design synchronized with Figma.
  - 📱 Fully responsive layout for desktop and mobile.
  - ⚡ Smooth animations and micro-interactions using Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Context API**: For centralized tax calculation logic.

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shreyashap/KoinX.git
   cd coinx
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📐 Project Structure

- `src/components`: UI components (layout, harvesting, ui).
- `src/context`: `HarvestingContext` for central state and calculations.
- `src/services`: Mock API services for fetching holdings and gains.
- `src/constants`: Mock data and configuration.
- `src/utils`: Currency formatters and helper functions.
