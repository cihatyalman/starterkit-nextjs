import { CLink } from "../custom/CLink";

export const Brand = (props: { className?: string }) => {
  return (
    <CLink href="/" aria-label="Anasayfa">
      <h2 className={`font-extrabold text-2xl ${props.className}`}>
        <span>Starter</span>
        <span className="text-(--color-primary)">Kit</span>
      </h2>
    </CLink>
  );
};
