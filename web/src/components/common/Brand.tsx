import { CLink } from "@/components/custom/button/CLink";

export const Brand = (props: { className?: string }) => {
  return (
    <CLink href="/" aria-label="Anasayfa">
      <h2 className={`font-extrabold text-3xl ${props.className}`}>
        <span>Starter</span>
        <span className="text-primary">Kit</span>
      </h2>
    </CLink>
  );
};
