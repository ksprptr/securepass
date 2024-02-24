import Logo from "@/public/favicon.ico";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import CenterLayout from "@/components/layouts/CenterLayout";

/**
 * Component representing custom 500 page
 */
export default function Custom500() {
  return (
    <CenterLayout>
      <div className="text-center font-medium text-lg">
        <Image src={Logo} alt="Logo" width={30} height={30} className="mx-auto" />
        <Heading size="3" className="my-8">
          500 | Internal server error
        </Heading>
        <Button variant="primary" className="text-sm" rounded>
          <Link href="/">Return to home</Link>
        </Button>
      </div>
    </CenterLayout>
  );
}
