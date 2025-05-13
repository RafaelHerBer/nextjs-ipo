import type { Metadata } from "next";
import clsx from "clsx";

import { inter } from "@/utils/fonts";
import { Providers } from "./providers";

import "@radix-ui/themes/styles.css";

import "@/styles/reset.css";
import "@/styles/globals.css";
import { SideBar } from "@/components/Panels/SideBar";

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
        <SideBar>
          {children}
        </SideBar>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
