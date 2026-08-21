import "./globals.css";
import { QueryProvider } from "@/lib/queryProvider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>

        <Toaster />
      </body>
    </html>
  );
}
