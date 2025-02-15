import SingleHistory from "@/components/main/singleHistory";

export default async function CallDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const call_id = (await params).id
  return <SingleHistory id={call_id} />;
}
