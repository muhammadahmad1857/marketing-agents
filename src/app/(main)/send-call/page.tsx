import { CallUI, FeatureType } from "@/components/main/call_ui";

export default function FeaturesPage() {
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
      key: "task",
      type: "textarea",
      label: "Task",
      placeholder: "Enter task",
      defaultValue: "",
      required: true,
    },
    {
      key: "first_sentence",
      type: "textarea",
      label: "First Sentence",
      placeholder: "Enter the first sentence",
      defaultValue: "",
    },
    {
      key: "phone_number",
      type: "text",
      label: "Phone Number",
      placeholder: "Enter phone number",
      defaultValue: "",
      required: true,
    },
    {
      key: "background_track",
      type: "dropdown",
      label: "Background Track",
      options: ["null", "office", "cafe", "restaurant", "none"],
      defaultValue: "office",
    },
    {
      key: "voice",
      type: "dropdown",
      label: "Voice",
      options: ["Josh", "Florian", "Derek", "June", "Nat", "Paige"],
      defaultValue: "Nat",
    },
    {
      key: "recording",
      type: "dropdown",
      label: "Recording",
      options: ["true", "false"],
      defaultValue: "true",
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
  ];

  const advancedFeatures: FeatureType[] = [
    {
      key: "interruption_threshold",
      type: "text",
      label: "Interruption Threshold",
      placeholder: "Enter interruption threshold",
      defaultValue: 100,
    },
    {
      key: "model",
      type: "text",
      label: "Model",
      placeholder: "Enter model",
      defaultValue: "enhanced",
    },
    {
      key: "temperature",
      type: "text",
      label: "Temperature",
      placeholder: "Enter temperature (e.g., 0.7)",
      defaultValue: 0.7,
    },
    {
      key: "keywords",
      type: "text",
      label: "Keywords",
      placeholder: "Enter keywords (comma-separated)",
      defaultValue: [],
    },
    {
      key: "wait_for_greeting",
      type: "dropdown",
      label: "Wait for Greeting",
      options: ["true", "false"],
      defaultValue: "false",
    },
    {
      key: "block_interruptions",
      type: "dropdown",
      label: "Block Interruptions",
      options: ["true", "false"],
      defaultValue: "false",
    },
    {
      key: "noise_cancellation",
      type: "dropdown",
      label: "Noise Cancellation",
      options: ["true", "false"],
      defaultValue: "true",
    },
    {
      key: "ignore_button_press",
      type: "dropdown",
      label: "Ignore Button Press",
      options: ["true", "false"],
      defaultValue: "true",
    },
    {
      key: "tools",
      type: "text",
      label: "Tools",
      placeholder: "Enter tools (comma-separated)",
      defaultValue: [],
    },
  ];

  const apiEndpoint = "https://bland.abubakarkhalid.com/v1/send_call";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Features Configuration</h1>
      <CallUI
        basicFeaturesData={basicFeatures}
        advancedFeaturesData={advancedFeatures}
        apiEndpoint={apiEndpoint}
      />
    </div>
  );
}
