"use client";

import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import { COLOUR, MODELS } from "@/validators/option-validator";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const router = useRouter();
    const { user } = useKindeBrowserClient();
    const { id } = configuration;
    const { toast } = useToast();
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true);
    }, []);

    const { color, model, finish, material } = configuration;
    const tw = COLOUR.find(
        (supportedColor) => supportedColor.value === color
    )?.tw;

    const { label: modalLabel } = MODELS.options.find(
        ({ value }) => value === model
    )!;

    let totalPrice = BASE_PRICE;
    if (material !== "silicone")
        totalPrice += PRODUCT_PRICES.material[material!];
    if (finish !== "smooth") totalPrice += PRODUCT_PRICES.finish[finish!];

    const { mutate: createPaymentSession } = useMutation({
        mutationKey: ["get-checkout-session"],
        mutationFn: createCheckoutSession,
        onSuccess: ({ url }) => {
            if (url) {
                router.push(url);
            } else {
                throw new Error("Unable to retrieve payment URL");
            }
        },
        onError: () => {
            toast({
                title: "Something went wrong",
                description: "There was an error on our end. Please try again.",
                variant: "destructive",
            });
        },
    });

    const handleCheckout = () => {
        if (user) {
            createPaymentSession({ configId: id });
        } else {
            localStorage.setItem("configurationId", id);
            setIsLoginModalOpen(true);
        }
    };

    return (
        <>
            <div
                className=" pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
                aria-hidden="true"
            >
                <Confetti
                    active={showConfetti}
                    config={{
                        angle: 360,
                        spread: 360,
                        startVelocity: 33,
                        elementCount: 200,
                        dragFriction: 0.13,
                        duration: 2330,
                        stagger: 3,
                        width: "10px",
                        height: "21px",
                        colors: ["#000", "#333", "#666"],
                    }}
                />
            </div>
            <LoginModal
                isOpen={isLoginModalOpen}
                setIsOpen={setIsLoginModalOpen}
            />
            <div className=" mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
                <div className=" sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
                    <Phone
                        className={cn(`bg-${tw}`)}
                        imgSrc={configuration.croppedImageUrl!}
                    />
                </div>
                <div className=" mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
                    <h3 className=" text-3xl font-bold tracking-tight text-gray-900">
                        Your {modalLabel} Case
                    </h3>
                    <div className=" mt-3 flex items-center gap-1.5 text-base">
                        <Check className=" h-4 w-4 text-blue-600" />
                        In stock and ready to ship
                    </div>
                </div>
                <div className=" sm:col-span-12 md:col-span-9 text-base">
                    <div className=" grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                        <div>
                            <p className=" font-medium text-zinc-950"></p>
                            <ol className=" mt-3 text-zinc-700 list-disc list-inside">
                                <li>Wireless chargin compatible</li>
                                <li>TPU shock absorption</li>
                                <li>Packaging made from recycled materials</li>
                                <li>5 year print warranty</li>
                            </ol>
                        </div>
                        <div>
                            <p className=" font-medium text-zinc-950">
                                Materials
                            </p>
                            <ol className="mt-3 text-zinc-700 list-disc list-inside">
                                <li>High-quality, durable material</li>
                                <li>
                                    Scratch and fingerprint resistant coating
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className=" mt-8">
                        <div className=" bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                            <div className=" flow-root text-sm">
                                <div className=" flex items-center justify-between py-1 mt-2">
                                    <p className=" text-gray-600">Base price</p>
                                    <p className=" font-medium text-gray-900">
                                        {formatPrice(BASE_PRICE / 100)}
                                    </p>
                                </div>

                                {finish !== "smooth" ? (
                                    <div className=" flex items-center justify-between py-1 mt-2">
                                        <p className=" text-gray-600">
                                            {finish} price
                                        </p>
                                        <p className=" font-medium text-gray-900">
                                            {formatPrice(
                                                PRODUCT_PRICES.finish[finish!] /
                                                    100
                                            )}
                                        </p>
                                    </div>
                                ) : null}

                                {material !== "silicone" ? (
                                    <div className=" flex items-center justify-between py-1 mt-2">
                                        <p className=" text-gray-600">
                                            {material} price
                                        </p>
                                        <p className=" font-medium text-gray-900">
                                            {formatPrice(
                                                PRODUCT_PRICES.material[
                                                    material!
                                                ] / 100
                                            )}
                                        </p>
                                    </div>
                                ) : null}

                                <div className=" my-2 h-px bg-gray-200" />
                                <div className="flex items-center justify-between py-2">
                                    <p className=" font-semibold text-gray-900">
                                        Order total
                                    </p>
                                    <p className=" font-semibold text-gray-900">
                                        {formatPrice(totalPrice / 100)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-8 flex justify-end pb-12">
                            <Button
                                onClick={() => handleCheckout()}
                                className=" px-4 sm:px-6"
                            >
                                Check out{" "}
                                <ArrowRight className=" h-4 w-4 ml-1.5 inline" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DesignPreview;
