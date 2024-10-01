import "./globals.css";

export const metadata = {
  title: "Currency-Converter",
  description: "A simple and user-friendly currency conversion tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
