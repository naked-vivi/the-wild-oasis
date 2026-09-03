
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
        <p className="text-sm text-muted-foreground">Update user data form</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Update password
        </h3>
        <p className="text-sm text-muted-foreground">Update user password form</p>
      </section>
    </div>
  );
}

export default Account;
