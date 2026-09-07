import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";


function Settings() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Update hotel settings
      </h1>
      <div className="mt-6">
        <UpdateSettingsForm />
      </div>
    </>
  );
}

export default Settings;
