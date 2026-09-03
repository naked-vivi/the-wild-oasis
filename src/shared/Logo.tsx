import logoLight from "../data/img/logo-light.png";

function Logo() {
  return (
    <div className="text-center mx-auto my-6">
      <img
        src={logoLight}
        alt="Logo"
        className="h-30 w-auto"
      />
    </div>
  );
}

export default Logo;
