import "./globals.css";
import AppSplashScreen from "./components/app-splash-screen";

export const metadata = {
  title: {
    default: "Client Service Portal Demo",
    template: "%s | Client Service Portal Demo",
  },
  description:
    "Sanitized portfolio demonstration of a Next.js customer service portal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950">
        <AppSplashScreen>{children}</AppSplashScreen>
      </body>
    </html>
  );
}
