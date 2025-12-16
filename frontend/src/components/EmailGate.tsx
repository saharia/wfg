export function EmailGate({ onSubmit }: { onSubmit: (email: string) => void }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <input
        className="border p-2 w-full"
        placeholder="Enter your email"
        onBlur={(e) => onSubmit(e.target.value)}
      />
    </div>
  );
}