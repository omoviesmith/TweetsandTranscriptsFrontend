import classNames from "classnames";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

//
import { MdOutlineSummarize } from "react-icons/md";

//
import { REGEX_TWITTER, REGEX_YOUTUBE } from "../utils/constants";

/**
 *
 */
export default function ExtractPage() {
  const { t } = useTranslation();

  //
  const [inputValue, setInputValue] = useState<string>("");
  const [submitProgress, setSubmitProgress] = useState<number>(20);
  const [uploadMode, setUploadMode] = useState<"twitter" | "youtube">(
    "twitter",
  );

  //
  const mutation = useMutation({
    mutationFn: async (valueToUse: string) => {
      return { valueToUse };
    },
    onSuccess: (data) => {
      console.log(data);
      setSubmitProgress(30);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Unable to update the file");
    },
  });

  const isSubmitting = mutation.isPending;

  //
  function handleOps() {
    if (!inputValue) return;

    //
    if (uploadMode === "twitter") {
      const success = REGEX_TWITTER.test(inputValue);
      if (!success) {
        toast.error(t("extractor.invalidTwitterInput"));
        return;
      }
    } else {
      const success = REGEX_YOUTUBE.test(inputValue);
      if (!success) {
        toast.error(t("extractor.invalidYoutubeInput"));
        return;
      }
    }

    //
    mutation.mutate(inputValue);
    setInputValue("");
  }

  //
  function handleKeyUpInput(key: string) {
    if (key !== "Enter") return;
    handleOps();
  }

  //
  useEffect(() => {
    handleOps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  return (
    <div className="h-screen w-full overflow-y-auto bg-gray-100 p-2 md:p-5 lg:p-20">
      <div className="flex h-full w-full flex-col rounded-xl bg-white py-2 shadow-lg md:py-5 lg:py-10">
        {/* Header */}
        <div className="flex justify-between gap-20 border-b border-gray-200 px-2 pb-2 md:px-5 md:pb-5 lg:px-10 lg:pb-10">
          <p className="text-4xl font-semibold">{t("extractor.extract")}</p>

          <p className="max-w-md text-center text-sm">
            {t("extractor.limitHint")}
          </p>
        </div>

        {isSubmitting && (
          <div className="h-full flex-grow">
            <div className="flex h-full flex-col items-center justify-center px-2 py-10 md:px-5 lg:px-10">
              <div className="h-5 w-full overflow-hidden rounded-full border border-gray-300 bg-gray-100 shadow">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${submitProgress}%` }}
                />
              </div>

              <div className="my-5 transition-all duration-1000">
                <span>{t("extractor.processing")}</span>
              </div>
            </div>
          </div>
        )}

        {!isSubmitting && (
          <div className="flex-grow">
            {/* Mode switch */}
            <div className="mt-10 px-2 md:px-5 lg:px-10">
              <div className=" max-w-fit rounded-full bg-gray-200 p-[5px]">
                <button
                  onClick={() => setUploadMode("twitter")}
                  className={classNames("rounded-full px-5 py-3 text-sm", {
                    "bg-white font-semibold shadow": uploadMode === "twitter",
                  })}
                >
                  {t("extractor.extractTweet")}
                </button>
                <button
                  onClick={() => setUploadMode("youtube")}
                  className={classNames("rounded-full px-5 py-3 text-sm", {
                    "bg-white font-semibold shadow": uploadMode === "youtube",
                  })}
                >
                  {t("extractor.extractTranscripts")}
                </button>
              </div>
            </div>

            {/* Actual input area */}
            <div className="px-2 py-10 md:px-5 lg:px-10">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={(e) => handleKeyUpInput(e.key)}
                placeholder={t(
                  uploadMode === "twitter"
                    ? "extractor.enterTwitter"
                    : "extractor.enterYoutube",
                )}
                className="h-14 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed"
              />

              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => handleOps()}
                  disabled={!inputValue?.length}
                  className="flex items-center gap-3 rounded-full bg-gray-900 px-6 py-3 text-sm text-gray-100 shadow transition-all duration-300 hover:scale-[1.03] disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:scale-100"
                >
                  <MdOutlineSummarize
                    size={20}
                    className="-ml-[2px] mt-[2px]"
                  />
                  <span>{t("extractor.extractAction")}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* More content */}
        <div className="px-2 text-sm md:px-5 lg:px-10">
          <p>{t("extractor.agreeWith")}</p>

          <div className="flex gap-1">
            <a href="#" className="font-semibold hover:underline">
              {t("general.privacyPolicy")}
            </a>
            <p>&</p>
            <a href="#" className="font-semibold hover:underline">
              {t("general.terms")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
