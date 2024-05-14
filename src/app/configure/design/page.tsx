import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface Props {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const Page = async ({ searchParams }: Props) => {
    const { Id } = searchParams;

    if (!Id || typeof Id !== "string") {
        return notFound();
    }

    const configuration = await db.configuration.findUnique({
        where: {
            id: Id,
        },
    });

    if (!configuration) {
        return notFound();
    }

    const { imageUrl, width, height } = configuration;

    return (
        <DesignConfigurator
            imageUrl={imageUrl}
            imageDimensions={{ width, height }}
            configId={configuration.id}
        />
    );
};

export default Page;
