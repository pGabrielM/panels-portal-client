import { styled } from "@stitches/react";

const HPPLogo = styled('img', {
  maxHeight: '6rem',
  overflow: 'hidden',
})

const BILogo = styled('img', {
  maxHeight: '6rem',
  overflow: 'hidden',
  order: 1
})

export function PortalHeaderLogo() {
  return (
    <>
      <HPPLogo src="/src/assets/images/hppHeaderLogo.png" alt="Logo do painel" />
      <BILogo src="/src/assets/images/PowerBILogo.svg" alt="Logo PowerBI"/>
    </>
  );
}