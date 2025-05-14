import type { Metadata } from "next";
import clsx from "clsx";

import { inter } from "@/utils/fonts";
import { Providers } from "./providers";

import "@radix-ui/themes/styles.css";

import "@/styles/reset.css";
import "@/styles/globals.css";
import { SideBar } from "@/components/Panels/SideBar";
import { TopBar } from "@/components/Panels/TopBar";
import { Box, Flex } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Next.js + Radix Themes + Tailwind CSS",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="en"
    className={clsx(inter.className, inter.variable)}
    suppressHydrationWarning
  >
    <body className="relative h-full w-full rounded-[inherit] [&>*]:h-full" >
      <Providers>
        <Box left="80px" top="80px" 
          width="calc(100% - 80px)" height="100%"
          style={{background: "var(--gray-1)"}}
          position="absolute">
          {children}
        </Box>
        <Box height="100%" position="fixed">
          <Flex height="100%" width="100%">
            <SideBar/>
          </Flex>
        </Box>
        <Box left="80px" width="calc(100% - 80px)" position="fixed">
          <Flex height="100%" width="100%">
            <TopBar/>
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

