import "./globals.css";
import AppSplashScreen from "./components/app-splash-screen";

export const metadata = {
  title: {
    default: "Client Service Portal",
    template: "%s | Client Service Portal",
  },
  description:
    "Customer self-service portal for account access, service requests, inspection reminders, feedback, and calendar export.",
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
