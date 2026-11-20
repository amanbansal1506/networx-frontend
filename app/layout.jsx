import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
export const metadata = { title:{default:"NetworX",template:"%s | NetworX"}, description:"A simple professional networking project built with Next.js and Express." };
export default function RootLayout({children}) {return <html lang="en"><body><AuthProvider>{children}</AuthProvider></body></html>}
