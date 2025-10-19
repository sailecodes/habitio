import SettingsEmail from "@/components/dashboard/settings/settings-email";
import SettingsPassword from "@/components/dashboard/settings/settings-password";
import SettingsUsername from "@/components/dashboard/settings/settings-username";

export default function Settings() {
  return (
    <section className="space-y-10 mx-auto p-10 w-full max-w-[1410px]">
      <div className="space-y-5">
        <header className="font-medium text-3xl -tracking-[2px]">User Information</header>
        <SettingsEmail />
        <SettingsUsername />
        {/* <SettingsPassword /> */}
      </div>
    </section>
  );
}
