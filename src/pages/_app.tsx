import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "@/components/ThemeSwitcher";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
      <ThemeSwitcher />
    </ThemeProvider>
  );
}

export default MyApp; 