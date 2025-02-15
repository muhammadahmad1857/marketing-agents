/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import type React from "react"; // Added import for React
import { getCurrentUser } from "@/actions/user";
import { Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
//
export type FeatureType = {
  key: string;
  type: "textarea" | "text" | "dropdown";
  label: string;
  placeholder?: string;
  defaultValue: string | number | boolean | string[];
  options?: string[] | { label: string; value: string }[];
  required?: boolean;
};

type FeaturesAccordionProps = {
  basicFeaturesData: FeatureType[];
  advancedFeaturesData: FeatureType[];
  apiEndpoint: string;
  type?: "pathway" | "simple";
};

export function CallUI({
  basicFeaturesData,
  advancedFeaturesData,
  apiEndpoint,
  type = "simple",
}: FeaturesAccordionProps) {
  const [basicFeatures, setBasicFeatures] = useState<FeatureType[]>([]);
  const [advancedFeatures, setAdvancedFeatures] = useState<FeatureType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [transcriptDisabled, setTranscriptDisabled] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [callId, setCallId] = useState<string | null>(null);
  const [concatenatedTranscript, setConcatenatedTranscript] =
    useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(basicFeaturesData)) {
      setBasicFeatures(basicFeaturesData);
    }
    if (Array.isArray(advancedFeaturesData)) {
      setAdvancedFeatures(advancedFeaturesData);
    }
  }, [basicFeaturesData, advancedFeaturesData]);

  const handleFeatureChange = (
    isBasic: boolean,
    key: string,
    value: string | boolean | number
  ) => {
    const updateFeatures = (features: FeatureType[]) =>
      features.map((feature) => {
        if (feature.key === key) {
          let newValue: string | boolean | number | string[] = value;
          if (Array.isArray(feature.defaultValue)) {
            newValue = (value as string).split(",").map((item) => item.trim());
          } else if (typeof feature.defaultValue === "boolean") {
            newValue = value === "true";
          } else if (typeof feature.defaultValue === "number") {
            newValue = Number(value);
          }
          return { ...feature, defaultValue: newValue };
        }
        return feature;
      });

    if (isBasic) {
      setBasicFeatures(updateFeatures);
    } else {
      setAdvancedFeatures(updateFeatures);
    }

    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const renderFeatureInput = (feature: FeatureType, isBasic: boolean) => {
    const commonProps = {
      id: feature.key,
      placeholder: feature.placeholder,
      defaultValue: String(feature.defaultValue),
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleFeatureChange(isBasic, feature.key, e.target.value),
      className: `w-full ${errors[feature.key] ? "border-red-500" : ""}`,
      required: feature.required,
    };

    switch (feature.type) {
      case "dropdown":
        if (
          feature.options &&
          feature.options.length === 2 &&
          feature.options.every((option) =>
            ["true", "false"].includes(String(option))
          )
        ) {
          return (
            <Switch
              checked={
                feature.defaultValue === true || feature.defaultValue === "true"
              }
              onCheckedChange={(checked: any) =>
                handleFeatureChange(isBasic, feature.key, checked)
              }
            />
          );
        } else {
          return (
            <Select
              defaultValue={String(feature.defaultValue)}
              onValueChange={(value: any) =>
                handleFeatureChange(isBasic, feature.key, value)
              }
            >
              <SelectTrigger
                className={`w-full ${
                  errors[feature.key] ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder={feature.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {feature.options?.map((option) => (
                  <SelectItem
                    className="capitalize"
                    key={typeof option === "string" ? option : option.value}
                    value={typeof option === "string" ? option : option.value}
                  >
                    {typeof option === "string" ? option : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }
      case "textarea":
        return <Textarea {...commonProps} />;
      default:
        return <Input type="text" {...commonProps} />;
    }
  };

  const renderFeatures = (features: FeatureType[], isBasic: boolean) => {
    if (!Array.isArray(features) || features.length === 0) {
      return <p>No features available.</p>;
    }

    return (
      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.key} className="flex flex-col space-y-2">
            <Label htmlFor={feature.key}>
              {feature.label}
              {feature.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {renderFeatureInput(feature, isBasic)}
            {errors[feature.key] && (
              <p className="text-red-500 text-sm">{errors[feature.key]}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = async () => {
    console.log("I started");
    const allFeatures = [...basicFeatures, ...advancedFeatures];
    const newErrors: Record<string, string> = {};

    allFeatures.forEach((feature) => {
      if (feature.required && !feature.defaultValue) {
        newErrors[feature.key] = `${feature.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      console.log("I ended");
      return;
    }

    setIsSubmitting(true);
    const formData = allFeatures.reduce((acc, feature) => {
      acc[feature.key] = feature.defaultValue;
      return acc;
    }, {} as Record<string, any>);
    const { user } = await getCurrentUser();
    const email = user.email;
    if (!user.email) {
      setIsSubmitting(false);
      toast.error("user is unauthorized");
      console.log("I ended");

      return;
    }
    let payload;
    if (type === "simple") {
      payload = {
        ...formData,
        interruption_threshold: Number(formData.interruption_threshold),
        temperature: Number(formData.temperature),
        wait_for_greeting: formData.wait_for_greeting === "true",
        block_interruptions: formData.block_interruptions === "true",
        noise_cancellation: formData.noise_cancellation === "true",
        ignore_button_press: formData.ignore_button_press === "true",
        record_call: formData.record_call === "true",
        tools: Array.isArray(formData.tools) ? formData.tools : [],
        keywords: Array.isArray(formData.keywords) ? formData.keywords : [],
        user_email: email,
      };
    } else {
      payload = {
        ...formData,
        pathway_version: Number(formData.pathway_version),
        wait_for_greeting: formData.wait_for_greeting === "true",
        block_interruptions: formData.block_interruptions === "true",
        noise_cancellation: formData.noise_cancellation === "true",
        ignore_button_press: formData.ignore_button_press === "true",
        record_call: formData.record_call === "true",
        user_email: email,
        interruption_threshold: Number(formData.interruption_threshold),
      };
    }

    console.log("user", payload);
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errData = JSON.parse(errorData);
        toast.error(errData.message || "Failed to submit data");
        setIsSubmitting(false);
        console.log("I ended");

        return;
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      const result2 = JSON.parse(result);
      const callId = result2.call_id;
      setCallId(callId);
      if (!callId) {
        setIsSubmitting(false);
        console.log("I ended");

        throw new Error("Call ID not received from the API.");
      }
      console.log("I ended");

      toast.success("Your call has been sent successfully.");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send call. Please try again."
      );
      console.log("I ended");
    } finally {
      setIsSubmitting(false);
      console.log("I ended");
    }
  };
  const handleGetTranscript = async () => {
    if (!callId) {
      toast.error("Call ID is not available.");
      return;
    }
    // const { user } = await getCurrentUser();
    // const email = user.email;

    try {
      setTranscriptLoading(true);
      setTranscriptDisabled(true);

      const response =
        await fetch(`https://bland.abubakarkhalid.com/call_transcript/${callId}
`);
      const resp = await response.json();

      const { status, summary, concatenated_transcript } = JSON.parse(resp);

      console.log(status);

      if (status === "queued") {
        toast.info("Call is not initialized yet.");
        setTimeout(() => setTranscriptDisabled(false), 2000);
      } else if (status === "in-progress") {
        toast.info("Call is in progress.");
        setTimeout(() => setTranscriptDisabled(false), 2000);
      } else if (status === "ringing") {
        toast.info("Call is not initialized yet.");
        setTimeout(() => setTranscriptDisabled(false), 2000);
      } else if (status === "no-answer") {
        toast.error("Call was not answered.");
        setTranscriptDisabled(false);
      } else if (status === "busy") {
        toast.error("User declined the call.");
        setTranscriptDisabled(false);
      } else if (status === "completed") {
        toast.success("Transcript generated successfully!");
        setResponse(summary);
        setConcatenatedTranscript(concatenated_transcript);
        setTranscriptDisabled(false);
      } else {
        toast.error("Unknown status received.");
        setTranscriptDisabled(false);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error fetching call transcript."
      );
    } finally {
      setTranscriptLoading(false);
      setTranscriptDisabled(false);
    }
  };
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        defaultValue="basic"
        collapsible
        className="w-full"
      >
        <AccordionItem value="basic">
          <AccordionTrigger className="bg-black text-white hover:bg-[#0a0a0a] px-4 py-2 transition-colors  rounded-t-lg">
            Basic Features
          </AccordionTrigger>
          <AccordionContent className=" px-4 py-2 rounded-b-lg">
            {renderFeatures(basicFeatures, true)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="advanced">
          <AccordionTrigger className="bg-black text-white hover:bg-[#0a0a0a] transition-colors px-4 py-2 rounded-t-lg mt-2">
            Advanced Features
          </AccordionTrigger>
          <AccordionContent className=" px-4 py-2 rounded-b-lg">
            {renderFeatures(advancedFeatures, false)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending..." : "Send Call"}
      </Button>

      {/* Get Transcript Button */}
      {callId && (
        <div className="text-center mt-4 relative z-20">
          <Button
            onClick={handleGetTranscript}
            variant="outline"
            className="h-[52px] w-full"
            disabled={transcriptLoading || transcriptDisabled}
          >
            {transcriptLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Get Transcript
          </Button>
        </div>
      )}

      {/* Response Section */}
      {response && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-gray-900 text-white p-4 rounded-md"
        >
          <h2 className="text-xl font-bold">Transcript Summary:</h2>
          <p>{response}</p>
          {concatenatedTranscript && (
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="secondary"
              className="mt-4 relative z-20"
            >
              View Full Transcript
            </Button>
          )}
        </motion.div>
      )}

      {/* Modal for Full Transcript */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Full Transcript</h2>
              <X
                className="h-6 w-6 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <div className="overflow-y-auto max-h-96">
              <pre className="whitespace-pre-wrap border border-black">
                {concatenatedTranscript}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
