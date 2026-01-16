import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import Link from "next/link";
import { StaticImageData } from "next/image";

export interface LogoProps {
  img?: StaticImageData;
  imgLight?: StaticImageData;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "h-12", // Use height instead of width for consistent sizing
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      {img && (
        <img
          className={`h-full w-auto ${imgLight ? "dark:hidden" : ""}`} // Use h-full to fill container height
          src={img.src}
          alt="Logo"
        />
      )}
      {imgLight && (
        <img
          className="hidden h-full w-auto dark:block" // Use h-full to fill container height
          src={imgLight.src}
          alt="Logo-Light"
        />
      )}
    </Link>
  );
};

export default Logo;