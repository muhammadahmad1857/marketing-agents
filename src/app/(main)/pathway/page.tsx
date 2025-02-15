import { getPathways } from "@/actions/pathways";
import { CallUI, FeatureType } from "@/components/main/call_ui";

export default async function FeaturesPage() {
  const rawPathways = await getPathways();
  const pathways = Array.isArray(rawPathways) ? rawPathways : [];

  const languages = [
    { code: "en", name: "English" },
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "en-AU", name: "English (AU)" },
    { code: "en-NZ", name: "English (NZ)" },
    { code: "en-IN", name: "English (India)" },
    { code: "zh", name: "Chinese" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "zh-Hans", name: "Chinese (Simplified)" },
    { code: "zh-TW", name: "Chinese (Traditional)" },
    { code: "zh-Hant", name: "Chinese (Traditional)" },
    { code: "es", name: "Spanish" },
    { code: "es-419", name: "Spanish (Latin America)" },
    { code: "fr", name: "French" },
    { code: "fr-CA", name: "French (Canada)" },
    { code: "de", name: "German" },
    { code: "el", name: "Greek" },
    { code: "hi", name: "Hindi" },
    { code: "hi-Latn", name: "Hindi (Latin)" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "ko-KR", name: "Korean (KR)" },
    { code: "pt", name: "Portuguese" },
    { code: "pt-BR", name: "Portuguese (Brazil)" },
    { code: "it", name: "Italian" },
    { code: "nl", name: "Dutch" },
    { code: "pl", name: "Polish" },
    { code: "ru", name: "Russian" },
    { code: "sv", name: "Swedish" },
    { code: "sv-SE", name: "Swedish (SE)" },
    { code: "da", name: "Danish" },
    { code: "da-DK", name: "Danish (DK)" },
    { code: "fi", name: "Finnish" },
    { code: "id", name: "Indonesian" },
    { code: "ms", name: "Malay" },
    { code: "tr", name: "Turkish" },
    { code: "uk", name: "Ukrainian" },
    { code: "bg", name: "Bulgarian" },
    { code: "cs", name: "Czech" },
    { code: "ro", name: "Romanian" },
    { code: "sk", name: "Slovak" },
  ];

  const basicFeatures: FeatureType[] = [
    {
      key: "phone_number",
      type: "text",
      label: "Phone Number",
      placeholder: "Enter phone number",
      defaultValue: "", // User will input this
      required: true,
    },
    {
      key: "voice",
      type: "dropdown",
      label: "Voice",
      options: ["Josh", "Florian", "Derek", "June", "Nat", "Paige"],
      defaultValue: "Nat",
      required: true,
    },
    {
      key: "background_track",
      type: "dropdown",
      label: "Background Track",
      options: ["office", "cafe", "restaurant", "none"],
      defaultValue: "office",
      required: true,
    },
    {
      key: "first_sentence",
      type: "textarea",
      label: "First Sentence",
      placeholder: "Enter the first sentence",
      defaultValue: "", // User will input this
      required: false,
    },
    {
      key: "language",
      type: "dropdown",
      label: "Language",
      options: languages.map((language) => ({
        label: `${language.name}`,
        value: language.code,
      })),
      defaultValue: "en",
    },
    {
      key: "record_call",
      type: "dropdown",
      label: "Record Call",
      options: ["true", "false"],
      defaultValue: "true", // Will be converted to boolean before sending
      required: true,
    },
    {
      key: "interruption_threshold",
      type: "text",
      label: "Interruption Threshold",
      placeholder: "Enter interruption threshold",
      defaultValue: 100,
    },
    {
      key: "pathway_id",
      type: "dropdown",
      label: "Pathway ID",
      placeholder: "Automatically fetched",
      defaultValue: pathways.length > 0 ? pathways[0].id : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: pathways.map((pathway: any) => ({
        label: `${pathway.name}`,
        value: pathway.id,
      })),
    },
  ];

  const advancedFeatures: FeatureType[] = [
    {
      key: "wait_for_greeting",
      type: "dropdown",
      label: "Wait for Greeting",
      options: ["true", "false"],
      defaultValue: "false", // Will be converted to boolean before sending
    },
    {
      key: "block_interruptions",
      type: "dropdown",
      label: "Block Interruptions",
      options: ["true", "false"],
      defaultValue: "false", // Will be converted to boolean before sending
    },
    {
      key: "noise_cancellation",
      type: "dropdown",
      label: "Noise Cancellation",
      options: ["true", "false"],
      defaultValue: "true", // Will be converted to boolean before sending
    },
    {
      key: "ignore_button_press",
      type: "dropdown",
      label: "Ignore Button Press",
      options: ["true", "false"],
      defaultValue: "true", // Will be converted to boolean before sending
    },

    {
      key: "pathway_version",
      type: "text",
      label: "Pathway Version",
      placeholder: "Automatically fetched",
      defaultValue: 0, // This will be updated using getPathway()
    },
  ];

  const apiEndpoint = "https://bland.abubakarkhalid.com/v1/send_pathway_call";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Send Pathway Call</h1>
      <CallUI
        basicFeaturesData={basicFeatures}
        advancedFeaturesData={advancedFeatures}
        apiEndpoint={apiEndpoint}
        type="pathway"
      />
    </div>
  );
}
