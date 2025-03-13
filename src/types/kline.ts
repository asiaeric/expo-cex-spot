import { z } from "zod";

import { KlineItemSchema } from "@/schemas";

type KlineItem = z.infer<typeof KlineItemSchema>;
export { KlineItem };
