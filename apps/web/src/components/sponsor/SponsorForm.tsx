"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Upload } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  website: z.string().url("Please enter a valid URL"),
});

interface SponsorFormProps {
  razorpayPaymentId: string;
}

export const SponsorForm: React.FC<SponsorFormProps> = ({
  razorpayPaymentId,
}) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const submitAssetsMutation = trpc.sponsor.submitAssets.useMutation({
    onSuccess: () => {
      // Set redirecting state to keep spinner visible
      setIsRedirecting(true);
      // redirect to landing page after successful submission
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      console.error("Submission error:", error);
      setSubmissionError(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      companyName: "",
      description: "",
      website: "",
    },
  });

  const uploadImageMutation = trpc.sponsor.uploadImage.useMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // validate file size (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large. Max 5MB allowed.");
      return;
    }

    setUploading(true);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      const result = await uploadImageMutation.mutateAsync({ file: base64 });
      setImageUrl(result.url);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!imageUrl) {
      alert("Please upload an image");
      return;
    }

    setSubmissionError(null);
    submitAssetsMutation.mutate({
      ...values,
      imageUrl,
      razorpayPaymentId,
    });
  };

  // watch form values to check if all fields are completed
  const watchedValues = form.watch();
  const isFormValid =
    watchedValues.companyName?.trim().length >= 2 &&
    watchedValues.description?.trim().length >= 10 &&
    watchedValues.website?.trim().length > 0 &&
    form.formState.isValid &&
    imageUrl &&
    !uploading;
  const isSubmitting = submitAssetsMutation.isPending || isRedirecting;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Error Message */}
      {submissionError && (
        <div className="mb-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <svg
              className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-red-500 font-semibold mb-2">
                Submission Error
              </h3>
              <p className="text-neutral-300 text-sm mb-4">{submissionError}</p>

              {submissionError.includes("pending submission") && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold text-white">
                    Contact our team for assistance
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href="mailto:hi@opensox.ai"
                        className="text-white hover:text-green-400 transition-colors"
                      >
                        hi@opensox.ai
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href="tel:+918447500346"
                        className="text-white hover:text-green-400 transition-colors"
                      >
                        +91 844-7500-346
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 mt-3 pt-3 border-t border-neutral-800">
                    Payment ID:{" "}
                    <code className="bg-neutral-800 px-2 py-0.5 rounded text-xs">
                      {razorpayPaymentId}
                    </code>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Logo Upload Section */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Company Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="logo-upload"
                disabled={uploading}
              />
              <label
                htmlFor="logo-upload"
                className={`
                  flex flex-col items-center justify-center w-full h-48 
                  border-2 border-dashed rounded-2xl cursor-pointer
                  transition-all duration-200
                  ${
                    imageUrl
                      ? "border-neutral-700 bg-neutral-900/30"
                      : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900/70"
                  }
                  ${uploading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-[#4dd0a4] animate-spin" />
                    <p className="text-sm text-neutral-400">Uploading...</p>
                  </div>
                ) : !imageUrl ? (
                  <div className="flex flex-col items-center gap-3 px-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">
                        Click to upload logo
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        SVG, PNG, JPG (max. 5MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#4dd0a4]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-neutral-400">
                      Click to change logo
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Preview Area */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-300">Preview</p>
              <div className="w-full h-48 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <div className="relative w-full h-full p-8">
                    <Image
                      src={imageUrl}
                      alt="Logo preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-center px-4">
                    <div className="w-16 h-16 mx-auto rounded-lg bg-neutral-800/50 flex items-center justify-center mb-3">
                      <svg
                        className="w-8 h-8 text-neutral-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-neutral-500">
                      Your logo will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-300">
              Company Name
            </label>
            <input
              {...form.register("companyName")}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 outline-none transition-colors"
              placeholder="Acme Corporation"
            />
            {form.formState.errors.companyName && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {form.formState.errors.companyName.message}
              </p>
            )}
          </div>

          {/* Website URL */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-300">
              Website URL
            </label>
            <input
              {...form.register("website")}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 outline-none transition-colors"
              placeholder="https://acme.com"
            />
            {form.formState.errors.website && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {form.formState.errors.website.message}
              </p>
            )}
          </div>
        </div>

        {/* Description - Full Width */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-300">
            Company Description
          </label>
          <textarea
            {...form.register("description")}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 outline-none transition-colors resize-none"
            placeholder="Tell us about your company and what you do..."
            rows={4}
          />
          {form.formState.errors.description && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full sm:w-auto sm:min-w-[200px] bg-primary text-primary-foreground font-semibold py-3.5 px-8 rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Sponsorship</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </button>
          {(!isFormValid || !imageUrl) && (
            <p className="text-xs text-neutral-500 mt-3">
              Please complete all fields to submit
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
