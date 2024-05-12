"use server";

import { db } from "@/db";
import { CaseFinsh, CaseMaterial, Colors, PhoneModel } from "@prisma/client";

export type SaveConfigArgs = {
    color: Colors;
    finish: CaseFinsh;
    material: CaseMaterial;
    model: PhoneModel;
    configId: string;
};

export async function saveConfig({
    color,
    finish,
    material,
    model,
    configId,
}: {
    color: Colors;
    finish: CaseFinsh;
    material: CaseMaterial;
    model: PhoneModel;
    configId: string;
}) {
    await db.configuration.update({
        where: {
            id: configId,
        },
        data: {
            color,
            finish,
            material,
            model,
        },
    });
}
