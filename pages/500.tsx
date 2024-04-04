import Logo from "@/public/assets/logo.svg";
import React from "react";
import Image from "next/image";
import Heading from "@/components/common/Heading";
import LinkButton from "@/components/common/LinkButton";
import CenterLayout from "@/components/layouts/CenterLayout";

/**
 * Component representing a custom 500 page
 */
export default function Custom500() {
  return (
    <CenterLayout>
      <div className="text-center font-medium text-lg text-zinc-800">
        <Image src={Logo} alt="Logo" width={30} height={30} className="mx-auto" />
        <Heading size="3" className="my-8">
          500 | Internal server error
        </Heading>
        <LinkButton href="/" variant="primary" className="text-sm" rounded>
          Return to home
        </LinkButton>
      </div>
    </CenterLayout>
  );
}
