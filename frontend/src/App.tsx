import CallDurationChart from "./components/CallDurationChart";
import CallDurationForm from "./components/CallDurationForm";
import { SadPathDonut } from "./components/SadPathDonut";
import { ToastProvider } from "./context/ToastContext";
import { ConfirmProvider } from "./hooks/useConfirm";

export default function App() {
  return (
    <ToastProvider>
       <ConfirmProvider>
        <div className="p-10 space-y-8">
          <div className="flex gap-4">
            <div className="flex-1 bg-white p-3 rounded-xl shadow">
              <h2 className="font-semibold mb-4">Call Duration Analysis</h2>
              <CallDurationChart />
            </div>
            <div className="flex-1 bg-white p-3 rounded-xl shadow">
              <CallDurationForm />
            </div>
          </div>


          <div className="bg-white p-3 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Sad Path Analysis</h2>
            <SadPathDonut />
          </div>
        </div>
       </ConfirmProvider>
    </ToastProvider>
  );
}