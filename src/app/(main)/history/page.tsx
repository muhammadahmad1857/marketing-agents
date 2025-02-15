import { CallHistoryTable } from "@/components/main/call-history";
import { getHistory } from "@/actions/history";
import { getCurrentUser } from "@/actions/user";

export default async function History() {
  const { user } = await getCurrentUser();
  const callHistory = await getHistory(user.email);
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl text-center font-bold mb-4">Call History</h1>
      <CallHistoryTable data={callHistory} />
    </main>
  );
}
