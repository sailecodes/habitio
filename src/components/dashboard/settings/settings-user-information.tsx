import SettingsUserInformationEmail from "./settings-user-information-email";
import SettingsUserInformationUsername from "./settings-user-information-username";

export default function SettingsUserInformation() {
  return (
    <div className="space-y-5">
      <header className="font-medium text-3xl -tracking-[2px]">User Information</header>
      <div className="flex sm:flex-row flex-col justify-between gap-5 space-y-5 card">
        <SettingsUserInformationEmail />
        <SettingsUserInformationUsername />
      </div>
    </div>
  );
}
