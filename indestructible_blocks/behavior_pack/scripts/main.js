import { world } from "@minecraft/server"

const INDESTRUCTIBLE_BLOCK_TYPE_IDS = [
    "minecraft:mob_spawner"
]

world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const { block } = event;

    if (INDESTRUCTIBLE_BLOCK_TYPE_IDS.includes(block.typeId)){
        event.cancel = true;
    }
});

world.beforeEvents.explosion.subscribe((event) => {
    const impactedBlocks = event.getImpactedBlocks();

    const filteredBlocks = impactedBlocks.filter(block =>
        !INDESTRUCTIBLE_BLOCK_TYPE_IDS.includes(block.typeId)
    );

    event.setImpactedBlocks(filteredBlocks);
});
