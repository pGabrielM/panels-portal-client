import { PortalHeaderLogo } from "./PortalHeaderLogo";
import { PortalHeaderTitle } from "./PortalHeaderTitle";

import { styled } from "@stitches/react";

const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '8rem',
  padding: '0 3rem',
})

export function PortalHeader() {
  return (
    <HeaderContainer>
      <PortalHeaderLogo />
      <PortalHeaderTitle />
    </HeaderContainer>
  );
}
