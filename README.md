# Magenta Template

A production-ready starter template for building modern web applications with Vite, React, TypeScript, Tailwind CSS, Redux Toolkit, and more.

🌐 **Live Demo**: [https://magenta-template.netlify.app/](https://magenta-template.netlify.app/)

## 🚀 Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Modern UI library
- 📘 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom primary color (#e20074)
- 🌙 **Dark Mode** - Built-in dark/light theme support
- 🗂️ **Redux Toolkit** - State management with persistence
- 🌐 **React Router v6+** - Client-side routing
- 📡 **Axios** - HTTP client with interceptors
- 🌍 **i18n** - Internationalization (English & German)
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **Reusable Components** - Pre-built UI component library
- 🔧 **Absolute Imports** - Clean imports using `@/` alias

## 📦 Tech Stack

- **Build Tool**: Vite 7
- **UI Framework**: React 19
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3
- **State Management**: Redux Toolkit + Redux Persist
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **i18n**: react-i18next
- **UI Components**: Headless UI + Heroicons

## 🏗️ Project Structure

```
src/
 ├── assets/          # Static assets
 ├── components/      # React components
 │   ├── ui/         # Reusable UI components
 │   ├── Header.tsx  # Header component
 │   └── Footer.tsx  # Footer component
 ├── hooks/          # Custom React hooks
 ├── layouts/        # Layout components
 ├── pages/          # Page components
 ├── router/         # React Router configuration
 ├── store/          # Redux store and slices
 │   ├── slices/    # Redux slices
 │   └── hooks.ts    # Typed Redux hooks
 ├── services/       # API services
 ├── utils/          # Utility functions
 ├── i18n/           # Internationalization
 │   └── locales/   # Translation files
 └── styles/         # Global styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20.19.0+ or 22.12.0+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Magenta-Template
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 UI Components

The template includes a comprehensive set of reusable UI components:

### Available Components

- **Button** - Multiple variants (primary, secondary, outline, ghost, danger) and sizes
- **Input** - Form input with label and error handling
- **Card** - Container component with optional header and footer
- **Badge** - Status indicators with multiple variants
- **Loader** - Loading spinner in different sizes
- **Modal** - Dialog component with transitions
- **Tooltip** - Contextual information tooltips
- **PopupMenu** - Dropdown menu component
- **Toaster** - Toast notification system
- **ThemeToggle** - Dark/light theme switcher
- **LanguageSwitcher** - i18n language selector

### Component Usage

```tsx
import { Button, Card, Badge } from "@/components/ui";

function MyComponent() {
  return (
    <Card header={<h2>Title</h2>}>
      <Button variant="primary" size="md">
        Click me
      </Button>
      <Badge variant="success">Success</Badge>
    </Card>
  );
}
```

## 🌐 Internationalization

The template supports multiple languages. Currently includes:

- English (en)
- German (de)

### Adding Translations

1. Add translation keys to `src/i18n/locales/en.json` and `src/i18n/locales/de.json`
2. Use translations in components:

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t("common.welcome")}</h1>;
}
```

### Changing Language

Use the `LanguageSwitcher` component or programmatically:

```tsx
import { useTranslation } from "react-i18next";

const { i18n } = useTranslation();
i18n.changeLanguage("de");
```

## 🎯 State Management

Redux Toolkit is configured with example slices:

### Theme Slice

Manages dark/light theme:

```tsx
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme, setTheme } from "@/store/slices/themeSlice";

function MyComponent() {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
}
```

### User Slice

Example user state management:

```tsx
import { useAppDispatch } from "@/store/hooks";
import { setUser, clearUser } from "@/store/slices/userSlice";

const dispatch = useAppDispatch();
dispatch(setUser({ id: "1", name: "John", email: "john@example.com" }));
```

## 📡 API Client

Axios is configured with interceptors for request/response handling:

```tsx
import apiClient from "@/services/apiClient";

// GET request
const response = await apiClient.get("/users");

// POST request
const response = await apiClient.post("/users", { name: "John" });
```

### Environment Variables

Create a `.env` file for API configuration:

```env
VITE_API_BASE_URL=https://api.example.com
```

## 🛣️ Routing

Routes are configured in `src/router/index.tsx`:

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/components` - Component showcase
- `*` - 404 Not Found page

### Adding New Routes

```tsx
// src/router/index.tsx
{
  path: 'new-page',
  element: <NewPage />,
}
```

## 🎨 Styling

### Tailwind Configuration

The primary color is set to `#e20074`. Customize colors in `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#e20074',
    // ... other shades
  }
}
```

### Dark Mode

Dark mode is class-based. Toggle using the `ThemeToggle` component or Redux:

```tsx
dispatch(toggleTheme());
```

## 📝 Absolute Imports

Use `@/` alias for cleaner imports:

```tsx
// Instead of
import Button from "../../../components/ui/Button";

// Use
import Button from "@/components/ui/Button";
```

## 🧪 Development

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript will check types during build. For development, use your IDE's TypeScript integration.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, please open an issue in the repository.

---

Built with ❤️ using Vite + React + TypeScript
