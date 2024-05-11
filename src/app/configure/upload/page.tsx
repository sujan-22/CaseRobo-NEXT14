"use client";

import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

const Page = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const router = useRouter();
    const { toast } = useToast();

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete([res]) {
            const configId = res.serverData.configId;
            startTransition(() => {
                router.push(`/configure/design?Id=${configId}`);
            });
        },
        onUploadProgress(p) {
            setUploadProgress(p);
        },
    });

    const onDropRejected = (files: FileRejection[]) => {
        const [file] = files;
        setIsDragOver(false);
        toast({
            title: `${file.file.type} type is not supported`,
            description: "Please choose a PNG, JPG, or JPEG image instead",
            variant: "destructive",
        });
    };

    const onDropAccepted = (files: File[]) => {
        startUpload(files, { configId: undefined });
        setIsDragOver(false);
    };

    const [isPending, startTransition] = useTransition();

    return (
        <div
            className={cn(
                "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-xl flex justify-center flex-col items-center",
                { "ring-blue-900/25 bg-blue-900/10": isDragOver }
            )}
        >
            <div className="relative flex flex-1 flex-col items-center justify-center w-full">
                <Dropzone
                    onDropRejected={onDropRejected}
                    onDropAccepted={onDropAccepted}
                    accept={{
                        "image/jpg": [".jpg"],
                        "image/png": [".png"],
                        "image/jpeg": [".jpeg"],
                    }}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className=" h-full w-full flex flex-1 flex-col items-center justify-center"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            {isDragOver ? (
                                <MousePointerSquareDashed className=" h-6 w-6 text-zinc-500" />
                            ) : isUploading || isPending ? (
                                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
                            ) : (
                                // eslint-disable-next-line jsx-a11y/alt-text
                                <Image className="h-6 w-6 text-zinc-500 mb-2" />
                            )}
                            <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                                {isUploading ? (
                                    <div className="flex flex-col items-center">
                                        <p>Uploading...</p>
                                        <Progress
                                            className=" mt-2 w-40 h-2 bg-gray-300"
                                            value={uploadProgress}
                                        />
                                    </div>
                                ) : isPending ? (
                                    <div className="flex flex-col items-center">
                                        <p>Redirecting, please wait...</p>
                                    </div>
                                ) : isDragOver ? (
                                    <p>
                                        <span className=" font-semibold">
                                            Drop file{" "}
                                        </span>
                                        to upload
                                    </p>
                                ) : (
                                    <p>
                                        <span className=" font-semibold">
                                            Click to upload{" "}
                                        </span>
                                        or drag and drop
                                    </p>
                                )}
                            </div>
                            {isPending ? null : (
                                <p className="text-xs text-zinc-500">
                                    PNG, JPG, JPEG
                                </p>
                            )}
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    );
};

export default Page;
