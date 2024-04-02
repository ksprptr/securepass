import Logo from "@/public/assets/logo.png";
import React from "react";
import Image from "next/image";
import Heading from "@/components/common/Heading";
import LinkButton from "@/components/common/LinkButton";
import CenterLayout from "@/components/layouts/CenterLayout";

/**
 * Component representing a custom 404 page
 */
export default function Custom404() {
  return (
    <CenterLayout>
      <div className="text-center font-medium text-lg text-zinc-800">
        <Image src={Logo} alt="Logo" width={30} height={30} className="mx-auto" />
        <Heading size="3" className="my-8">
          404 | Page not found
        </Heading>
        <LinkButton href="/" variant="primary" className="text-sm" rounded>
          Return to home
        </LinkButton>
      </div>
    </CenterLayout>
  );
}
