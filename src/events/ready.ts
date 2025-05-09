import { Clients } from "../types/types";

export default {
    name: "ready",
    run: async (client) => {
        console.log(`Logged in as "${client.user.username}" (id: "${client.user.id}")`);
    },
} as Clients.Event<"ready">;