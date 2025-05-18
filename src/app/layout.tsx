import type { Metadata } from "next";
import clsx from "clsx";

import { inter } from "@/utils/fonts";
import { Providers } from "./providers";

import { Open_Sans } from "next/font/google"
import "@radix-ui/themes/styles.css";

import "@/styles/reset.css";
import "@/styles/globals.css";
import { SideBar } from "@/components/Panels/SideBar";
import { TopBar } from "@/components/Panels/TopBar";
import { Box, Flex } from "@radix-ui/themes";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
})

export const metadata: Metadata = {
  title: "Memorium",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="en"
    className={clsx(inter.className, inter.variable)}
    suppressHydrationWarning
  >
    <body>
      <Providers>
        <Box left="80px" top="80px" 
          width="calc(100% - 80px)" height="calc(100% - 80px)"
          //style={{background: "var(--gray-1)"}}
          position="absolute">
          {children}
        </Box>
        <Box left="80px" width="calc(100% - 80px)" position="fixed">
          <Flex height="100%" width="100%">
            <TopBar/>
          </Flex>
        </Box>
        <Box height="100%" position="fixed">
          <Flex height="100%" width="100%">
            <SideBar/>
          </Flex>
        </Box>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
function styled(arg0: string, arg1: { position: string; top: number; left: number; width: string; height: string; pointerEvents: string; }) {
  throw new Error("Function not implemented.");
}

