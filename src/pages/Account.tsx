import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <div className="space-y-8 p-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Update your account
      </h1>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Update user data
        </h3>
        <UpdateUserDataForm />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Update password
        </h3>
        <UpdatePasswordForm />
      </section>
    </div>
  );
}

export default Account;
