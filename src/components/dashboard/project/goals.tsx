import GoalsItem from './goals-item';

export default function Goals() {
  return (
    <div className="space-y-5">
      <header className="text-2xl -tracking-[2px]">Goals</header>
      <ul className="space-y-2">
        <GoalsItem goal="Reach XFA by 20 days" />
      </ul>
    </div>
  );
}
