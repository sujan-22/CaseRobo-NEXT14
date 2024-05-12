import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface Props {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const Page = async ({ searchParams }: Props) => {
    const { id } = searchParams;

    if (!id || typeof id !== "string") {
        return notFound();
    }

    const configuration = await db.configuration.findUnique({
        where: {
            id: id,
        },
    });

    if (!configuration) {
        return notFound();
    }

    return <DesignPreview configuration={configuration} />;
};

export default Page;
