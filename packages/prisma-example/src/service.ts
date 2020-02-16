import { PrismaClient } from "@prisma/client";

export async function areAllTasksCompleted(userId: number, ctx: { prisma: PrismaClient }): Promise<boolean> {
    const user = await ctx.prisma.user.findOne({
        where: {
            id: userId,
        },
        include: {
            batches: {
                include: {
                    tasks: true
                }
            }
        }
    })

    if (!user) {
        return true
    }

    return user.batches
        .map((batch) => batch.tasks)
        .flatMap((task) => task)
        .every((task) => task.isCompleted)
}