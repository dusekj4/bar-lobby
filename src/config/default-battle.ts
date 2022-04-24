import { aiNames } from "@/config/ai-names";
import { defaultMaps } from "@/config/default-maps";
import { BattleConfig } from "@/model/battle/battle";
import { StartPosType, TeamPreset } from "@/model/battle/types";
import { lastInArray, randomFromArray } from "jaz-ts-utils";
import { SetOptional } from "type-fest";

export const defaultBattle: () => SetOptional<BattleConfig, "teams" | "gameOptions" | "mapOptions" | "restrictions"> = () => {
    const myUserId = api.session?.currentUser?.userId ?? -1;

    return {
        battleOptions: {
            offline: true,
            engineVersion: lastInArray(api.content.engine.installedVersions),
            gameVersion: lastInArray(api.content.game.installedVersions).version.fullString,
            mapFileName: randomFromArray(defaultMaps),
            startPosType: StartPosType.Fixed,
            teamPreset: TeamPreset.Standard,
            isHost: true,
        },
        teams: [
            { id: 0 },
            { id: 1 },
        ],
        participants: [
            { type: "player", id: 0, teamId: 0, userId: myUserId },
            { type: "bot", id: 1, teamId: 1, ownerUserId: myUserId, name: randomFromArray(aiNames), aiShortName: "BARb" },
        ]
    };
};