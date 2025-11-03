# 💱 Currency Converter

A modern currency converter built with **React + TypeScript + Vite**.  
Supports real-time conversion between currencies, smart caching, and a smooth custom select component with search and keyboard navigation.

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/vitaly-kruchkov/currency-converter.git
cd currency-converter
```

### 2. Install dependencies

```bash
npm install
```

Create a .env file

```bash
VITE_API_KEY=your_api_key
```

Running locally

```bash
npm run dev
```

• Vite — fast build and dev server.
• React + TypeScript + SCSS Modules.
• clsx, LocalStorage caching.

### 3. Architecture & Key Decisions

src/
│
├── components/
│ ├── CustomSelect/
│ │ ├── CustomSelect.tsx
│ │ └── CustomSelect.module.scss
│ └── Conversion/
│ │ ├── CustomSelect.tsx
│ │ └── CustomSelect.module.scss
│ └── ConversionResult/
│ │ ├── ConversionResult.tsx
│ | └── ConversionResult.module.scss
│ └── Status/
│ │ ├── Status.tsx
│ | └── Status.module.scss
│ └── Header/
│ └── Header.tsx
│ └── Header.module.scss
│
├── constants/
│ └── cache.ts
│ └── names.ts  
│ └── symbols.ts  
│
├── hooks/
│ └── useConversesionRate.ts
│ └── useDebounce.ts
│ └── useNetworkStatus.ts
│
├── constants/
│ └── Main
| └── Main.tsx
| └── Main.module.scss
|
├── utils/
│ ├── cache.ts
│ └── format.ts
│
├── styles/
│ ├── \_colors.scss
│ ├── \_mixins.scss
│ └── global.scss
│
├── assets/
│ ├── search-icon.svg
│ ├── check-rounded.svg
│ ├── refresh-rounded.svg
│ ├── search-icon.svg
│ ├── switch-icon.svg
│ ├── wifi-off-icon.svg
│ ├── wifi-on-icon.svg
│ └── x-mark-icon.svg
│
├── App.tsx
└── main.tsx

### 4. Architecture & Key Decisions

File: src/utils/cache.ts
• readFromCache() checks for stored data in localStorage using CACHE_KEY.
• writeToCache() saves fetched data.

### 5. Demo

- [Demo](https://currency-converter-teal-kappa.vercel.app/)
